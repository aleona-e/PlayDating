  
import os
from flask_admin import Admin
from .models import db, Usuario, Actividad, Evento, Participantes_Evento, Tipo_De_Actividad, Comentario, Favorito, Invitacion
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Usuario, db.session))
    admin.add_view(ModelView(Actividad, db.session))
    admin.add_view(ModelView(Evento, db.session))
    admin.add_view(ModelView(Participantes_Evento, db.session))
    admin.add_view(ModelView(Tipo_De_Actividad, db.session))
    admin.add_view(ModelView(Comentario, db.session))
    admin.add_view(ModelView(Favorito, db.session))
    admin.add_view(ModelView(Invitacion, db.session))
    

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))