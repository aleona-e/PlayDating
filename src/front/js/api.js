import { HOSTNAME } from "./component/config.js";

export const obtenerActividades = () => {
  return fetch(HOSTNAME + "/actividades", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((resp) => {
      return resp.json();
    })
    .catch((error) => {
      console.log("error " + error);
    });
};
export const unirseEvento = (eventoId, numParticipantesPorUsuario) => {
  return fetch (HOSTNAME + "/unirse/evento/" + eventoId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        num_participantes_por_usuario: numParticipantesPorUsuario
      })
    })
        .then((resp) => {
          return resp.json();
        })
        .catch((error) => {
          console.log("error " + error);
        });
}

// export const obtenerDatosperfil = () => {
//     return fetch(HOSTNAME + "/perfil", 
//     {
//         method: "GET",
//         headers: {"Content-Type":"application/json"}
        
//     }).then((resp) => {
//         return resp.json()
//     }). catch((error) => {
//     console.log("error " +  error)
// })

// }

export const obtenerDatosperfil = () => {
	return fetch(HOSTNAME + "/perfil", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
