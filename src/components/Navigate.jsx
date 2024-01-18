import { Link} from "react-router-dom";

export const Navigate = () => {

  // const token = localStorage.getItem("token");

  // if(!token) return null;
  return (
    <aside className="sidebar col-3">
      <h2>Administración</h2>

      <nav className="navegacion">
        <Link to="/employees" className="clientes">
          Empleados
        </Link>
        <Link to="/departments" className="productos">
          Departamentos
        </Link>
      </nav>
    </aside>
  );
};
