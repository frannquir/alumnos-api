"use client";

import { useState, useEffect } from "react";
import {
  createAlumno,
  getAlumno,
  updateAlumno,
} from "../services/AlumnosService";
import { useNavigate, useParams } from "react-router-dom";


const AlumnoComponent = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [email, setEmail] = useState("");

  const navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getAlumno(id)
        .then((response) => {
          setNombre(response.data.nombre);
          setApellido(response.data.apellido);
          setEdad(response.data.edad.toString());
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    email: "",
  });

  const handleNombre = (e) => setNombre(e.target.value);
  const handleApellido = (e) => setApellido(e.target.value);
  const handleEdad = (e) => setEdad(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  function saveOrUpdateAlumno(e) {
    e.preventDefault();

    if (validateForm()) {
      const alumno = { nombre, apellido, edad, email };
      console.log(alumno);

      if (id) {
        updateAlumno(id, alumno)
          .then((response) => {
            console.log(response.data);
            navigator("/");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createAlumno(alumno)
          .then((response) => {
            console.log(response.data);
            navigator("/");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }
  function validateForm() {
    let valid = true;

    const errorCopy = { ...errors };

    if (nombre.trim()) {
      errorCopy.nombre = "";
    } else {
      errorCopy.nombre = "Debe ingresar un nombre";
      valid = false;
    }
    if (apellido.trim()) {
      errorCopy.apellido = "";
    } else {
      errorCopy.apellido = "Debe ingresar un apellido";
      valid = false;
    }
    if (edad.toString().trim()) {
      errorCopy.edad = "";
    } else {
      errorCopy.edad = "Debe ingresar una edad";
      valid = false;
    }
    if (email.trim()) {
      errorCopy.email = "";
    } else {
      errorCopy.email = "Debe ingresar un email";
      valid = false;
    }

    setErrors(errorCopy);

    return valid;
  }
  function pageTitle() {
    if (id) {
      return (
        <h2 className="text-center text-2xl font-bold mb-4">
          Modificar Alumno
        </h2>
      );
    } else {
      return (
        <h2 className="text-center text-2xl font-bold mb-4">Agregar Alumno</h2>
      );
    }
  }

  return (
    <div className="container mx-auto px-4">
      <div className="my-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {pageTitle()}
          <div className="p-6">
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nombre:
                </label>
                <input
                  type="text"
                  placeholder="Ingresa el nombre del alumno"
                  name="nombre"
                  value={nombre}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nombre ? "border-red-500" : "border-gray-300"
                  }`}
                  onChange={handleNombre}
                ></input>
                {errors.nombre && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.nombre}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Apellido:
                </label>
                <input
                  type="text"
                  placeholder="Ingresa el apellido del alumno"
                  name="apellido"
                  value={apellido}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.apellido ? "border-red-500" : "border-gray-300"
                  }`}
                  onChange={handleApellido}
                ></input>
                {errors.apellido && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.apellido}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Edad:
                </label>
                <input
                  type="text"
                  placeholder="Ingresa la edad del alumno"
                  name="edad"
                  value={edad}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.edad ? "border-red-500" : "border-gray-300"
                  }`}
                  onChange={handleEdad}
                ></input>
                {errors.edad && (
                  <div className="text-red-500 text-xs mt-1">{errors.edad}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  placeholder="Ingresa el email del alumno"
                  name="email"
                  value={email}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  onChange={handleEmail}
                ></input>
                {errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={saveOrUpdateAlumno}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AlumnoComponent;
