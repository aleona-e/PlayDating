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
from api.models import db, Usuario, Actividad, Evento, Participantes_Evento, Tipo_De_Actividad, Comentario, Favorito
from api.admin import setup_admin
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from datetime import timedelta

api = Blueprint('api', __name__)
CORS(api)
CODE = "utf-8"
email_regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'

# Obtener id de usuairo a partir de token jwt (requiere token)


def obtener_usuario_id():
    informacion_usuario = get_jwt_identity()
    if informacion_usuario is None:
        raise APIException('Se espera jwt token')
    return informacion_usuario["usuario_id"]

# Funciones para validar desde el back campos de registro y login


def validacion_email_password(email, password):
    if email == "":
        raise APIException("Campo email vacio")
    if not (re.search(email_regex, email)):
        raise APIException("Formato de email invalido")
    if password == "":
        raise APIException("Campo password vacio")


# Funciones para validar desde el back campos de registro y login


def validacion_campos_registro(email, password, nombre, provincia, numero_hijos):
    validacion_email_password(email, password)
    if nombre == "":
        raise APIException("Campo nombre vacio")
    if provincia == "":
        raise APIException("Campo provincia vacio")
    if numero_hijos == "" or numero_hijos == 0:
        raise APIException("Campo numero_hijos vacio o invalido")


# Funciones para validar desde el back campos de registro y login

def validacion_campos_login(email, password):
    validacion_email_password(email, password)

# Guardar data de usuario y validar


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
    validacion_campos_registro(
        email, password, nombre, provincia, numero_hijos)
    aux_usuario = Usuario.query.filter_by(email=email).first()
    if not (aux_usuario is None):
        raise APIException("Usuario ya existe.")
    usuario = Usuario(email=email, password=auxHashed, nombre=nombre,
                      provincia=provincia, numero_hijos=numero_hijos)
    db.session.add(usuario)
    db.session.commit()
    return jsonify({'message': 'Usuario creado exitosamente', 'data': usuario.serialize()}), 201

# Validar usuario y generar token


@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body['email']
    password = body['password']
    validacion_campos_login(email, password)
    usuario = Usuario.query.filter_by(email=email).first()
    print(usuario)
    if usuario is None:
        raise APIException("Usuario no existe")
    hashed = usuario.password.encode(CODE)
    if not bcrypt.checkpw(password.encode('utf8'), hashed):
        raise APIException("Credenciales Invalidos")
    data = {
        'email': usuario.email,
        'usuario_id': usuario.id
    }
    #token = create_access_token(identity=data)
    token = create_access_token(
        identity=data, expires_delta=timedelta(weeks=4))
    return jsonify({'message': 'Login exitoso', 'data': token, 'usuario_id': usuario.id})

# Obtener informacion del perfil del current user


@api.route('/perfil', methods=['GET'])
@jwt_required()
def get_info_usuario():
    usuario_id = obtener_usuario_id()
    usuario = Usuario.query.get(usuario_id)
    if usuario is None:
        raise APIException("Usuario no encontrado")
    return jsonify({'message': 'Informacion solicitada con exito', 'data': usuario.serialize()})

# Modificar informacion del perfil del current user


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
    return jsonify({'message': "Campos actualizados exitosamente", 'data': usuario.serialize()})

# Obtener todos los tipos de actividad guardados en la db y ponerlas en las actividades


@api.route('/tipos/actividad', methods=['GET'])
def get_tipos_de_actividad():
    tipos_de_actividad = Tipo_De_Actividad.query.all()
    all_tipos_de_actividad = list(
        map(lambda tipo_de_actividad: tipo_de_actividad.serialize(), tipos_de_actividad))
    return jsonify(all_tipos_de_actividad)

# Obtener informacion de todas las actividades guardadas en la db


@api.route('/actividades', methods=['GET'])
def get_actividades():
    actividades = Actividad.query.all()
    all_actividades = list(
        map(lambda actividad: actividad.serialize(), actividades))
    return jsonify({'message': 'Información de todas las actividades solicitada exitosamente', 'data': all_actividades})


# Crear evento


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
        raise APIException(
            'Maximo participantes no puede ser menor que minimo participantes')
    if not (minimo_participantes > 0):
        raise APIException('Minimo participantes no puede ser 0')
    aux_evento = Evento.query.filter_by(
        fecha_y_hora=fecha_y_hora, creador_id=creador_id, direccion=direccion, actividad_id=actividad_id).first()
    if aux_evento is not None:
        raise APIException('Evento duplicado')
    db.session.add(evento)
    db.session.commit()
    participantes_evento = Participantes_Evento(
        usuario_id=evento.creador_id, evento_id=evento.id, num_participantes_por_usuario=participantes_creador)
    db.session.add(participantes_evento)
    db.session.commit()
    return jsonify({'message': 'Evento creado exitosamente, el usuario se ha añadido a este evento', 'data': evento.serialize()})

# Función para validar campos creación de evento


