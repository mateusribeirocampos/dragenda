import { Alert, View, Text } from "react-native";
import { styles } from "./abaprofile.style";
import { useContext, useState, useEffect } from "react";
import api from "../../constants/api";
import Button from "../../components/button/button.jsx";
import { AuthContext } from "../../contexts/auth.js";

function AbaProfile() {

  const {setUser} = useContext(AuthContext);
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);

  async function LoadProfiles() {
    try {
      const response = await api.get("/users/profile");
      if (response.data?.name) {
        setName(response.data.name);
        setEmail(response.data.email);
      }
    } catch (error) {
      console.log(error.response.data.error);
      if (error.response?.data.error) Alert.alert(error.response.data.error);
      else Alert.alert("Ocorreu um erro. Tente novamente mais tarde!");
    }
  }

  function logout() {
    Alert.alert("Logout");
    setUser({});
  }

  useEffect(() => {
    LoadProfiles();
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>Nome</Text>
        <Text style={styles.text}>{name}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.title}>E-mail:</Text>
        <Text style={styles.text}>{email}</Text>
      </View>
      <View style={styles.button}>
          <Button text="Desconectar" theme="danger" 
          onPress={logout} />
      </View>
    </View>
  );
}

export default AbaProfile;
