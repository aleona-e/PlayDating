const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			actividades: [],

			eventos: [],

		},
		actions: {
			agregarActividades: (listaDeActividades) => {
				setStore({ actividades: listaDeActividades });
			},

			agregarEventos: (listaDeEventos) => {
				setStore({ eventos: listaDeEventos });
			}
		}
	};
};

export default getState;
