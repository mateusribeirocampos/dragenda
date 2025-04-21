import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import api from "../../constants/api";
import "./business-type-add.css";
import ErrorMessage from "../../components/error/errorMessage";
import SucessMessage from "../../components/sucess/sucessMessage";

function BusinessTypeAdd() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("building");
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Opções de ícone disponíveis (Bootstrap Icons)
  const iconOptions = [
    { value: "building", label: "Prédio" },
    { value: "hospital", label: "Hospital" },
    { value: "scissors", label: "Tesoura" },
    { value: "palette", label: "Paleta" },
    { value: "brush", label: "Pincel" },
    { value: "heart-pulse", label: "Saúde" },
    { value: "capsule", label: "Cápsula" },
    { value: "tooth", label: "Dente" },
    { value: "bandaid", label: "Band-aid" },
    { value: "people", label: "Pessoas" },
    { value: "shop", label: "Loja" },
    { value: "stars", label: "Estrelas" },
    { value: "book", label: "Livro" },
    { value: "camera", label: "Câmera" },
    { value: "music-note", label: "Música" },
    { value: "car-front", label: "Carro" }
  ];

  const handleSave = async () => {
    // Validação básica
    if (!name.trim()) {
      setError("Nome do tipo de negócio é obrigatório");
      return;
    }

    try {
      const response = await api.post("/admin/business-types", {
        name,
        description,
        icon
      });

      if (response.data) {
        setSuccessMsg("Tipo de negócio adicionado com sucesso!");
        
        // Redirecionar após 2 segundos
        setTimeout(() => {
          navigate("/business-types");
        }, 2000);
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      
      if (error.response?.status === 401) {
        return navigate("/");
      }
      
      setError(error.response?.data?.error || "Erro ao adicionar tipo de negócio.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-page">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Adicionar Tipo de Negócio</h4>
              </div>
              <div className="card-body">
                {error && <ErrorMessage message={error} />}
                {successMsg && <SucessMessage message={successMsg} />}

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nome *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Barbearia, Estúdio de Tatuagem, etc."
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Descrição</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descreva este tipo de negócio"
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="form-label">Ícone</label>
                  <div className="row icon-selection">
                    {iconOptions.map((option) => (
                      <div key={option.value} className="col-3 col-md-2 mb-3 text-center">
                        <div 
                          className={`icon-option ${icon === option.value ? 'selected' : ''}`}
                          onClick={() => setIcon(option.value)}
                        >
                          <i className={`bi bi-${option.value} mb-2`}></i>
                          <small className="d-block">{option.label}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 d-flex justify-content-between">
                  <Link to="/business-types" className="btn btn-outline-secondary">
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

export default BusinessTypeAdd;