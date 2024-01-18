import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DepartmentCard } from "./DepartmentCard";

export const Department = () => {
  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();
  const URL = "http://localhost:3000";

  // const token = localStorage.getItem("token");
  const getClientes = async () => {
    try {
      const response = await axios.get(
        `${URL}/departments`
        //  {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      setDepartments(response.data);
    } catch (error) {
      if (error.response.status == 500) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getClientes();
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
      <h2>Departamentos</h2>

      <Link to={"/create-dep"} className="btn btn-verde nvo-cliente">
        {" "}
        <i className="fas fa-plus-circle"></i>
        Nuevo Departamento
      </Link>

      <ul className="listado-clientes">
        {departments.map((department) => (
          <DepartmentCard
            key={department._id}
            id={department._id}
            name={department.name}
          />
        ))}
      </ul>
    </>
  );
};
