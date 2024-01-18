import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Navigate } from "./components/Navigate";
import { Employee } from "./components/Employee";
import { NewEmployee } from "./components/NewEmployee";
import { UpdateEmployee } from "./components/UpdateEmployee";
import { Department } from "./components/Department";
import { NewDepartment } from "./components/NewDepartment";
import { UpdateDepartment } from "./components/UpdateDepartment";

function App() {

  return (
    <>
      <Router>
        <Header />
        <div className="grid contenedor contenido-principal">
          <Navigate />
          <main className="caja-contenido col-9">
            <Routes>
              <Route exact path="/" element={<Employee />} />
              <Route exact path="/employees" element={<Employee />} />
              <Route exact path="/create-empleado" element={<NewEmployee />} />
              <Route exact path="/update-empleado/:id" element={<UpdateEmployee />} />
              <Route exact path="/departments" element={<Department/>} />
              <Route exact path="/create-dep" element={<NewDepartment/>} />
              <Route exact path="/update-dep/:id" element={<UpdateDepartment/>} />
              
            </Routes>
          </main>
        </div>
      </Router>
    </>
  )
}

export default App
