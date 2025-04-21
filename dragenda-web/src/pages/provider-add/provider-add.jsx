import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import BusinessTypeSelector from "../../components/business-type/business-type-selector";
import api from "../../constants/api";
import "./provider-add.css";
import ErrorMessage from "../../components/error/errorMessage";
import SucessMessage from "../../components/sucess/sucessMessage";

function ProviderAdd() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [professionalId, setProfessionalId] = useState("");
  const [phone, setPhone] = useState("");
  const [icon, setIcon] = useState("M"); // M para masculino, F para feminino
  const [active, setActive] = useState(true);
  const [businessType, setBusinessType] = useState(null);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleBusinessTypeChange = (type) => {
    setBusinessType(type);
  };

  const handleSave = async () => {
    // Validações
    if (!name.trim()) {
      setError("Nome do prestador é obrigatório");
      return;
    }

    if (!businessType) {
      setError("É necessário selecionar um tipo de negócio");
      return;
    }

    const providerData = {
      id_business_type: businessType.id_business_type,
      name,
      specialty,
      professional_id: professionalId,
      phone,
      icon,
      active
    };

    try {
      const response = await api.post("/admin/providers", providerData);
      
      if (response.data) {
        setSuccessMsg("Prestador adicionado com sucesso!");
        
        // Redirecionar após 2 segundos
        setTimeout(() => {
          navigate("/providers");
        }, 2000);
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      
      if (error.response?.status === 401) {
        return navigate("/");
      }
      
      setError(error.response?.data?.error || "Erro ao adicionar prestador.");
    }
  };

  // Função para obter o termo específico baseado no tipo de negócio selecionado
  const getBusinessTypeTerms = () => {
    if (!businessType) {
      return {
        title: "Adicionar Prestador",
        providerType: "Prestador",
        professionalIdLabel: "Documento / Registro",
        specialtyLabel: "Especialidade"
      };
    }

    switch (businessType.name) {
      case "Clínica Médica":
        return {
          title: "Adicionar Médico",
          providerType: "Médico",
          professionalIdLabel: "CRM",
          specialtyLabel: "Especialidade Médica"
        };
      case "Barbearia":
        return {
          title: "Adicionar Barbeiro",
          providerType: "Barbeiro",
          professionalIdLabel: "CPF/CNPJ",
          specialtyLabel: "Especialidade"
        };
      case "Estúdio de Tatuagem":
        return {
          title: "Adicionar Tatuador",
          providerType: "Tatuador",
          professionalIdLabel: "CPF/CNPJ",
          specialtyLabel: "Estilo"
        };
      case "Odontologia":
        return {
          title: "Adicionar Dentista",
          providerType: "Dentista",
          professionalIdLabel: "CRO",
          specialtyLabel: "Especialidade Odontológica"
        };
      default:
        return {
          title: "Adicionar Prestador",
          providerType: "Prestador",
          professionalIdLabel: "Documento / Registro",
          specialtyLabel: "Especialidade"
        };
    }
  };

  const terms = getBusinessTypeTerms();

  return (
    <div>
      <Navbar />
      <div className="container mt-page">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">{terms.title}</h4>
              </div>
              <div className="card-body">
                {error && <ErrorMessage message={error} />}
                {successMsg && <SucessMessage message={successMsg} />}

                <div className="mb-4">
                  <BusinessTypeSelector 
                    selectedType={businessType} 
                    onChange={handleBusinessTypeChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nome *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={`Nome do ${terms.providerType.toLowerCase()}`}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="specialty" className="form-label">{terms.specialtyLabel}</label>
                  <input
                    type="text"
                    className="form-control"
                    id="specialty"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    placeholder={`Ex: Cardiologia, Corte Masculino, etc.`}
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="professionalId" className="form-label">{terms.professionalIdLabel}</label>
                    <input
                      type="text"
                      className="form-control"
                      id="professionalId"
                      value={professionalId}
                      onChange={(e) => setProfessionalId(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">Telefone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label d-block">Gênero</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="genderMale"
                      value="M"
                      checked={icon === "M"}
                      onChange={() => setIcon("M")}
                    />
                    <label className="form-check-label" htmlFor="genderMale">
                      <i className="bi bi-gender-male me-1"></i>
                      Masculino
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="genderFemale"
                      value="F"
                      checked={icon === "F"}
                      onChange={() => setIcon("F")}
                    />
                    <label className="form-check-label" htmlFor="genderFemale">
                      <i className="bi bi-gender-female me-1"></i>
                      Feminino
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="activeStatus"
                      checked={active}
                      onChange={() => setActive(!active)}
                    />
                    <label className="form-check-label" htmlFor="activeStatus">
                      Ativo
                    </label>
                  </div>
                </div>

                <div className="mt-4 d-flex justify-content-between">
                  <Link to="/providers" className="btn btn-outline-secondary">
                    Cancelar
                  </Link>
                  <button type="button" className="btn btn-primary" onClick={handleSave}>
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProviderAdd;