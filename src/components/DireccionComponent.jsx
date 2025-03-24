"use client"

import { useState, useEffect } from "react"
import { createDireccion, getDireccion, updateDireccion } from "../services/DireccionesService"
import { useNavigate, useParams } from "react-router-dom"

const DireccionComponent = () => {
  const [calle, setCalle] = useState("")
  const [altura, setAltura] = useState("")
  const [alumnoId, setAlumnoId] = useState("")

  const navigator = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      getDireccion(id)
        .then((response) => {
          setCalle(response.data.calle)
          setAltura(response.data.altura.toString())
          setAlumnoId(response.data.alumnoId)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [id])

  const [errors, setErrors] = useState({
    calle: "",
    altura: "",
    alumnoId: "",
  })

  const handleCalle = (e) => setCalle(e.target.value)
  const handleAltura = (e) => setAltura(e.target.value)
  const handleAlumnoId = (e) => setAlumnoId(e.target.value)

  function saveOrUpdateDireccion(e) {
    e.preventDefault()

    if (validateForm()) {
      const direccion = { calle, altura, alumnoId }
      console.log(direccion)

      if (id) {
        updateDireccion(id, direccion)
          .then((response) => {
            console.log(response.data)
            navigator("/")
          })
          .catch((error) => {
            console.error(error)
          })
      } else {
        createDireccion(direccion)
          .then((response) => {
            console.log(response.data)
            navigator("/")
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }

  function validateForm() {
    let valid = true

    const errorCopy = { ...errors }

    if (calle.trim()) {
      errorCopy.calle = ""
    } else {
      errorCopy.calle = "Debe ingresar una calle"
      valid = false
    }
    if (altura.toString().trim()) {
      errorCopy.altura = ""
    } else {
      errorCopy.altura = "Debe ingresar una altura"
      valid = false
    }
    if (alumnoId.toString().trim()) {
      errorCopy.alumnoId = ""
    } else {
      errorCopy.alumnoId = "Debe ingresar una ID de Alumno"
      valid = false
    }

    setErrors(errorCopy)

    return valid
  }
  function pageTitle() {
    if (id) {
      return <h2 className="text-center text-2xl font-bold mb-4">Modificar Direccion</h2>
    } else {
      return <h2 className="text-center text-2xl font-bold mb-4">Agregar Direccion</h2>
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
                <label className="block text-gray-700 text-sm font-bold mb-2">Calle:</label>
                <input
                  type="text"
                  placeholder="Ingresa la calle"
                  name="calle"
                  value={calle}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.calle ? "border-red-500" : "border-gray-300"
                  }`}
                  onChange={handleCalle}
                ></input>
                {errors.calle && <div className="text-red-500 text-xs mt-1">{errors.calle}</div>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Altura:</label>
                <input
                  type="text"
                  placeholder="Ingrese la altura"
                  name="altura"
                  value={altura}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.altura ? "border-red-500" : "border-gray-300"
                  }`}
                  onChange={handleAltura}
                ></input>
                {errors.altura && <div className="text-red-500 text-xs mt-1">{errors.altura}</div>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">ID de Alumno:</label>
                <input
                  type="text"
                  placeholder="Ingresa la ID del Alumno"
                  name="alumnoId"
                  value={alumnoId}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.alumnoId ? "border-red-500" : "border-gray-300"
                  }`}
                  onChange={handleAlumnoId}
                ></input>
                {errors.alumnoId && <div className="text-red-500 text-xs mt-1">{errors.alumnoId}</div>}
              </div>

              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={saveOrUpdateDireccion}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DireccionComponent

