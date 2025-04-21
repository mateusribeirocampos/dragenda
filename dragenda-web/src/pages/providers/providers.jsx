import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import BusinessTypeSelector from "../../components/business-type/business-type-selector";
import api from "../../constants/api";
import "./providers.css";

function Providers() {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [selectedBusinessType, setSelectedBusinessType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [searchName, setSearchName] = useState("");

  const loadProviders = useCallback(async () => {
    try {
      setLoading(true);
      
      // Construir parâmetros de consulta
      const params = {};
      if (searchName) params.name = searchName;
      if (selectedBusinessType) params.id_business_type = selectedBusinessType.id_business_type;
      
      const response = await api.get("/admin/providers", { params });
      
      if (response.data) {
        setProviders(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar prestadores:", error);
      if (error.response?.status === 401) {
        return navigate("/");
      }
      setError("Erro ao carregar prestadores de serviço.");
      setLoading(false);
    }
  }, [navigate, selectedBusinessType, searchName]);

  useEffect(() => {
    loadProviders();
  }, [loadProviders]);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este prestador? Esta ação não pode ser desfeita.")) {
      try {
        await api.delete(`/admin/providers/${id}`);
        setSuccessMsg("Prestador excluído com sucesso!");
        
        // Recarregar a lista
        loadProviders();
        
        // Limpar mensagem de sucesso após alguns segundos
        setTimeout(() => {
          setSuccessMsg(null);
        }, 3000);
      } catch (error) {
        if (error.response?.status === 401) {
          return navigate("/");
        }
        setError("Erro ao excluir prestador.");
      }
    }
  };

  const handleBusinessTypeChange = (type) => {
    setSelectedBusinessType(type);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadProviders();
  };

  // Função para obter o termo específico do tipo de prestador
  const getProviderTypeName = useCallback(() => {
    if (!selectedBusinessType) return "Prestadores";
    
    // Termos padrão para diferentes tipos de negócio
    switch (selectedBusinessType.name) {
      case "Clínica Médica": return "Médicos";
      case "Barbearia": return "Barbeiros";
      case "Estúdio de Tatuagem": return "Tatuadores";
      case "Odontologia": return "Dentistas";
      default: return "Prestadores";
    }
  }, [selectedBusinessType]);

  return (
    <div>
      <Navbar />
      <div className="container-fluid mt-page">
        <div className="row mb-4">
          <div className="col-md-6">
            <h2>{getProviderTypeName()}</h2>
          </div>
          <div className="col-md-6 text-md-end">
            <Link to="/providers/add" className="btn btn-primary">
              <i className="bi bi-plus-lg"></i> Novo Prestador
            </Link>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <BusinessTypeSelector 
              selectedType={selectedBusinessType} 
              onChange={handleBusinessTypeChange}
            />
          </div>
          <div className="col-md-6">
            <form onSubmit={handleSearch} className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Buscar por nome..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <button type="submit" className="btn btn-outline-primary">
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>
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
            {providers.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-info">
                  Nenhum prestador encontrado. {selectedBusinessType ? 
                    `Tente selecionar outro tipo de negócio ou adicione um novo prestador para ${selectedBusinessType.name}.` : 
                    `Selecione um tipo de negócio ou adicione um novo prestador.`}
                </div>
              </div>
            ) : (
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Especialidade</th>
                        <th>Tipo de Negócio</th>
                        <th>Documento</th>
                        <th>Telefone</th>
                        <th>Status</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {providers.map((provider) => (
                        <tr key={provider.id_provider}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className={`provider-icon ${provider.icon === 'F' ? 'female' : 'male'} me-2`}>
                                <i className={`bi ${provider.icon === 'F' ? 'bi-gender-female' : 'bi-gender-male'}`}></i>
                              </div>
                              {provider.name}
                            </div>
                          </td>
                          <td>{provider.specialty || "-"}</td>
                          <td>{provider.business_type_name}</td>
                          <td>{provider.professional_id || "-"}</td>
                          <td>{provider.phone || "-"}</td>
                          <td>
                            <span className={`badge ${provider.active ? 'bg-success' : 'bg-danger'}`}>
                              {provider.active ? "Ativo" : "Inativo"}
                            </span>
                          </td>
                          <td>
                            <div className="btn-group" role="group">
                              <Link 
                                to={`/providers/edit/${provider.id_provider}`} 
                                className="btn btn-sm btn-outline-primary"
                              >
                                <i className="bi bi-pencil"></i>
                              </Link>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(provider.id_provider)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                              <Link 
                                to={`/providers/${provider.id_provider}/services`} 
                                className="btn btn-sm btn-outline-secondary"
                              >
                                <i className="bi bi-gear"></i>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Providers;