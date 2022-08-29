const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			actividades: [],
			eventos: [],
			favoritos: []

		},
		actions: {
			agregarActividades: (listaDeActividades) => {
				setStore({ actividades: listaDeActividades });
			},

			agregarEventos: (listaDeEventos) => {
				setStore({ eventos: listaDeEventos });
			},

			agregarFavorito: (favorito) => {
				const store = getStore()
				const listaDeFavoritos = store.favoritos.concat(favorito)
				setStore({ favoritos: listaDeFavoritos })
			},

			guardarFavoritos: (listaDeFavoritos) => {
				setStore({ favoritos: listaDeFavoritos });
			},

			eliminarFavorito: (usuarioFavoritoId) => {
				const store = getStore();
				const listaDeFavoritos = store.favoritos;
				const listaFiltradaDeFavoritos = listaDeFavoritos.filter((favorito) => {
					return favorito.usuario_favorito_id != usuarioFavoritoId;
				})
				setStore({ favoritos: listaFiltradaDeFavoritos})

			}
		}
	}
}

	export default getState;
