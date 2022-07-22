const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			actividades:[],
			usuario_id:"",
			eventos:[],

		},
		actions: {
			agregarActividades: (listaDeActividades) => {
				setStore({actividades:listaDeActividades});
			},
			guardarUsuario:(usuario_id)=>{
				setStore({usuario_id:usuario_id})
			},
			agregarEventos: (listaDeEventos) => {
				setStore({eventos:listaDeEventos});
			}
		}
	};
};

export default getState;
