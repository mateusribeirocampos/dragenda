import axios from "axios";

// Detecta o ambiente para definir a URL da API
const getApiUrl = () => {
  const host = window.location.hostname;
  
  // Em produção
  if (host !== 'localhost' && host !== '127.0.0.1') {
    return "https://dragenda-api.onrender.com"; // Ajuste para seu endpoint de produção
  }
  
  // Em desenvolvimento local
  return "http://localhost:3001";
};

const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Intercepta as requisições para adicionar o token de autenticação
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('sessionToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Intercepta as respostas para lidar com erros de autenticação
api.interceptors.response.use(
  response => response,
  error => {
    // Se o erro for 401 (não autorizado) e não estamos na página de login/registro
    if (error.response?.status === 401 && 
        !window.location.pathname.includes('/login') && 
        !window.location.pathname.includes('/register')) {
      
      // Limpa o localStorage
      localStorage.removeItem("sessionToken");
      localStorage.removeItem("sessionId");
      localStorage.removeItem("sessionEmail");
      localStorage.removeItem("sessionName");
      
      // Redireciona para a página de login
      window.location.href = '/';
    }
    
    return Promise.reject(error);
  }
);

export default api;