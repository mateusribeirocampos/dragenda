import "./login.css";
import logo from "../../assets/logo.png";
import fundo from "../../assets/fundo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../constants/api.js";
import ErrorMessage from "../../components/error/errorMessage.jsx";

function Login() {
  // const navigate = useNavigate(); // tem que importar o useNavigate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function ExecuteLogin() {

    setMsg("");

    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });
      if (response.data) {
        console.log(response.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      if(error.response?.data.error) {
        console.log(error.response?.data.error);
        setMsg(error.response?.data.error);
      } else {
      setMsg("Erro ao efetuar o login. Tente mais tarde. 😕");
      }
    }
    // navigate("/appointments");
  }

  return (
    <div className="row">
      <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
        <form className="form-signin" action="">
          <img src={logo} alt="Logo do aplicativo" className="logo mb-5" />
          <h5 className="mb-5">
            Gerencie sues agendamentos de forma descomplicada
          </h5>
          <h5 className="mb-3 text-secondary">Acesse sua conta</h5>

          <div className="mt-4">
            <input
              type="email"
              placeholder="E-mail"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <input
              type="password"
              placeholder="Senha"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-3 mb-5">
            <button
              onClick={ExecuteLogin}
              className="btn btn-primary w-100"
              type="button"
            >
              Login
            </button>
          </div>

          {msg && <ErrorMessage message={msg} />}

          <div>
            <span className="me-1">Não tenho uma conta. </span>
            <Link to="/register">Criar agora!</Link>
          </div>
        </form>
      </div>
      <div className="col-sm-7">
        <img src={fundo} alt="Imagem de fundo" className="background-login" />
      </div>
    </div>
  );
}

export default Login;
