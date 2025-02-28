import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import { useState } from "react";
import api from "../../constants/api.js";
import { specialties } from "../../constants/specialties.js";

function DoctorAdd() {
  const navigate = useNavigate();
  const [nameDoctor, setDoctorName] = useState("");
  const [gender, setGender] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [crm, setCrm] = useState("");
  const [phone, setPhone] = useState("");
  const [active, setActive] = useState("1");

  async function SaveDoctor() {
    console.log("seving doctor...");
    if (!/^\d{4,6}$/.test(crm)) {
      return alert("CRM inválido! Use apenas números (4 a 6 dígitos)");
    }

    if (!gender) {
      return alert("Por favor, selecione um gênero.");
    }
    const json = {
      name: nameDoctor,
      specialty: specialty,
      crm: crm,
      telefone: phone,
      sexo: gender,
      ativo: active === "1" ? true : false,
    };
    if (!nameDoctor.trim() || !specialty.trim() || !crm.trim() || !phone.trim() || !active) {
      return alert("Por favor, preencha todos os campos.");
    }
    console.log(
      "nameDoctor: " + nameDoctor,
      "idService: " + specialty,
      "CRM: " + crm,
      "Phone: " + phone,
      "Active: " + active
    );

    try {
      const response = await api.post("/admin/doctors/", json);
      if (response.data) {
        navigate("/doctors");
      }
    } catch (error) {
      if (error.response?.data.error) {
        if (error.response.status === 400) {
          return navigate("/");
        } else alert("erro ao salvar médico: ");
      }
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container-fluid mt-page">
        <div className="row col-lg-4 offset-lg-4">
          <div className="col-12 mt-2">
            <h2>Adicionar médico</h2>
          </div>

          <div className="col-12 mt-4">
            <label htmlFor="doctors" className="form-label">
              Nome do Médicos
            </label>
            <input
              type="text"
              id="doctors"
              className="form-control"
              placeholder="Nome do novo médico completo"
              value={nameDoctor}
              onChange={(e) => setDoctorName(e.target.value)}
            />
          </div>

          <div className="col-12 mt-4">
            <label htmlFor="gender" className="form-label">
              Sexo 
            </label>
            <select
              id="gender"
              className="form-control"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="F">Feminino</option>
              <option value="M">Masculino</option>
            </select>
          </div>

          <div className="col-12 mt-4">
            <label htmlFor="doctors" className="form-label">
              Especialidade
            </label>
            <select
              id="specialty"
              className="form-control"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            >
              <option value="">Selecione uma especialidade</option>
              {specialties.map((spec, index) => (
                <option key={index} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div className="col-12 mt-4">
            <label htmlFor="crm" className="form-label">
              CRM (Conselho Regional de Medicina)
            </label>
            <input
              type="text"
              id="crm"
              className="form-control"
              placeholder="xxxxxx"
              value={crm}
              onChange={(e) => setCrm(e.target.value)}
            />
          </div>

          <div className="col-12 mt-4">
            <label htmlFor="phone" className="form-label">
              Telefone
            </label>
            <input
              type="text"
              id="phone"
              className="form-control"
              placeholder="(xx)xxxxx-xxxx"
              value={phone}
              onChange={(e) => {
                const value = e.target.value
                .replace(/\D/g, '')
                .replace(/^(\d{2})(\d)/g, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2');
              setPhone(value);
              }}
              maxLength={15}
            />
          </div>

          <div className="col-12 mt-4">
            <label htmlFor="active" className="form-label">
              Ativo
            </label>
            <select
              id="active"
              className="form-control"
              value={active}
              onChange={(e) => setActive(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="1">Sim</option>
              <option value="0">Não</option>
            </select>
          </div>

          <div className="col-12 mt-4">
            <div className="d-flex justify-content-end">
              <Link to="/appointments" className="btn btn-outline-primary me-2">
                Cancelar
              </Link>
              <button onClick={SaveDoctor} className="btn btn-primary">
                Salvar dados
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorAdd;
