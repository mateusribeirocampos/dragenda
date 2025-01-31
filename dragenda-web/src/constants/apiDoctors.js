import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api.js";

const useLoadDoctors = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const LoadDoctors = useCallback(async () => {
    console.log("LoadDoctors...");
    try {
      const response = await api.get("/doctors");

      if (response.data) {
        console.log("LoadDoctors...");
        console.log(response.data);
        setUsers(response.data);
      }
    } catch (error) {
      if (error.response?.data.error) {
        if (error.response.status === 401) {
          return navigate("/");
        } else {
          alert("Erro ao listar os médicos.");
        }
      }
    }
  }, [navigate]);

  return { users, LoadDoctors };
};

export default useLoadDoctors;