import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export const EmployeeCard = (employees) => {
  const navigate = useNavigate();
  const { id, name, lastname, cellphone, email, gender, department } = employees;

  const URL = "http://localhost:3000";
  const token = localStorage.getItem("token");

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Estás seguro?",
      text: "El Empleado se eliminará!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${URL}/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate("/employees")
        Swal.fire("Eliminado!", "El Empleado ha sido eliminado.", "success");
      }
    });
  };

  return (
    <>
      <li className="cliente" key={id}>
        <div className="info-cliente">
          <p className="nombre">
            {name} {lastname}
          </p>
          <p>{email}</p>
          <p>Tel: {cellphone}</p>
          <p>Género: {gender}</p>
          <p>Departamento: {department}</p>
        </div>
        <div className="acciones">
          <Link to={`/update-empleado/${id}`} className="btn btn-azul">
            <i className="fas fa-pen-alt"></i>
            Editar Empleado
          </Link>

          
          <button
            type="button"
            className="btn btn-rojo btn-eliminar"
            onClick={() => handleDelete(id)}
          >
            <i className="fas fa-times"></i>
            Eliminar Empleado
          </button>
        </div>
      </li>
    </>
  );
};
