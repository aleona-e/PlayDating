const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			actividades:[],
		},
		actions: {
			agregarActividades: (listaDeActividades) => {
				setStore({actividades:listaDeActividades});
			}
		}
	};
};

export default getState;
