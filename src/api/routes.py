"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import re 
import bcrypt

from api.estados import ESTADO_CANCELADO, ESTADO_CERRADO, ESTADO_DISPONIBLE, ESTADO_LLENO

from flask import Flask, request, jsonify, url_for, Blueprint
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.models import db, Usuario, Actividad, Evento, Participantes_Evento, Tipo_De_Actividad
from api.admin import setup_admin
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


api = Blueprint('api', __name__)
CORS(api)
CODE = "utf-8"
email_regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'

#Comentar/descomentar los decoradores de jwt_required para probar

#Obtener id de usuairo a partir de token jwt (requiere token)
def obtener_usuario_id():
    informacion_usuario = get_jwt_identity()
    if informacion_usuario is None:
        raise APIException('Se espera jwt token')
    return informacion_usuario["usuario_id"]

#Funciones para validar desde el back campos de registro y login
def validacion_email_password(email,password):
    if email == "":
        raise APIException("Campo email vacio")
    if not (re.search(email_regex, email)):
        raise APIException("Formato de email invalido")
    if password == "":
        raise APIException("Campo password vacio")
#Funciones para validar desde el back campos de registro y login
def validacion_campos_registro(email,password,nombre,provincia,numero_hijos):
    validacion_email_password(email, password)
    if nombre == "":
        raise APIException("Campo nombre vacio")
    if provincia == "":
        raise APIException("Campo provincia vacio")
    if numero_hijos == "" or numero_hijos == 0:
        raise APIException("Campo numero_hijos vacio o invalido")
#Funciones para validar desde el back campos de registro y login
def validacion_campos_login(email,password):
    validacion_email_password(email, password)

#Guardar data de usuario y validar
@api.route('/nuevo/registro', methods=['POST'])    
def registro():
    body = request.get_json()
    email = body['email']
    password = body['password']
    hashed = bcrypt.hashpw(password.encode(CODE), bcrypt.gensalt(14))
    auxHashed = hashed.decode(CODE)
    nombre = body['nombre']
    provincia = body['provincia']
    numero_hijos = body['numero_hijos']
    validacion_campos_registro(email, password, nombre, provincia, numero_hijos)
    aux_usuario = Usuario.query.filter_by(email=email).first()
    if not (aux_usuario is None):
       raise APIException("Usuario ya existe.")
    usuario = Usuario(email=email, password=auxHashed, nombre=nombre, provincia=provincia, numero_hijos=numero_hijos)
    db.session.add(usuario)
    db.session.commit()
    return jsonify({'message':'Usuario creado exitosamente', 'data':usuario.serialize()}),201

#Validar usuario y generar token
@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body['email']
    password = body['password']
    validacion_campos_login(email, password)
    usuario = Usuario.query.filter_by(email=email).first()
    if usuario is None:
        raise APIException("Usuario no existe")
    hashed = usuario.password.encode(CODE)
    if not bcrypt.checkpw(password.encode('utf8'), hashed):
        raise APIException("Credenciales Invalidos")
    data = {
        'email': usuario.email,
        'usuario_id': usuario.id
    }
    token = create_access_token(identity=data)
    return jsonify({'message':'Login exitoso','data':token,'usuario_id':usuario.id})

#Obtener informacion del perfil del current user
@api.route('/perfil', methods=['GET'])
@jwt_required()
def get_info_usuario():
    usuario_id = obtener_usuario_id()
    usuario = Usuario.query.get(usuario_id)
    if usuario is None:
        raise APIException("Usuario no encontrado")
    return jsonify({'message':'Informacion solicitada con exito','data':usuario.serialize()})

#Modificar informacion del perfil del current user
@api.route('/perfil/modificar', methods=['POST'])
@jwt_required()
def modificar_info_usuario():
    usuario_id = obtener_usuario_id()
    body = request.get_json()
    usuario = Usuario.query.get(usuario_id)
    if usuario is None:
        raise APIException("Usuario no encontrado")
    provincia = body['provincia']
    numero_de_hijos = body['numero_hijos']
    if provincia is not None:
        usuario.provincia = body['provincia']
    if numero_de_hijos is not None:
        usuario.numero_hijos = body['numero_hijos']
    db.session.commit()
    return jsonify({'message': "Campos actualizados exitosamente", 'data':usuario.serialize()})

#Obtener todos los tipos de actividad guardados en la db y ponerlas en las actividades 
@api.route('/tipos/actividad', methods=['GET'])
def get_tipos_de_actividad():
    tipos_de_actividad = Tipo_De_Actividad.query.all()
    all_tipos_de_actividad = list(map(lambda tipo_de_actividad: tipo_de_actividad.serialize(), tipos_de_actividad))
    return jsonify(all_tipos_de_actividad)

