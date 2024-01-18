import { useNavigate } from "react-router-dom";

export const Header = () => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleSesion = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="barra">
      <div className="contenedor">
        <div className="contenido-barra">
          <h1>Gestión de Empleados</h1>

          {token !== null ? (
            <button
              type="button"
              className="btn btn-rojo"
              onClick={handleSesion}
            >
              <i className="far fa-times-circle"></i>
              Cerrar Sesión
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
};
