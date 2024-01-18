import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateDepartment = () => {
  const URL = "http://localhost:3000";
  // const token = localStorage.getItem("token");

  const [dep, setDep] = useState({
    name: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const {id} = useParams();

  let handleChange = (e) => {
    setDep({ ...dep, [e.target.name]: e.target.value });
    setError(validate({ ...dep, [e.target.name]: e.target.value }));
  };

  const getDep = async () => {
    const response = await axios.get(`${URL}/departments/${id}`);
    setDep(response.data);
  };
  
  const postDep = async () => {
    try {
      await axios.put(
        `${URL}/departments/${id}`,
        dep
        //  {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      Swal.fire("OK", "Cambios guardados correctamente", "success");
      navigate("/departments");
    } catch (error) {
      console.log(error);
      Swal.fire("Hubo un error", error, "error");
      navigate("/departments");
    }
  };
  useEffect(() => {
    getDep();
  }, []);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    postDep();

    setDep({
      name: "",
    });
  };

  function validate(dep) {
    const error = {};
    if (!dep.name) {
      error.name = "El Nombre no puede ir vacío";
    }
    return error;
  }
  return (
    <>
      <h2>Editar Departamento</h2>

      <form id="form" onSubmit={handleSubmit}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Empleado"
            name="name"
            value={dep.name}
            onChange={(e) => handleChange(e)}
          />
          {error.name && <p className="danger-p">{error.name}</p>}
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar Cambios"
            disabled={
              error.name 
                ? true
                : false
            }
          />
        </div>
      </form>
    </>
  );
};
