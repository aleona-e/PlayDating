const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			actividades:[],
			usuario_id:"",
		},
		actions: {
			agregarActividades: (listaDeActividades) => {
				setStore({actividades:listaDeActividades});
			},
			guardarUsuario:(usuario_id)=>{
				setStore({usuario_id:usuario_id})
			}
		}
	};
};

export default getState;
