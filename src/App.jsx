import ListaAlumnosComponent from "./components/ListaAlumnosComponent"
import HeaderComponent from "./components/HeaderComponent"
import FooterComponent from "./components/FooterComponent"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AlumnoComponent from "./components/AlumnoComponent"
import ListaDireccionesComponent from "./components/ListaDireccionesComponent"
import DireccionComponent from "./components/DireccionComponent"
import "./index.css"

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <div className="pb-16">
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-col md:flex-row gap-8 p-4">
                  <ListaAlumnosComponent />
                  <ListaDireccionesComponent />
                </div>
              }
            ></Route>

            <Route path="/alumnos" element={<ListaAlumnosComponent />}></Route>
            <Route path="/direcciones" element={<ListaDireccionesComponent />}></Route>
            <Route path="/add-alumno" element={<AlumnoComponent />}></Route>
            <Route path="/add-direccion" element={<DireccionComponent />}></Route>
            <Route path="/edit-alumno/:id" element={<AlumnoComponent />}></Route>
            <Route path="/edit-direccion/:id" element={<DireccionComponent />}></Route>
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App

