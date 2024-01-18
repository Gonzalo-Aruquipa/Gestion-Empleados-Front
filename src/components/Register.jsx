import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Register = () => {
  const URL = "http://localhost:3000";

  const [input, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    profile: "admin"
  });


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}/users/register`, input);
      Swal.fire("OK", "Registro exitoso", "success");
      navigate("/login")
    } catch (error) {
      console.log(error);
      if(error.response){
        Swal.fire("Hubo un error", error.response.data, "error");
      }else{
        Swal.fire("Hubo un error", "Hubo un error", "error");
      }


    }
  };

  const handleChange = (e) => {
    setInputs({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="login">
        <h2>Registro Usuario</h2>
        <div className="contenedor-formulario">
          <form onSubmit={handleSubmit}>
            <div className="campo">
              <label>Nombre</label>
              <input
                type="text"
                name="name"
                required
                onChange={handleChange}
              />
            </div>
            <div className="campo">
              <label>Email</label>
              <input
                type="text"
                name="email"
                required
                onChange={handleChange}
              />
            </div>
            <div className="campo">
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
              />
            </div>
            <input
              type="submit"
              value={"Registrar"}
              className="btn btn-verde btn-block"
            />
          </form>
        </div>
      </div>
    </>
  );
};
