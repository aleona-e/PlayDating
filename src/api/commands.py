
import click
import cloudinary.uploader
import cloudinary.api
from flask.cli import AppGroup
from api.models import db, Usuario, Actividad, Evento, Participantes_Evento, Tipo_De_Actividad, Favorito

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-provincias" that you can run from the command line
    by typing: $ flask insert-provincias

    """
    #Para agregar a información de las tablas poner en la terminal "flask" + el nombre del comando ej. insert-provincias (para agregar las provincias)
    # $ flask insert-provincias
        
    @app.cli.command("insert-tipo_de_actividad") 
    def insert_tipo_de_actividad_data():
        if len(Tipo_De_Actividad.query.all()) == 0:
            tipos_de_actividad = ["Exterior", "Interior"]
            for tipo_de_actividad in tipos_de_actividad:
                tipo = Tipo_De_Actividad()
                tipo.tipo = tipo_de_actividad
                db.session.add(tipo)
                print("Tipo_de_actividad: ", tipo.tipo, " created.")
            db.session.commit()
            
            print("All tipos de actividad created")

        else:
            print("La tabla Tipo_de_Actividad ya está llena.")

    @app.cli.command("insert-actividades") 
    def insert_actividades_data():
        if len(Actividad.query.all()) == 0:
            actividades = [
                {"nombre": "Juegos de Agua", "descripcion": "Planea refrescantes juegos de agua en verano para tus hijos y sus nuevos amigos. Cada participante lleva los implementos necesarios. Tú eliges el lugar. Cada participante requiere de la compañía de un adulto responsable.", "tipo_de_actividad_id":1, "imagen":"url"},
                {"nombre": "Jugar Fútbol", "descripcion": "Organiza una jugada al futbol con tus hijos y sus nuevos amigos. Cada participante lleva los implementos necesarios. Tú eliges el lugar. Cada participante requiere de la compañía de un adulto responsable. ", "tipo_de_actividad_id":1, "imagen":"url"},
                {"nombre": "Picnic", "descripcion": "Ten un picnic con tus hijos y sus nuevos amigos. Cada participante lleva algo para compartir entre todos. Tú eliges el lugar. Cada participante requiere de la compañía de un adulto responsable.", "tipo_de_actividad_id":1, "imagen":"url"},
                {"nombre": "Ruta en Ruedas", "descripcion": "Montar en Bici, patines o patineta. Cada participante lleva su vehiculo. Tú eliges el lugar. Cada participante requiere de la compañía de un adulto responsable.", "tipo_de_actividad_id":1, "imagen":"url"},
                {"nombre": "Juego Libre", "descripcion": "Tus hijos y sus nuevos amigos podrán jugar libremente en el parque. Tú eliges el lugar. Cada participante requiere de la compañía de un adulto responsable.", "tipo_de_actividad_id":1, "imagen":"url"},
                {"nombre": "Manualidades", "descripcion": "Organiza una sesión de manualidades para tus hijos y sus nuevos amigos. Cada participante lleva los implementos necesarios. Tú eliges el lugar. Cada participante requiere de la compañía de un adulto responsable.", "tipo_de_actividad_id":2, "imagen":"url"},
                {"nombre": "Lectura de Cuentos/Libros", "descripcion": "Planea una sesión de lectura para tus hijos y sus nuevos amigos. Cada participante puede llevar un libro. Tú eliges el lugar. Cada participante requiere de la compañía de un adulto responsable.", "tipo_de_actividad_id":2, "imagen":"url"},
                {"nombre": "Juegos de Mesa/Puzzles", "descripcion": "Organiza una sesión de juegos de mesa  y/o puzzles para tus hijos y sus nuevos amigos. Cada participante puede llevar un juego/puzzle. Tú eliges el lugar. Cada participante requiere de la compañía de un adulto responsable.", "tipo_de_actividad_id":2, "imagen":"url"},
                {"nombre": "Juego Libre", "descripcion": "Tus hijos y sus nuevos amigos podrán jugar libremente. Tú eliges el lugar. Cada participante requiere de la compañía de un adulto responsable.", "tipo_de_actividad_id":2, "imagen":"url"}]
            for obj_actividad in actividades:
                actividad = Actividad()
                actividad.nombre = obj_actividad["nombre"]
                actividad.descripcion = obj_actividad["descripcion"]
                actividad.tipo_de_actividad_id = obj_actividad["tipo_de_actividad_id"]
                actividad.imagen = obj_actividad["imagen"]
                db.session.add(actividad)
                print("Actividad: ", actividad.nombre, " created.")
            db.session.commit()  

            print("All actividades created")

        else:
            print("La tabla Actividad ya está llena.")

    @app.cli.command("insert-imagenes_actividades") 
    def insert_imagenes_data():
        imagenes_actividades = [
            "https://res.cloudinary.com/daint2d1l/image/upload/v1658303042/Actividades/8_blsifn.png",
            "https://res.cloudinary.com/daint2d1l/image/upload/v1658303039/Actividades/7_gpcjmy.png",
            "https://res.cloudinary.com/daint2d1l/image/upload/v1658303029/Actividades/4_j1yemg.png",
            "https://res.cloudinary.com/daint2d1l/image/upload/v1658303045/Actividades/9_kfvczv.png",
            "https://res.cloudinary.com/daint2d1l/image/upload/v1658302989/Actividades/2_yrgzy6.png",
            "https://res.cloudinary.com/daint2d1l/image/upload/v1658303032/Actividades/5_kq1tgf.png",
            "https://res.cloudinary.com/daint2d1l/image/upload/v1658303026/Actividades/3_sb5ibo.png",
            "https://res.cloudinary.com/daint2d1l/image/upload/v1658302986/Actividades/1_nanc3k.png",
            "https://res.cloudinary.com/daint2d1l/image/upload/v1658303036/Actividades/6_dcpkjw.png"]

        todas_actividades = Actividad.query.all()
        for i,actividad in enumerate(todas_actividades):
            actividad.imagen = imagenes_actividades[i]
        db.session.commit()

        print("Imagenes cargadas correctamente")

    
    
