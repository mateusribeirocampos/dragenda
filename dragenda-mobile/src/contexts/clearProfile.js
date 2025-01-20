import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../constants/api";

export const clearProfile = async () => {
  try {
    await AsyncStorage.removeItem('token');
    api.defaults.headers.common["Authorization"] = "";
    console.log('token removido');
    return true;
  } catch (error) {
    console.error('Erro ao limpar token', error);
    return false;    
  }
};