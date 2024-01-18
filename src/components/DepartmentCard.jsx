import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export const DepartmentCard = (department) => {
  const navigate = useNavigate();
  const { id, name } = department;

  const URL = "http://localhost:3000";
  const token = localStorage.getItem("token");

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Estás seguro?",
      text: "El Departamento se eliminará!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${URL}/departments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate("/departments")
        Swal.fire("Eliminado!", "El Departamento ha sido eliminado.", "success");
      }
    });
  };

  return (
    <>
      <li className="cliente" key={id}>
        <div className="info-cliente">
          <p className="nombre">
            {name} 
          </p>
        </div>
        <div className="acciones">
          <Link to={`/update-dep/${id}`} className="btn btn-azul">
            <i className="fas fa-pen-alt"></i>
            Editar Departamento
          </Link>

          
          <button
            type="button"
            className="btn btn-rojo btn-eliminar"
            onClick={() => handleDelete(id)}
          >
            <i className="fas fa-times"></i>
            Eliminar Departamento
          </button>
        </div>
      </li>
    </>
  );
};
