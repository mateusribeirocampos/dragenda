import { View, Text, Image } from "react-native";
import { styles } from "./appointment.style.js";
import icon from "../../constants/icon.js";

function Appointment(props) {
  return (
    <View style={styles.appointment}>
      <Text style={styles.name}>
        {props.service} - {props.doctor}
      </Text>
      <Text style={styles.specialty}>{props.specialty}</Text>

      <View style={styles.container}>
        <View style={styles.containerBooking}>
          <View style={styles.booking}>
            <Image source={icon.calendar}/>
            <Text>15/10/2024</Text>
          </View>
          <View style={styles.booking}>
          <Image source={icon.calendar}/>
          <Text>15/10/2024</Text>
          </View>
        </View>

        <View style={styles.containerBooking}></View>
      </View>
    </View>
  );
}

export default Appointment;