#Obtener informacion de todas las actividades guardadas en la db
@api.route('/actividades', methods=['GET'])
def get_actividades():
    actividades = Actividad.query.all()
    all_actividades = list(map(lambda actividad: actividad.serialize(), actividades))
    return jsonify({'message':'Información de todas las actividades solicitada exitosamente','data':all_actividades})

#Obtener detalle de actividad por id de actividad
@api.route('/actividades/<int:actividad_id>', methods=['GET'])
@jwt_required()
def get_actividad(actividad_id):
    actividad = Actividad.query.get(actividad_id)
    if actividad is None:
        raise APIException("Actividad no encontrada")
    return jsonify({'message':'Información de actividad solicitada con exito','data':actividad.serialize()})

#Crear evento
@api.route('/crear/evento', methods=['POST'])
@jwt_required()
def crear_evento():
    body = request.get_json()
    fecha_y_hora = body['fecha_y_hora']
    creador_id = obtener_usuario_id()
    creador = Usuario.query.filter_by(id=creador_id).first()
    minimo_participantes = body['minimo_participantes']
    maximo_participantes = body['maximo_participantes']
    participantes_creador = body['participantes_creador']
    edad_minima = body['edad_minima']
    edad_maxima = body['edad_maxima']
    direccion = body['direccion']
    estado = ESTADO_DISPONIBLE
    actividad_id = body['actividad_id']
    actividad = Actividad.query.filter_by(id=actividad_id).first()
    validacion_creacion_evento(creador, estado, actividad)
    evento = Evento(
        fecha_y_hora=fecha_y_hora,
        creador_id=creador_id,
        minimo_participantes=minimo_participantes,
        maximo_participantes=maximo_participantes,
        edad_minima=edad_minima,
        edad_maxima=edad_maxima,
        direccion=direccion,
        estado=estado,
        actividad_id=actividad_id)
    if not (maximo_participantes > 0):
        raise APIException('Maximo participantes no puede ser 0')
    if maximo_participantes < minimo_participantes:
        raise APIException('Maximo participantes no puede ser menor que minimo participantes')
    if not (minimo_participantes > 0):
        raise APIException('Minimo participantes no puede ser 0')
    aux_evento = Evento.query.filter_by(fecha_y_hora=fecha_y_hora,creador_id=creador_id,direccion=direccion,actividad_id=actividad_id).first()
    if aux_evento is not None:
        raise APIException('Evento duplicado')
    db.session.add(evento)
    db.session.commit()
    participantes_evento = Participantes_Evento(usuario_id=evento.creador_id, evento_id=evento.id, num_participantes_por_usuario=participantes_creador)
    db.session.add(participantes_evento)
    db.session.commit()
    return jsonify({'message':'Evento creado exitosamente, el usuario se ha añadido a este evento','data':evento.serialize()})

#Función para validar campos creación de evento
def validacion_creacion_evento(creador,estado,actividad):
    if actividad == None:
            raise APIException('Actividad no existe')
    if estado == None:
            raise APIException('Estado invalido')
    if creador == None:
            raise APIException('Usuario no existe')

#Obtener eventos en provincia especifica  con la provincia id que sale a partir del registro del usuario y ligarlo a la tabla provincias
@api.route('/eventos', methods=['GET'])
@jwt_required()
def get_eventos():
    creador_id = obtener_usuario_id()
    creador = Usuario.query.filter_by(id = creador_id).first()
    usuarios = Usuario.query.filter_by(provincia = creador.provincia).all()
    all_eventos = []
    all_cupos_disponibles = []
    for usuario in usuarios:
        eventos = Evento.query.filter_by(creador_id = usuario.id).all()
        for evento in eventos:
            total_participantes = 0
            cupos_disponibles = 0
            participantes_evento_aux = Participantes_Evento.query.filter_by(evento_id=evento.id).all()
            for participante_evento in participantes_evento_aux:
                total_participantes += participante_evento.num_participantes_por_usuario
            cupos_disponibles = evento.maximo_participantes - total_participantes
            all_eventos.append(evento)
            all_cupos_disponibles.append(cupos_disponibles)
    all_eventos_serialized = []
    for index,evento in enumerate(all_eventos):
        evento_serialized = evento.serialize()
        evento_serialized.update({'cupos_disponibles': all_cupos_disponibles[index]})
        all_eventos_serialized.append(evento_serialized)
    return jsonify({'message':'Informacion de eventos por provincia solicitada exitosamente','data':all_eventos_serialized})

