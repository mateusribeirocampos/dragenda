import { View, TouchableOpacity, Image, Text } from "react-native";
import { styles } from "./doctor.style.js";
import icon from "../../constants/icon.js";

function Doctor(props) {
  return (
    <TouchableOpacity style={styles.doctor} onPress={() => props.onPress(
      props.id_doctor, props.name, props.specialty, props.icon
    )}>
      <Image source={props.icon == "M" ? icon.male : icon.female} style={styles.icon} />
      <View>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.specialty}>{props.specialty}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Doctor;
