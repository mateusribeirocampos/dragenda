import { View, Text, Image } from "react-native";
import { styles } from "./appointment.style.js";
import icon from "../../constants/icon.js";
import Button from "../../components/button/button.jsx";
import moment from "moment";

function Appointment(props) {
  //2024-11-15T08:30:00
  const dt = moment(`${props.bookingDate}T${props.bookingHour}`);

  return (
    <View style={styles.appointment}>
      <Text style={styles.name}>
        {props.service} - {props.doctor}
      </Text>
      <Text style={styles.specialty}>{props.specialty}</Text>

      <View style={styles.container}>
        <View style={styles.containerBooking}>
          <View style={styles.booking}>
            <Image style={styles.icon} source={icon.calendar} />
            <Text style={styles.bookingDate}>
              {dt.format("DD/MM/YYYY")}
              </Text>
          </View>

          <View style={styles.booking}>
            <Image style={styles.icon} source={icon.clock} />
            <Text style={styles.bookingHour}>
              {dt.format("HH:mm")}h
              </Text>
          </View>
        </View>

        <View style={styles.containerButton}>
          <Button
            text="Cancelar reserva"
            theme="danger"
            onPress={() => props.onPress(props.id_appointment)}
          />
        </View>
      </View>
    </View>
  );
}

export default Appointment;
