import "./doctor-edit.css";
import Navbar from "../../components/navbar/navbar.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDoctors } from "../../hooks/useDoctors.js";
//import Doctor from "../../components/doctor/doctor.jsx";
//import api from "../../constants/api.js";


export default function DoctorEdit() {
  //const navigate = useNavigate("");

  const { doctors, LoadDoctors } = useDoctors([]);
  
  const [idDoctor, setIdDoctors] = useState("");
  //const [nameDoctor, setDoctorName] = useState("");
  const [gender, setGender] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [crm, setCrm] = useState("");
  const [phone, setPhone] = useState("");
  const [active, setActive] = useState("1");


  async function SaveDoctor() {
    
  }



  useEffect(() => {
    const loadData = async () => {
      await LoadDoctors();
    };
    loadData();
  },[LoadDoctors]);

  return (
    <div>
      <Navbar />

      <div className="container-fluid mt-page">
        <div className="row col-lg-4 offset-lg-4">
          <div className="col-12 mt-2">
            <h2>Editar médico</h2>
          </div>

          <div className="col-12 mt-4">
            <label htmlFor="doctors" className="form-label">
              Nome do Médicos
            </label>
            <div className="form-control mb-2">
              <select 
              name="doctor" 
              id="doctor"
              value={idDoctor}
              onChange={(e) => setIdDoctors(e.target.value)}
              >
              <option value="0">Selecione o médico</option>
              {doctors.map((doc) => {
                return (
                  <option key={doc.id_doctor}  value={doc.id_doctor}>
                    {doc.name}
                  </option>
                );
              })}
              </select>
            </div>
          </div>

          <div className="col-12 mt-4">
            <label htmlFor="gender" className="form-label">
              Sexo 
            </label>
              <div className="form-control mb-2">
                <select 
                name="icon" 
                id="icon"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                >
                <option value="0">Selecione o sexo</option>
                {gender.map((ge) => {
                  return (
                    <option key={ge.gender} value={ge.gender}>
                      {ge.gender}
                    </option>
                  )
                })}
                </select>
              </div>
          </div>

          <div className="col-12 mt-4">
            <label htmlFor="doctors" className="form-label">
              Especialidade
            </label>
            <select
              name="specialty"
              id="specialty"
              className="form-control"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            >
              <option value="">Selecione uma especialidade</option>
              {specialty.map((spec) =>{
                return (
                  <option key={spec.specialty} value={spec.specialty}>
                    {spec.specialty}
                  </option>
                )
              })}
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