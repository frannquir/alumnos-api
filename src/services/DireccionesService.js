import axios from "axios";

const DIRECCIONES_REST_API_BASE_URL = "http://localhost:8080/api/direcciones";

export const listaDirecciones = () => axios.get(DIRECCIONES_REST_API_BASE_URL);

export const createDireccion = (direccion) =>
  axios.post(DIRECCIONES_REST_API_BASE_URL, direccion);

export const getDireccion = (direccionId) =>
  axios.get(DIRECCIONES_REST_API_BASE_URL + "/" + direccionId);

export const updateDireccion = (direccionId, direccion) =>
  axios.put(DIRECCIONES_REST_API_BASE_URL + "/" + direccionId, direccion);

export const deleteDireccion = (direccionId) =>
  axios.delete(DIRECCIONES_REST_API_BASE_URL + "/" + direccionId);
