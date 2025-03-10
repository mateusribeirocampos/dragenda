import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import api from "../constants/api";

export const useDoctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  const LoadDoctors = useCallback(async () => {
    console.log("LoadDoctors...");
    try {
        const response = await api.get("/doctors");
        setDoctors(response.data);
        console.log(response.data);

      } catch (error) {
        if (error.response?.data.error)
          if (error.response.status === 401) {
            return navigate("/");
        } else alert("Erro ao listar médicos.");
    }
  },
  [navigate]
);

  return { doctors,  LoadDoctors };
};
