import "./register.css";
import logo from "../../assets/logo.png";
import fundo from "../../assets/fundo.png";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="row">
      <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
        <form className="form-signin" action="">
          <img src={logo} alt="Logo do aplicativo" className="logo mb-5" />
          <h5 className="mb-5">
            Crie sua conta agora mesmo
          </h5>
          <h5 className="mb-3 text-secondary">Preencha os campos abaixo</h5>

          <div className="mt-4">
            <input type="nome" placeholder="Nome" className="form-control" />
          </div>
          <div className="mt-2">
            <input type="email" placeholder="E-mail" className="form-control" />
          </div>
          <div className="mt-2">
            <input
              type="password"
              placeholder="Senha"
              className="form-control"
            />
          </div>
          <div className="mt-2">
            <input
              type="password"
              placeholder="Confirme a senha"
              className="form-control"
            />
          </div>
          <div className="mt-3 mb-5">
            <button className="btn btn-primary w-100">Criar minha conta</button>
          </div>

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