def validacion_creacion_evento(creador, estado, actividad):
    if actividad == None:
        raise APIException('Actividad no existe')
    if estado == None:
        raise APIException('Estado invalido')
    if creador == None:
        raise APIException('Usuario no existe')


# Obtener eventos en provincia especifica  covincias


@api.route('/eventos', methods=['GET'])
@jwt_required()
def get_eventos():
    all_eventos = []
    creador_id = obtener_usuario_id()
    creador = Usuario.query.filter_by(id=creador_id).first()
    usuarios = Usuario.query.filter_by(provincia=creador.provincia).all()
    for usuario in usuarios:
        eventos = Evento.query.filter_by(creador_id=usuario.id).all()
        for evento in eventos:
            all_eventos.append(evento)
    all_eventos = list(map(lambda evento: evento.serialize(), all_eventos))
    return jsonify({'message': 'Informacion de eventos por provincia solicitada exitosamente', 'data': all_eventos})


# Obtener informacion detalle de evento por id


@api.route('/evento/<int:evento_id>', methods=['GET'])
@jwt_required()
def get_evento(evento_id):
    evento = Evento.query.get(evento_id)
    participantes_Evento = Participantes_Evento.query.filter_by(
        evento_id=evento_id).all()
    all_participantes = []
    for participante_Evento in participantes_Evento:
        nombre = participante_Evento.usuario.nombre
        cantidad = participante_Evento.num_participantes_por_usuario
        participante = {"nombre": nombre, "cantidad": cantidad}
        all_participantes.append(participante)
    evento_serialized = evento.serialize()
    evento_serialized.update({'participantes': all_participantes})
    if evento is None:
        raise APIException("Evento no encontrado")
    return jsonify({'message': 'Informacion detalle de evento solicitada exitosamente', 'data': evento_serialized})

# Unirse a evento ya creado, usuario añadido a tabla participantes_evento


@api.route('/unirse/evento/<int:evento_id>', methods=['POST'])
@jwt_required()
def unirse_a_evento(evento_id):
    body = request.get_json()
    evento = Evento.query.filter_by(id=evento_id).first()
    usuario_id = obtener_usuario_id()
    usuario = Usuario.query.filter_by(id=usuario_id)
    num_participantes_por_usuario = body['num_participantes_por_usuario']
    participante_aux = Participantes_Evento.query.filter_by(
        usuario_id=usuario_id, evento_id=evento_id).first()
    if participante_aux != None:
        print("error. usuario ya registrado en este evento")
        raise APIException('El usuario ya está registrado en este evento.')
    total_participantes = 0
    participantes_evento_aux = Participantes_Evento.query.filter_by(
        evento_id=evento_id).all()
    for participante_evento in participantes_evento_aux:
        total_participantes += participante_evento.num_participantes_por_usuario
    if total_participantes + num_participantes_por_usuario > evento.maximo_participantes:
        raise APIException(
            'No es posible unirse al evento, supera el limite maximo de participantes de este evento')
    participante_evento = Participantes_Evento(
        evento_id=evento_id, usuario_id=usuario_id, num_participantes_por_usuario=num_participantes_por_usuario)
    db.session.add(participante_evento)
    if total_participantes + num_participantes_por_usuario == evento.maximo_participantes:
        evento.estado = ESTADO_LLENO
    db.session.commit()
    return jsonify({'message': 'El usuario se ha unido al evento exitosamente', 'data': participante_evento.serialize()})

# Retirar participacion de current user de evento asociado


@api.route('/retirarse/evento/<int:evento_id>', methods=['DELETE'])
@jwt_required()
def retirarse_de_evento(evento_id):
    usuario_id = obtener_usuario_id()
    evento = Evento.query.filter_by(id=evento_id).first()
    participante_evento = Participantes_Evento.query.filter_by(
        usuario_id=usuario_id, evento_id=evento_id).first()
    if participante_evento == None:
        raise APIException('Usuario NO registrado en evento')
    db.session.delete(participante_evento)
    total_participantes = 0
    participantes_evento_aux = Participantes_Evento.query.filter_by(
        evento_id=evento_id).all()
    for participante_evento in participantes_evento_aux:
        total_participantes += participante_evento.num_participantes_por_usuario
    if total_participantes < evento.maximo_participantes:
        evento.estado = ESTADO_DISPONIBLE
    db.session.commit()
    return jsonify({
        'message': "Se retiró exitosamente la participación de este usuario al evento"
    })

# Obtener todos los eventos creados por el current user con el usuario_id


@api.route('/eventoscreados/usuario', methods=['GET'])
@jwt_required()
def get_eventos_creados_usuario():
    usuario_id = obtener_usuario_id()
    eventos = Evento.query.filter_by(creador_id=usuario_id).all()
    eventos_creados = list(map(lambda evento: evento.serialize(), eventos))
    return jsonify({'message': 'Informacion de eventos creados por el usuario solicitada exitosamente', 'data': eventos_creados})

# Cancelar un evento creado por el current user con el evento_id


