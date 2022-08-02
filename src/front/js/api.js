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
export const obtenerDetallesEvento = (eventoId) => {
  let failed = false
  return fetch (HOSTNAME + "/evento/" + eventoId, {
    method: "GET",
    headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
  }).then((resp)=> {
    if (!resp.ok){
      failed = true
    }
    return resp.json();
  }).then((data)=>{
    if (failed){
      throw new Error(`${data.message}`);
    }
    return Promise.resolve(data)
  });
}
export const unirseEvento = (eventoId, numParticipantesPorUsuario) => {
  let failed = false
  return fetch(HOSTNAME + "/unirse/evento/" + eventoId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
    body: JSON.stringify({
      num_participantes_por_usuario: parseInt(numParticipantesPorUsuario),
    }),
  }).then((resp) => {
    if (!resp.ok) {
      failed = true
    }
    return resp.json();
  }).then((data)=>{
    if (failed){
      throw new Error(`${data.message}`);
    }
    return Promise.resolve(data)
  });
};
export const retirarseDeEvento = async (eventoId) => {
  let failed = false
  const resp = await fetch(HOSTNAME + "/retirarse/evento/" + eventoId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
  if (!resp.ok) {
    failed = true;
  }
  const data = await resp.json();
  if (failed) {
    throw new Error(`${data.message}`);
  }
  return await Promise.resolve(data);
};



export const obtenerDatosperfil = () => {
  return fetch(HOSTNAME + "/perfil", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
