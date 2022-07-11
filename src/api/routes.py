"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import re 
import bcrypt
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.models import db, Usuario, Actividad, Evento, Provincia, Participantes_Evento, Tipo_De_Actividad, Estados
from api.admin import setup_admin
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)
CODE = "utf-8"
email_regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'  

def validacion_campos_registro(email,password,nombre,provincia_id,numero_hijos):
    if email == "":
        raise APIException("Campo email vacio")
    if not (re.search(email_regex, email)):
        raise APIException("Formato de email invalido")
    if password == "":
        raise APIException("Campo password vacio")
    if nombre == "":
        raise APIException("Campo nombre vacio")
    if provincia_id == "":
        raise APIException("Campo provincia vacio")
    if numero_hijos == "" or numero_hijos == 0:
        raise APIException("Campo numero_hijos vacio o invalido")
    

#guardar data de usuario y validar
@api.route('/nuevo/registro', methods=['POST'])    
def registro():
    body = request.get_json()
    email = body['email']
    password = body['password']
    hashed = bcrypt.hashpw(password.encode(CODE), bcrypt.gensalt(14))
    auxHashed = hashed.decode(CODE)
    nombre = body['nombre']
    provincia_id = body['provincia']
    provincia = Provincia.query.filter_by(id=provincia_id).first()
    numero_hijos = body['numero_hijos']
    validacion_campos_registro(email, password, nombre, provincia_id, numero_hijos)
    aux_usuario = Usuario.query.filter_by(email=email).first()
    if not (aux_usuario is None):
       raise APIException("Usuario ya existe.")
    usuario = Usuario(email=email, password=auxHashed, nombre=nombre, provincia=provincia, numero_hijos=numero_hijos)
    db.session.add(usuario)
    db.session.commit()
    return jsonify(usuario.serialize()),201

#validar usuario y generar token
@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body['email']
    password = body['password']
    usuario = Usuario.query.filter_by(email=email).first()
    if usuario is None:
        raise APIException("Usuario no existe")
    hashed = usuario.password.encode(CODE)
    print(bcrypt.checkpw(password.encode(CODE), hashed))
    #return jsonify("ok")
    # hashed = str.encode(usuario.password)
    print("hashed: ", hashed)
    if not bcrypt.checkpw(password.encode('utf8'), hashed):
        raise APIException("Credenciales Invalidos")
    data = {
        'email': usuario.email,
        'usuario_id': usuario.id
    }
    token = create_access_token(identity=data)
    return jsonify(token)

#obtener toda la info de todas las actividades
@api.route('/actividades', methods=['GET'])
def get_actividades():
    actividades = Actividad.query.all()
    all_actividades = list(map(lambda actividad: actividad.serialize(), actividades))
    return jsonify(all_actividades)

#obtener detalle actividad por id
@api.route('/actividades/<int:actividad_id>', methods=['GET'])
@jwt_required()
def get_actividad(actividad_id):
    if request.method == 'GET':
        actividad = Actividad.query.get(actividad_id)
        if actividad is None:
            raise APIException("Actividad no encontrada")
        return jsonify(actividad.serialize())

#obtener eventos en provincia especifica  SOS
@api.route('/eventos/<int:provincia_id>', methods=['GET'])
@jwt_required()
def get_eventos(provincia_id):
    usuarios = Usuario.query.filter_by(provincia_id = provincia_id).all()
    all_eventos = []
    for usuario in usuarios:
        eventos = Evento.query.filter_by(creador_id = usuario.id).all()
        for evento in eventos:
            all_eventos.append(evento) 
    all_eventos_serialized = list(map(lambda evento: evento.serialize(), all_eventos))
    return jsonify(all_eventos_serialized)

#obtener informacion detalle de evento por id
@api.route('/evento/<int:evento_id>', methods=['GET'])
@jwt_required()
def get_evento(evento_id):
    if request.method == 'GET':
        evento = Evento.query.get(evento_id)
        if evento is None:
            raise APIException("Evento no encontrado")
        return jsonify(evento.serialize())

#obtener todos los eventos creados por el current user con el usuario_id
@api.route('/eventoscreados/usuario/<int:usuario_id>', methods=['GET'])
@jwt_required()
def get_eventos_creados_usuario(usuario_id):
    eventos = Evento.query.filter_by(creador_id = usuario_id).all()
    eventos_creados = list(map(lambda evento: evento.serialize(), eventos))
    if len(eventos) == 0:
            raise APIException("Usuario no encontrado")
    return jsonify(eventos_creados)

# #hasta aquí todos los endpoints están probados, para probarlos sin token solo quitar el decorador de JWT_required

