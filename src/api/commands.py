
import click
from api.models import db, Usuario, Actividad, Evento, Provincia, Participantes_Evento, Tipo_De_Actividad, Estados

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_data(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

        ### Insert the code to populate others tables if needed
    @app.cli.command("insert-provincias") # name of our command
    def insert_provincias_data():
        provincias = ["Barcelona", "Madrid", "Tarragona", "Valencia", "Girona", "Málaga"]
        for nombre_provincia in provincias:
            provincia = Provincia()
            provincia.nombre = nombre_provincia
            db.session.add(provincia)
            db.session.commit()
            print("Provincia: ", provincia.nombre, " created.")

        print("All provincias created")

    @app.cli.command("insert-estados") 
    def insert_estados_data():
        estados = ["Disponible", "Cerrado", "Cancelado", "Lleno"]
        for tipo_estado in estados:
            estado = Estados()
            estado.estado = tipo_estado
            db.session.add(estado)
            db.session.commit()
            print("Estado: ", estado.estado, " created.")

        print("All estados created")

    @app.cli.command("insert-tipo_de_actividad") 
    def insert_tipo_de_actividad_data():
        tipos_de_actividad = ["Exterior", "Interior"]
        for tipo_de_actividad in tipos_de_actividad:
            tipo = Tipo_De_Actividad()
            tipo.tipo = tipo_de_actividad
            db.session.add(tipo)
            db.session.commit()
            print("Tipo_de_actividad: ", tipo.tipo, " created.")

        print("All tipos de actividad created")

    

    
