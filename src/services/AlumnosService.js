import axios from "axios";

const ALUMNOS_REST_API_BASE_URL = "http://localhost:8080/api/alumnos";

export const listaAlumnos = () => axios.get(ALUMNOS_REST_API_BASE_URL);

export const createAlumno = (alumno) =>
  axios.post(ALUMNOS_REST_API_BASE_URL, alumno);

export const getAlumno = (alumnoId) =>
  axios.get(ALUMNOS_REST_API_BASE_URL + "/" + alumnoId);

export const updateAlumno = (alumnoId, alumno) =>
  axios.put(ALUMNOS_REST_API_BASE_URL + "/" + alumnoId, alumno);

export const deleteAlumno = (alumnoId) =>
  axios.delete(ALUMNOS_REST_API_BASE_URL + "/" + alumnoId);
