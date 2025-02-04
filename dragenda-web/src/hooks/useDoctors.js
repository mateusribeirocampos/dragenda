import { useNavigate } from "react-router-dom";
import { ApiDoctor } from "../constants/apiDoctors";
import { useCallback, useState } from "react";

export const useDoctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  const LoadDoctors = useCallback(
    async () => {
      console.log("LoadDoctors...");
      try {
        const data = await ApiDoctor.getDoctors();
        setDoctors(data);
      } catch (error) {
        if (error.response?.data.error)
          if (error.response.status === 401) {
            return navigate("/");
          } else alert(error.message);
      }
    },
    [navigate]
  );

  return { doctors, LoadDoctors };
};
