"use client"

import { useEffect, useState } from "react"
import { deleteAlumno, listaAlumnos } from "../services/AlumnosService"
import { useNavigate } from "react-router-dom"

const ListaAlumnosComponent = () => {
  const [alumnos, setAlumnos] = useState([])

  const navigator = useNavigate()

  useEffect(() => {
    getAllAlumnos()
  }, [])

  function getAllAlumnos() {
    listaAlumnos()
      .then((response) => {
        setAlumnos(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function addAlumno() {
    navigator("/add-alumno")
  }
  function updateAlumno(id) {
    navigator(`/edit-alumno/${id}`)
  }
  function removeAlumno(id) {
    console.log(id)
    deleteAlumno(id)
      .then((response) => {
        getAllAlumnos()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-2xl font-bold mb-4">Lista de Alumnos</h2>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4" onClick={addAlumno}>
        Añadir Alumno
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Apellido</th>
              <th className="px-4 py-2 border">Edad</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((alumno) => (
              <tr key={alumno.id}>
                <td className="px-4 py-2 border">{alumno.id}</td>
                <td className="px-4 py-2 border">{alumno.nombre}</td>
                <td className="px-4 py-2 border">{alumno.apellido}</td>
                <td className="px-4 py-2 border">{alumno.edad}</td>
                <td className="px-4 py-2 border">{alumno.email}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded mr-2"
                    onClick={() => updateAlumno(alumno.id)}
                  >
                    Modificar
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                    onClick={() => removeAlumno(alumno.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListaAlumnosComponent

