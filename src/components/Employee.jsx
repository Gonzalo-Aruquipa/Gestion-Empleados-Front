import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EmployeeCard } from "./EmployeeCard";

export const Employee = () => {
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();
  const URL = "http://localhost:3000";


  // const token = localStorage.getItem("token");
  const getEmployees = async () => {
    try {
      const response = await axios.get(`${URL}/employees`,
      //  {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
      );
      setEmployees(response.data);
    } catch (error) {
      if (error.response.status == 500) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getEmployees();
    // if (token !== "") {
    //   getClientes();
    // } else {
    //   navigate("/login");
    // }
  }, []);

  // if (!token) {
  //   navigate("/login");
  // }


  return (
    <>
      <h2>Empleados</h2>

      <Link to={"/create-empleado"} className="btn btn-verde nvo-cliente">
        {" "}
        <i className="fas fa-plus-circle"></i>
        Nuevo Empleado
      </Link>

      <ul className="listado-clientes">
        {employees.map((employees) => (
          <EmployeeCard
            key={employees._id}
            id={employees._id}
            name={employees.name}
            lastname={employees.lastname}
            cellphone={employees.cellphone}
            gender={employees.gender}
            email={employees.email}
            department={employees.department.name}
          />
        ))}
      </ul>
    </>
  );
};
