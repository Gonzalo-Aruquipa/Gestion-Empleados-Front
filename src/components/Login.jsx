import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Login = () => {
  const URL = "http://localhost:3000";

  const [input, setInputs] = useState({
    email: "",
    password: "",
  });


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}/users/login`, input);
      const  token  = response.data;
      localStorage.setItem("token", token);
      Swal.fire("OK", "Bienvenido", "success");
      navigate("/")
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
        <h2>Iniciar Sesión</h2>
        <div className="contenedor-formulario">
          <form onSubmit={handleSubmit}>
            <div className="campo">
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="admin@gmail.com"
                required
                onChange={handleChange}
              />
            </div>
            <div className="campo">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="123456"
                required
                onChange={handleChange}
              />
            </div>
            <input
              type="submit"
              value={"Iniciar Sesión"}
              className="btn btn-verde btn-block"
            />
          </form>
          <div className="campo">
              <Link to={"/register" }>
                ¿No tienes una cuenta? Regístrate
              </Link>
            </div>
        </div>
      </div>
    </>
  );
};
