from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property, hybrid_method
from datetime import datetime

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__= "usuario"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    nombre = db.Column(db.String(250), nullable=False)
    password = db.Column(db.String(250), nullable=False)
    provincia = db.Column(db.String(250), nullable=False)
    numero_hijos = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Usuario %r>' % self.email
 
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "nombre": self.nombre,
            "provincia": self.provincia,
            "numero_hijos": self.numero_hijos
            }

class Actividad(db.Model):
    __tablename__= 'actividad'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(250), nullable=False)
    descripcion = db.Column(db.String(250), nullable=False)
    tipo_de_actividad_id = db.Column(db.Integer, db.ForeignKey('tipo_de_actividad.id'))
    imagen = db.Column(db.String(250), nullable=False)
    tipo_de_actividad = db.relationship('Tipo_De_Actividad')

    def __repr__(self):
        return '%r' % self.nombre

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "tipo_de_actividad": repr(self.tipo_de_actividad),
            "imagen": self.imagen
            }

class Tipo_De_Actividad(db.Model):
    __tablename__='tipo_de_actividad'
    id = db.Column(db.Integer, primary_key=True) 
    tipo = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return '%r' % self.tipo

    def serialize(self):
        return {
            "id": self.id,
            "tipo": self.tipo
            }
        
class Evento(db.Model):
    __tablename__='evento'
    id = db.Column(db.Integer, primary_key=True)
    fecha_y_hora = db.Column(db.DateTime, nullable=False)
    creador_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    minimo_participantes = db.Column(db.Integer)
    maximo_participantes = db.Column(db.Integer)
    edad_minima = db.Column(db.Integer)
    edad_maxima = db.Column(db.Integer)
    direccion = db.Column(db.String(250), nullable=False)
    estado = db.Column(db.String(250), nullable=False)
    actividad_id = db.Column(db.Integer, db.ForeignKey('actividad.id'), nullable=False)
    creador = db.relationship('Usuario')# provincia a partir de usuario
    actividad = db.relationship('Actividad')

    def __repr__(self):
        return '<Evento %r>' % self.id

    @hybrid_property
    def participantes(self):
        all_participantes = []
        participantes_evento = Participantes_Evento.query.filter_by(evento_id=self.id).all()
        for participante_evento in participantes_evento:
            nombre = participante_evento.usuario.nombre
            cantidad = participante_evento.num_participantes_por_usuario
            participante_id = participante_evento.usuario.id
            participante = {"nombre":nombre, "cantidad":cantidad, "id":participante_id}
            all_participantes.append(participante)
        return all_participantes

    @hybrid_property
    def cupos_disponibles(self):
        total_cupos_disponibles = self.maximo_participantes
        participantes_evento = Participantes_Evento.query.filter_by(evento_id=self.id).all()    
        for participante_evento in participantes_evento:
            cantidad_participantes = participante_evento.num_participantes_por_usuario
            total_cupos_disponibles -= cantidad_participantes
        return total_cupos_disponibles

    def serialize(self):
        return {
            "id": self.id,
            "fecha_y_hora": self.fecha_y_hora,
            "creador": self.creador.serialize(),
            "edad_minima": self.edad_minima,
            "edad_maxima": self.edad_maxima,
            "minimo_participantes": self.minimo_participantes,
            "maximo_participantes": self.maximo_participantes,
            "direccion": self.direccion,
            "estado": self.estado,
            "actividad": self.actividad.serialize(),
            "participantes": self.participantes,
            "cupos_disponibles": self.cupos_disponibles
            }

class Comentario(db.Model):
    __tablename__='comentario'
    id = db.Column(db.Integer, primary_key=True)
    evento_id = db.Column(db.Integer, db.ForeignKey('evento.id'), nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    comentario = db.Column(db.String(500), nullable=False)
    fecha_y_hora = db.Column(db.DateTime, default=datetime.now)
    evento = db.relationship('Evento')
    usuario = db.relationship('Usuario')

    def __repr__(self):
        return '<Comentario %r>' % self.id
    
    def serialize(self):
        return {
            "id": self.id,
            "fecha_y_hora": self.fecha_y_hora.strftime("%m/%d/%Y, %H:%M:%S"),
            "evento_id": self.evento_id,
            "usuario_id": self.usuario.serialize(),
            "comentario": self.comentario
            }
class Favorito(db.Model):
    __tablename__='favorito'
    id = db.Column(db.Integer, primary_key=True)
    usuario_inicial_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    usuario_favorito_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    usuario_inicial = db.relationship('Usuario', foreign_keys=[usuario_inicial_id])
    usuario_favorito = db.relationship('Usuario', foreign_keys=[usuario_favorito_id])
    
    def __repr__(self):
        return '<Favorito %r>' % self.id
    
    def serialize(self):
        return {
            "id": self.id,
            "usuario_inicial": self.usuario_inicial.serialize(),
            "usuario_favorito": self.usuario_favorito.serialize()
            }

class Invitacion(db.Model):
    __tablename__='invitacion'
    id = db.Column(db.Integer, primary_key=True)
    usuario_creador_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    usuario_invitado_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    evento_id = db.Column(db.Integer, db.ForeignKey('evento.id'), nullable=False)
    evento = db.relationship('Evento')
    usuario_creador = db.relationship('Usuario', foreign_keys=[usuario_creador_id])
    usuario_invitado = db.relationship('Usuario', foreign_keys=[usuario_invitado_id])
    
    def __repr__(self):
        return '<Invitacion %r>' % self.id
    
    def serialize(self):
        return {
            "id": self.id,
            "usuario_creador": self.usuario_creador.serialize(),
            "usuario_invitado": self.usuario_invitado.serialize(),
            "evento": self.evento.serialize()
            }

class Participantes_Evento(db.Model):
    __tablename__='participantes_evento'
    id = db.Column(db.Integer, primary_key=True)
    evento_id = db.Column(db.Integer, db.ForeignKey('evento.id'), nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    num_participantes_por_usuario = db.Column(db.Integer, nullable=False)
    evento = db.relationship('Evento')
    usuario = db.relationship('Usuario')

    def __repr__(self):
        return '<Participantes_Evento %r>' % self.cantidad_participantes

    def serialize(self):
        return {
            "id": self.id,
            "evento": self.evento_id,
            "usuario": self.usuario_id,
            "num_participantes_por_usuario": self.num_participantes_por_usuario,
             }
