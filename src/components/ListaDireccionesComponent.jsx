"use client"

import { listaDirecciones, deleteDireccion } from "../services/DireccionesService"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const ListaDireccionesComponent = () => {
  const [direcciones, setDirecciones] = useState([])

  const navigator = useNavigate()

  useEffect(() => {
    getAllDirecciones()
  }, [])

  function getAllDirecciones() {
    listaDirecciones()
      .then((response) => {
        setDirecciones(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  function addDireccion() {
    navigator("/add-direccion")
  }
  function updateDireccion(id) {
    navigator(`/edit-direccion/${id}`)
  }
  function removeDireccion(id) {
    console.log(id)
    deleteDireccion(id)
      .then((response) => {
        getAllDirecciones()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-2xl font-bold mb-4">Lista de Direcciones</h2>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={addDireccion}
      >
        Añadir Direccion
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Calle</th>
              <th className="px-4 py-2 border">Altura</th>
              <th className="px-4 py-2 border">ID Alumno</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {direcciones.map((direccion) => (
              <tr key={direccion.id}>
                <td className="px-4 py-2 border">{direccion.id}</td>
                <td className="px-4 py-2 border">{direccion.calle}</td>
                <td className="px-4 py-2 border">{direccion.altura}</td>
                <td className="px-4 py-2 border">{direccion.alumnoId}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded mr-2"
                    onClick={() => updateDireccion(direccion.id)}
                  >
                    Modificar
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                    onClick={() => removeDireccion(direccion.id)}
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

export default ListaDireccionesComponent