#Obtener informacion detalle de evento por id
@api.route('/evento/<int:evento_id>', methods=['GET'])
@jwt_required()
def get_evento(evento_id):
    evento = Evento.query.get(evento_id)
    if evento is None:
        raise APIException("Evento no encontrado")
    return jsonify({'message':'Informacion detalle de evento solicitada exitosamente','data':evento.serialize()})
    
#Unirse a evento ya creado, usuario añadido a tabla participantes_evento
@api.route('/unirse/evento/<int:evento_id>', methods=['POST'])
@jwt_required() 
def unirse_a_evento(evento_id):
    body = request.get_json()
    evento = Evento.query.filter_by(id=evento_id).first()
    usuario_id = obtener_usuario_id()
    usuario = Usuario.query.filter_by(id=usuario_id)
    num_participantes_por_usuario = body['num_participantes_por_usuario']
    participante_aux = Participantes_Evento.query.filter_by(usuario_id=usuario_id, evento_id=evento_id).first()
    if participante_aux != None:
        print("error. usuario ya registrado en este evento")
        raise APIException('El usuario ya está registrado en este evento.')
    total_participantes = 0
    participantes_evento_aux = Participantes_Evento.query.filter_by(evento_id=evento_id).all()
    for participante_evento in participantes_evento_aux:
        total_participantes += participante_evento.num_participantes_por_usuario
    if total_participantes + num_participantes_por_usuario > evento.maximo_participantes:
        raise APIException('No es posible unirse al evento, supera el limite maximo de participantes de este evento')
    participante_evento = Participantes_Evento(evento_id=evento_id, usuario_id=usuario_id, num_participantes_por_usuario=num_participantes_por_usuario)
    db.session.add(participante_evento)
    if total_participantes + num_participantes_por_usuario == evento.maximo_participantes:
        evento.estado = ESTADO_LLENO
    db.session.commit()
    return jsonify({'message':'El usuario se ha unido al evento exitosamente', 'data':participante_evento.serialize()})

#Retirar participacion de current user de evento asociado
@api.route('/retirarse/evento/<int:evento_id>', methods=['DELETE'])
@jwt_required()
def retirarse_de_evento(evento_id):
    usuario_id = obtener_usuario_id()
    participante_evento = Participantes_Evento.query.filter_by(usuario_id=usuario_id, evento_id=evento_id).first()
    if participante_evento == None:
        raise APIException('Usuario NO registrado en evento')
    db.session.delete(participante_evento)
    db.session.commit()
    return jsonify({
        'message':"Se retiró exitosamente la participación de este usuario al evento"
    })

#Obtener todos los eventos creados por el current user con el usuario_id
@api.route('/eventoscreados/usuario', methods=['GET'])
@jwt_required()
def get_eventos_creados_usuario():
    usuario_id = obtener_usuario_id()
    eventos = Evento.query.filter_by(creador_id = usuario_id).all()
    eventos_creados = list(map(lambda evento: evento.serialize(), eventos))
    if len(eventos) == 0:
            raise APIException("Usuario no encontrado")
    return jsonify({'message':'Informacion de eventos creados por el usuario solicitada exitosamente','data':eventos_creados})

#Cancelar un evento creado por el current user con el evento_id
@api.route('/cancelarevento/<int:evento_id>', methods=['POST'])
@jwt_required()
def cancelar_evento_creado_usuario(evento_id):
    evento_a_modificar = Evento.query.filter_by(id= evento_id).first()
    if evento_a_modificar is None:
        raise APIException('Evento no existe')
    if evento_a_modificar.estado == ESTADO_CANCELADO:
        raise APIException('El evento ya ha sido cancelado')
    evento_a_modificar.estado = ESTADO_CANCELADO
    db.session.commit()
    return jsonify({'message': 'Evento cancelado exitosamente',
    'data': evento_a_modificar.serialize()})

#Obtener todos los eventos asociados al current user
@api.route('/eventos/usuario', methods=['GET'])
@jwt_required()
def get_eventos_usuario():
    usuario_id = obtener_usuario_id()
    participante_eventos = Participantes_Evento.query.filter_by(usuario_id = usuario_id).all()
    all_eventos_usuario = []
    for participante_evento in participante_eventos:
        eventos = Evento.query.filter_by(id = participante_evento.evento_id).all()
        for evento in eventos:
            all_eventos_usuario.append(evento) 
    if len(all_eventos_usuario) == 0:
        return jsonify({'message':'El usuario no se ha unido a ningún evento'})
    all_eventos_serialized = list(map(lambda evento: evento.serialize(), all_eventos_usuario))
    return jsonify({'message':'Informacion de eventos asociados al usuario solicitada exitosamente','data':all_eventos_serialized})
       
#hasta aquí todos los endpoints están probados.     
