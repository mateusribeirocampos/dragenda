import "./register.css";
import logo from "../../assets/logo.png";
import fundo from "../../assets/fundo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../constants/api";
import ErrorMessage from "../../components/error/errorMessage";
import SucessMessage from "../../components/sucess/sucessMessage";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const [msg, setMsg] = useState("");
  const [sucessMsg, setSucessMsg] = useState();

  async function ExecuteAccount() {
    setMsg("");

    if (password != confirmPassword) {
      setMsg("As senhas não conferem. Digite Novamente!");
      return;
    }

    try {
      const response = await api.post("/users/register", {
        name,
        email,
        password,
      });
      if (response.data) {
        console.log(response.data);
        localStorage.setItem("sessionToken", response.data.token);
        localStorage.setItem("sessionId", response.data.id_user);
        localStorage.setItem("sessionEmail", email);
        localStorage.setItem("sessionName", name);
        navigate("/appointments");
      } else {
        setMsg("Erro ao criar conta. Tente mais tarde.");
      }
    } catch (error) {
      if (error.response?.data.error) {
        console.log(error.response?.data.error);
        setMsg(error.response?.data.error);
      } else {
        setMsg("Erro ao criar conta. Tente mais tarde.");
      }
    }
    setSucessMsg("Conta criada com sucesso!");
  }

  return (
    <div className="row">
      <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
        <form className="form-signin" action="">
          <img src={logo} alt="Logo do aplicativo" className="logo mb-5" />
          <h5 className="mb-5">Crie sua conta agora mesmo</h5>
          <h5 className="mb-3 text-secondary">Preencha os campos abaixo</h5>

          <div className="mt-4">
            <input
              type="nome"
              placeholder="Nome"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-2">
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
          <div className="mt-2">
            <input
              type="password"
              placeholder="Confirme a senha"
              className="form-control"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="mt-3 mb-5">
            <button
              onClick={ExecuteAccount}
              className="btn btn-primary w-100"
              type="button"
            >
              Criar minha conta
            </button>
          </div>

          {msg && <ErrorMessage message={msg} />}
          {sucessMsg && <SucessMessage message={sucessMsg} />}

          <div>
            <span className="me-1">Já tenho uma conta. </span>
            <Link to="/">Acessar agora!</Link>
          </div>
        </form>
      </div>
      <div className="col-sm-7">
        <img src={fundo} alt="Imagem de fundo" className="background-login" />
      </div>
    </div>
  );
}

export default Register;
