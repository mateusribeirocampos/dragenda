import { Alert, View, Text, FlatList } from "react-native";
import { styles } from "./abahome.style.js";
import Doctor from "../../components/doctor/doctor.jsx";
import { useEffect, useState } from "react";
import api from "../../constants/api.js";

function Abahome(props) {
  const [doctors, setDoctors] = useState([]);

  function ClickDoctor(id_doctor, name, specialty, icon) {
    props.navigation.navigate("services", {
      id_doctor,
      name,
      specialty,
      icon,
    });
  }

  async function LoadDoctors() {
    try {
      const response = await api.get("/doctors");
      if (response.data) {
        setDoctors(response.data);
      }
    } catch (error) {
      console.log(error.response.data.error);
      if (error.response?.data.error) Alert.alert(error.response.data.error);
      else Alert.alert("Ocorreu um erro. Tente novamente mais tarde!");
    }
  }

  useEffect(() => {
    LoadDoctors();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Agende os seus serviços médicos</Text>

      <FlatList
        data={doctors}
        keyExtractor={(doc) => doc.id_doctor}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <Doctor
              id_doctor={item.id_doctor}
              name={item.name}
              icon={item.icon} // == "M" ? icon.male : icon.female
              specialty={item.specialty}
              onPress={ClickDoctor}
            />
          );
        }}
      />
    </View>
  );
}

export default Abahome;
