import { View, Text, FlatList } from "react-native";
import { styles } from "./abahome.style.js";
import { doctors } from "../../constants/data.js";
import Doctor from "../../components/doctor/doctor.jsx";
import icon from "../../constants/icon.js";

function Abahome() {
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
              name={item.name}
              icon={item.icon == "M" ? icon.male : icon.female}
              specialty={item.specialty}
            />
          );
        }}
      />
    </View>
  );
}

export default Abahome;