@api.route('/cancelarevento/<int:evento_id>', methods=['POST'])
@jwt_required()
def cancelar_evento_creado_usuario(evento_id):
    evento_a_modificar = Evento.query.filter_by(id=evento_id).first()
    if evento_a_modificar is None:
        raise APIException('Evento no existe')
    if evento_a_modificar.estado == ESTADO_CANCELADO:
        raise APIException('El evento ya ha sido cancelado')
    evento_a_modificar.estado = ESTADO_CANCELADO
    db.session.commit()
    return jsonify({'message': 'Evento cancelado exitosamente',
                    'data': evento_a_modificar.serialize()})

# Obtener todos los eventos asociados al current user


@api.route('/eventos/usuario', methods=['GET'])
@jwt_required()
def get_eventos_usuario():
    usuario_id = obtener_usuario_id()
    participante_eventos = Participantes_Evento.query.filter_by(
        usuario_id=usuario_id).all()
    all_eventos_usuario = []
    for participante_evento in participante_eventos:
        eventos = Evento.query.filter_by(
            id=participante_evento.evento_id).all()
        for evento in eventos:
            if not evento.creador.id == participante_evento.usuario_id:
                all_eventos_usuario.append(evento)
    all_eventos_serialized = list(
        map(lambda evento: evento.serialize(), all_eventos_usuario))
    return jsonify({'message': 'Informacion de eventos asociados al usuario solicitada exitosamente', 'data': all_eventos_serialized})


@api.route('/comentarios/<int:evento_id>', methods=['GET'])
@jwt_required()
def get_comentarios(evento_id):
    comentarios_evento = Comentario.query.filter_by(evento_id=evento_id).all()
    print(len(comentarios_evento))
    all_comentarios = list(
        map(lambda comentario: comentario.serialize(), comentarios_evento))
    return jsonify({'message': 'Comentarios solicitados exitosamente', 'data': all_comentarios})

@api.route('/nuevo_comentario/<int:evento_id>', methods=['POST'])
@jwt_required()
def dejar_comentario(evento_id):
    body = request.get_json()
    usuario_id = obtener_usuario_id()
    usuario = Usuario.query.get(usuario_id)
    comentario = body['comentario']
    comentario_nuevo = Comentario(
        evento_id = evento_id,
        usuario_id = usuario_id,
        comentario = comentario,    
        )
    if comentario is None:
        raise APIException('El campo comentario no puede estar vacío')
    db.session.add(comentario_nuevo) 
    db.session.commit()
    return jsonify({'message': "Comentario creado exitosamente", 'data': comentario_nuevo.serialize()})

@api.route('/borrar_comentario/<int:comentario_id>', methods=['DELETE'])
@jwt_required()
def borrar_comentario(comentario_id):
    comentario_a_borrar = Comentario.query.filter_by(id=comentario_id).first()
    usuario_id = obtener_usuario_id()
    if comentario_a_borrar.usuario_id == usuario_id:
        db.session.delete(comentario_a_borrar)
        db.session.commit()
    return jsonify({'message': "Comentario borrado exitosamente"})
    
@api.route('/favoritos', methods=['GET'])
@jwt_required()
def get_favoritos():
    usuario_id = obtener_usuario_id()
    favoritos_usuario = Favorito.query.filter_by(usuario_inicial_id=usuario_id).all()
    all_favoritos = list(
        map(lambda favorito: favorito.serialize(), favoritos_usuario))
    return jsonify({'message': 'Favoritos solicitados exitosamente', 'data': all_favoritos})

@api.route('/agregar_favorito', methods=['POST'])
@jwt_required()
def agregar_favorito():
    body = request.get_json()
    usuario_id = obtener_usuario_id()
    usuario_favorito_id = body['usuario_favorito']
    nuevo_favorito = Favorito(
        usuario_inicial_id = usuario_id,
        usuario_favorito_id = usuario_favorito_id,    
        )
    usuario_favorito = Usuario.query.get(usuario_favorito_id)
    if usuario_favorito is None:
        raise APIException('El usuario no existe')
    usuario_ya_agregado = Favorito.query.filter_by(usuario_inicial_id=usuario_id, usuario_favorito_id=usuario_favorito_id).first()
    if usuario_ya_agregado is not None:
        raise APIException('El usuario ya esta en la lista de favoritos') 
    db.session.add(nuevo_favorito) 
    db.session.commit()
    return jsonify({'message': "Favorito agregado exitosamente", 'data': nuevo_favorito.serialize()})

@api.route('/eliminar_favorito/<int:usuario_favorito_id>', methods=['DELETE'])
@jwt_required()
def eliminar_favorito(usuario_favorito_id):
    usuario_id = obtener_usuario_id()
    favorito_a_borrar = Favorito.query.filter_by(usuario_inicial_id=usuario_id, usuario_favorito_id=usuario_favorito_id).first()  
    if favorito_a_borrar is not None:
        db.session.delete(favorito_a_borrar)
        db.session.commit()
        return jsonify({'message': "Favorito borrado exitosamente"})
    raise APIException("Favorito no existe")
    
        