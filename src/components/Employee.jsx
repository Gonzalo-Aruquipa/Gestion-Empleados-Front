import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EmployeeCard } from "./EmployeeCard";

export const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [deps, setDeps] = useState([]);

  const navigate = useNavigate();
  const URL = "http://localhost:3000";


  // const token = localStorage.getItem("token");

  const getDeps = async()=>{
    const response = await axios.get(`${URL}/departments`);
    setDeps(response.data);
  }
  
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
    getDeps();
    // if (token !== "") {
    //   getClientes();
    // } else {
    //   navigate("/login");
    // }
  }, []);

  // if (!token) {
  //   navigate("/login");
  // }

  const handleDeps = (e)=>{
    e.preventDefault();
    const getEmps = async()=>{
      const response = await axios.get(`${URL}/employees/dep/${e.target.value}`);
      setEmployees(response.data);
    }
    getEmps();
  }
  const handleGender = (e)=>{
    e.preventDefault();
    const getGemps = async()=>{
      const response = await axios.get(`${URL}/employees/gender/dep?gender=${e.target.value}`);
      setEmployees(response.data);
    }
    getGemps();
  }
  const handleSearch = (e)=>{
    e.preventDefault();
    const getName = async()=>{
      const response = await axios.get(`${URL}/employees//name/dep?name=${e.target.value}`);
      setEmployees(response.data);
    }
    getName();
  }

  return (
    <>
      <h2>Empleados</h2>
      

      <Link to={"/create-empleado"} className="btn btn-verde nvo-cliente">
        {" "}
        <i className="fas fa-plus-circle"></i>
        Nuevo Empleado
      </Link>

      <select name="" id=""
      className="btn btn-verde nvo-cliente"
      onChange={handleDeps}
      defaultValue={"DEFAULT"}
      >
        <option value="DEFAULT" disabled>Filtrar Por Departamento</option>
        {deps.map(dep=>
          <option value={dep._id} key={dep._id}>{dep.name}</option>)}

      </select>

      <select name="" id=""
      className="btn btn-verde nvo-cliente"
      onChange={handleGender}
      >
        <option value="DEFAULT">Filtrar Por Género</option>
        <option value="Masculine" >Masculino</option>
        <option value="Female" >Femenino</option>
      </select>
      <input type="search" className="btn btn-verde nvo-cliente" onChange={handleSearch} placeholder="Buscar"/>

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
