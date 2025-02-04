import api from "../constants/api.js";

export const ApiDoctor = {
  async getDoctors() {
    try {
    const response = await api.get("/doctors");
    console.log(response.data);
    return response.data;  
    } catch (error) {
      throw new Error(error.response?.data.error || "Erro ao carregar médicos");
    }
  }
}