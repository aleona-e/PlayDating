import { HOSTNAME } from "./component/config.js";

export const obtenerActividades = async () => {
  try {
    const resp = await fetch(HOSTNAME + "/actividades", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await resp.json();
  } catch (error) {
    console.log("error " + error);
  }
};

export const unirseEvento = async (eventoId, numParticipantesPorUsuario) => {
  let failed = false
  const resp = await fetch(HOSTNAME + "/unirse/evento/" + eventoId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
    body: JSON.stringify({
      num_participantes_por_usuario: parseInt(numParticipantesPorUsuario),
    }),
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

export const dejarComentario = async (eventoId, comentario) => {
  let failed = false
  const resp = await fetch(HOSTNAME + "/nuevo_comentario/" + eventoId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
    body: JSON.stringify({
      comentario,
    }),
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

export const obtenerComentarios = async (eventoId) => {
  let failed = false
  const resp = await fetch(HOSTNAME + "/comentarios/" + eventoId, {
    method: "GET",
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

export const eliminarComentario = async (comentarioId) => {
  let failed = false
  const resp = await fetch(HOSTNAME + "/borrar_comentario/" + comentarioId, {
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


