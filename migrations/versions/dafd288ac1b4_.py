"""empty message

Revision ID: dafd288ac1b4
Revises: ff6544650c79
Create Date: 2022-08-22 13:56:34.577389

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dafd288ac1b4'
down_revision = 'ff6544650c79'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favorito',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('usuario_favorito', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['usuario_favorito'], ['usuario.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('favorito')
    # ### end Alembic commands ###
