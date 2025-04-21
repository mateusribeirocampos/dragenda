import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import api from "../../constants/api";
import "./business-types.css";

function BusinessTypes() {
  const navigate = useNavigate();
  const [businessTypes, setBusinessTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const loadBusinessTypes = useCallback(async () => {
    try {
      const response = await api.get("/admin/business-types");
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
  }, [navigate]);

  useEffect(() => {
    loadBusinessTypes();
  }, [loadBusinessTypes]);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este tipo de negócio? Esta ação não pode ser desfeita.")) {
      try {
        await api.delete(`/admin/business-types/${id}`);
        setSuccessMsg("Tipo de negócio excluído com sucesso!");
        // Recarregar a lista
        loadBusinessTypes();
        
        // Limpar mensagem de sucesso após alguns segundos
        setTimeout(() => {
          setSuccessMsg(null);
        }, 3000);
      } catch (error) {
        if (error.response?.status === 401) {
          return navigate("/");
        }
        setError("Erro ao excluir tipo de negócio.");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid mt-page">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Tipos de Negócio</h2>
          <Link to="/business-types/add" className="btn btn-primary">
            <i className="bi bi-plus-lg"></i> Novo Tipo de Negócio
          </Link>
        </div>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError(null)}></button>
          </div>
        )}

        {successMsg && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {successMsg}
            <button type="button" className="btn-close" onClick={() => setSuccessMsg(null)}></button>
          </div>
        )}

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {businessTypes.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-info">
                  Nenhum tipo de negócio cadastrado. Clique em "Novo Tipo de Negócio" para começar.
                </div>
              </div>
            ) : (
              businessTypes.map((type) => (
                <div key={type.id_business_type} className="col-md-4 col-lg-3 mb-4">
                  <div className="card business-type-card h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-center mb-3">
                        <i className={`bi bi-${type.icon || 'building'} business-type-icon`}></i>
                      </div>
                      <h5 className="card-title text-center">{type.name}</h5>
                      <p className="card-text text-center text-muted">
                        {type.description || "Sem descrição"}
                      </p>
                    </div>
                    <div className="card-footer">
                      <div className="d-flex justify-content-between">
                        <Link 
                          to={`/business-types/edit/${type.id_business_type}`} 
                          className="btn btn-sm btn-outline-primary"
                        >
                          <i className="bi bi-pencil"></i> Editar
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(type.id_business_type)}
                        >
                          <i className="bi bi-trash"></i> Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BusinessTypes;