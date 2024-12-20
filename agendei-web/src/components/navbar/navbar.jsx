import "./navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-white.png";
import { useEffect, useState } from "react";

function Navbar() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("sessionName");
    if(name) {
      setUserName(name);
    }
  }, []);

  return (
    <nav
      className="navbar fixed-top navbar-expand-lg bg-primary"
      data-bs-theme="dark">

      <div className="container-fluid">
        <Link className="navbar-brand" to="/appointments">
          <img
            className="navbar-logo"
            src={logo}
            alt="logo do aplicativo em branco"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/appointments">Agendamentos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/doctors">Médicos</Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="btn-group">
                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  {userName}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="#">Meu Perfil</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/">Desconectar</Link></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
