import "./doctor-edit.css";
import Navbar from "../../components/navbar/navbar.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import api from "../../constants/api.js";
import { specialties } from "../../constants/specialties.js";

export default function DoctorEdit() {
  const navigate = useNavigate();
  const { id_doctor } = useParams();
  
  // Estados para armazenar os dados
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [gender, setGender] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [crm, setCrm] = useState("");
  const [phone, setPhone] = useState("");
  const [active, setActive] = useState("1");

  // Opções de gênero
  const genderOptions = [
    { value: "M", label: "Masculino" },
    { value: "F", label: "Feminino" }
  ];

   // Carregar detalhes de um médico específico
  const LoadDoctorDetails = useCallback(async (id) => {
    if (!id) return;
    
    console.log("LoadDoctorDetails:", id);
    try {
      const response = await api.get("/admin/doctors/" + id);
      if (response.data) {
        console.log("Detalhes do médico:", response.data);
        setDoctorName(response.data.name || "");
        setGender(response.data.icon || "");
        setSpecialty(response.data.specialty || "");
        setCrm(response.data.crm || "");
        setPhone(response.data.telefone || response.data.phone || "");
        setActive(response.data.ativo ? "1" : "0");
      }
    } catch (error) {
      console.error("Erro ao carregar detalhes:", error);
      if (error.response?.data.error)
        if (error.response.status === 401) {
          return navigate("/");
        } else alert("Erro ao carregar detalhes do médico.");
    }
  }, [navigate]);

   // Carregar todos os médicos
   const LoadDoctors = useCallback(async () => {
    console.log("LoadDoctors...");
    try {
      const response = await api.get("/doctors");
      if (response.data) {
        setDoctors(response.data);
        console.log("Médicos carregados:", response.data);
        
        // Se temos um id_doctor na URL, selecionamos esse médico
        if (id_doctor) {
          setSelectedDoctorId(id_doctor);
          await LoadDoctorDetails(id_doctor);
        }
      }
    } catch (error) {
      if (error.response?.data.error)
        if (error.response.status === 401) {
          return navigate("/");
        } else alert("Erro ao listar médicos.");
    }
  }, [navigate, id_doctor, LoadDoctorDetails]);

  // Função para salvar edições
  async function SaveDoctor() {
    if (!selectedDoctorId) {
      return alert("Por favor, selecione um médico.");
    }

    if (!doctorName.trim() || !gender || !specialty.trim() || !crm.trim() || !phone.trim()) {
      return alert("Por favor, preencha todos os campos.");
    }

    const json = {
      name: doctorName,
      specialty: specialty,
      crm: crm,
      telefone: phone,
      icon: gender,
      ativo: active === "1"
    };

    console.log("Dados a salvar:", json);

    try {
      const response = await api.put("/admin/doctors/" + selectedDoctorId, json);
      if (response.data) {
        alert("Médico atualizado com sucesso!");
        navigate("/doctors");
      }
    } catch (error) {
      if (error.response?.data.error) {
        if (error.response.status === 401) {
          return navigate("/");
        } else alert("Erro ao atualizar médico: " + error.response.data.error);
      } else {
        alert("Erro ao atualizar médico.");
      }
    }
  }

  // Handler para quando o médico é selecionado no dropdown
  const handleDoctorChange = async (e) => {
    const doctorId = e.target.value;
    setSelectedDoctorId(doctorId);
    
    if (doctorId && doctorId !== "0") {
      await LoadDoctorDetails(doctorId);
    } else {
      // Limpar campos se nenhum médico for selecionado
      setDoctorName("");
      setGender("");
      setSpecialty("");
      setCrm("");
      setPhone("");
      setActive("1");
    }
  };

  // Carregar dados iniciais
  useEffect(() => {
    LoadDoctors();
  }, [LoadDoctors]);

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
              Selecione o Médico
            </label>
            <div className="form-control mb-2">
              <select
                name="doctor"
                id="doctor"
                value={selectedDoctorId}
                onChange={handleDoctorChange}
              >
                <option value="0">Selecione o médico</option>
                {doctors.map((doc) => (
                  <option key={doc.id_doctor} value={doc.id_doctor}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mostrar os campos de edição apenas se um médico for selecionado */}
          {selectedDoctorId && selectedDoctorId !== "0" && (
            <>
              <div className="col-12 mt-4">
                <label htmlFor="doctorName" className="form-label">Nome do Médico</label>
                <input
                  type="text"
                  className="form-control"
                  id="doctorName"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                />
              </div>

              <div className="col-12 mt-4">
                <label htmlFor="gender" className="form-label">Sexo</label>
                <select 
                  name="gender" 
                  id="gender"
                  className="form-control"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Selecione o sexo</option>
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 mt-4">
                <label htmlFor="specialty" className="form-label">Especialidade</label>
                <select
                  name="specialty"
                  id="specialty"
                  className="form-control"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  <option value="">Selecione a especialidade</option>
                  {specialties.map((spec, index) => (
                    <option key={index} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 mt-4">
                <label htmlFor="crm" className="form-label">CRM</label>
                <input
                  type="text"
                  className="form-control"
                  id="crm"
                  value={crm}
                  onChange={(e) => setCrm(e.target.value)}
                />
              </div>

              <div className="col-12 mt-4">
                <label htmlFor="phone" className="form-label">Telefone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="col-12 mt-4">
                <label htmlFor="active" className="form-label">Ativo</label>
                <select
                  id="active"
                  className="form-control"
                  value={active}
                  onChange={(e) => setActive(e.target.value)}
                >
                  <option value="1">Sim</option>
                  <option value="0">Não</option>
                </select>
              </div>
            </>
          )}

          <div className="col-12 mt-4">
            <div className="d-flex justify-content-end">
              <Link to="/doctors" className="btn btn-outline-primary me-2">
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