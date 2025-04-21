import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../constants/api";
import "./business-type-selector.css";

function BusinessTypeSelector({ selectedType, onChange }) {
  const [businessTypes, setBusinessTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadBusinessTypes() {
      try {
        const response = await api.get("/business-types");
        if (response.data) {
          setBusinessTypes(response.data);
        }
        setLoading(false);
      } catch (error) {
        if (error.response?.status === 401) {
          return navigate("/");
        }
        setError("Erro ao carregar tipos de negócio.");
        setLoading(false);
      }
    }

    loadBusinessTypes();
  }, [navigate]);

  const handleTypeChange = (e) => {
    const selectedId = e.target.value;
    const selectedType = businessTypes.find(
      (type) => type.id_business_type === parseInt(selectedId)
    );
    
    if (onChange) {
      onChange(selectedType);
    }
  };

  if (loading) {
    return <div className="spinner-border text-primary" role="status"></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  // Renderizar dropdown ou um seletor visual com ícones
  return (
    <div className="business-type-selector mb-4">
      <label htmlFor="business-type" className="form-label">
        Tipo de Estabelecimento
      </label>
      <select
        id="business-type"
        className="form-control"
        value={selectedType?.id_business_type || ""}
        onChange={handleTypeChange}
      >
        <option value="">Selecione o tipo de estabelecimento</option>
        {businessTypes.map((type) => (
          <option key={type.id_business_type} value={type.id_business_type}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default BusinessTypeSelector;