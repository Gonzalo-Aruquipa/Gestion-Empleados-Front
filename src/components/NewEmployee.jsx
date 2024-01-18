import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export const NewEmployee = () => {
  const URL = "http://localhost:3000";
  const token = localStorage.getItem("token");

  const [deps, setDeps] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    lastname: "",
    gender: "",
    email: "",
    cellphone: "",
    department: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  let handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
    setError(validate({ ...employee, [e.target.name]: e.target.value }));
  };

  const getDeps = async () => {
    const response = await axios.get(`${URL}/departments`);
    setDeps(response.data);
  };
  const postClientes = async () => {
    try {
      await axios.post(
        `${URL}/employees/new-employee`,
        employee
        //  {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      Swal.fire("OK", "El cliente se agregó correctamente", "success");
      navigate("/employees");
    } catch (error) {
      console.log(error);
      Swal.fire("Hubo un error", error, "error");
      navigate("/employees");
    }
  };
  useEffect(() => {
    getDeps();
  }, []);
  if (!token) {
    navigate("/login");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postClientes();

    setEmployee({
      name: "",
      lastname: "",
      gender: "",
      email: "",
      cellphone: "",
      department: "",
    });
  };

  function validate(employee) {
    const error = {};
    if (!employee.name) {
      error.name = "El Nombre no puede ir vacío";
    }
    if (!employee.lastname) {
      error.lastname = "El apellido no puede ir vacío";
    }

    if (!employee.email) {
      error.email = "E-mail no puede ir vacío";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(employee.email)
    ) {
      error.email = "E-mail Invalido";
    }
    if (!employee.cellphone) {
      error.cellphone = "El telefono no puede ir vacío";
    } else if (!/^[0-9.]/.test(employee.cellphone)) {
      error.cellphone = "Solo se permiten números";
    }
    return error;
  }
  return (
    <>
      <h2>Nuevo Empleado</h2>

      <form id="form" onSubmit={handleSubmit}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Empleado"
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {error.name && <p className="danger-p">{error.name}</p>}
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Empleado"
            name="lastname"
            onChange={(e) => handleChange(e)}
          />
          {error.lastname && <p className="danger-p">{error.lastname}</p>}
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          {error.email && <p className="danger-p">{error.email}</p>}
        </div>

        <div className="campo">
          <label>Celular:</label>
          <input
            type="text"
            placeholder="Teléfono Cliente"
            name="cellphone"
            onChange={(e) => handleChange(e)}
          />
          {error.telefono && <p className="danger-p">{error.telefono}</p>}
        </div>

        <div className="campo">
          <label>Género:</label>
          <select name="gender" id="" onChange={(e) => handleChange(e)}>
            <option value="Masculine">Masculino</option>
            <option value="Female">Femenino</option>
          </select>
        </div>

        <div className="campo">
          <label className="label">Departamento:</label>
          <select
            className="selectp"
            name="department"
            onChange={(e) => handleChange(e)}
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled></option>
            {deps.length !== 0
              ? deps.map((dep) => 
                  <option value={dep._id} key={dep._id}>
                    {dep.name}
                  </option>
                )
              : null}
          </select>
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Empleado"
            disabled={
              error.name || error.lastname || error.email || error.cellphone
                ? true
                : false
            }
          />
        </div>
      </form>
    </>
  );
};
