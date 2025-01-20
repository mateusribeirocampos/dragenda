import { Alert, View, FlatList } from "react-native";
import { styles } from "./abacalendar.style.js";
import Appointment from "../../components/appointment/appointment.jsx";
import { useCallback, useState } from "react";
import api from "../../constants/api.js";
import { useFocusEffect } from "@react-navigation/native";

function AbaCalendar() {

  const [appointments, setAppointments] = useState([]);

  async function LoadAppointments() {
    try {
      const response = await api.get("/appointments");
      if (response.data) {
        setAppointments(response.data);
      }
    } catch (error) {
      console.log(error.response.data.error);
      if (error.response?.data.error) Alert.alert(error.response.data.error);
      else Alert.alert("Ocorreu um erro. Tente novamente mais tarde!");
    }
  }
  async function DeleteAppointments(id_appointment) {
    try {
      const response = await api.delete("/appointments/" + id_appointment);
      if (response.data?.id_appointment) {
        LoadAppointments();
      }
    } catch (error) {
      console.log(error.response.data.error);
      if (error.response?.data.error) Alert.alert(error.response.data.error);
      else Alert.alert("Ocorreu um erro. Tente novamente mais tarde!");
    }
  }

useFocusEffect(
  useCallback(() => {
    LoadAppointments(); // Carrega os dados toda vez que a aba é focada
  }, [])
);

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        keyExtractor={(appoint) => appoint.id_appointment}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <Appointment id_appointment={item.id_appointment}
              doctor={item.doctor}
              service={item.service}
              specialty={item.specialty}
              bookingDate={item.booking_date}
              bookingHour={item.booking_hour}
              onPress={DeleteAppointments}
            />
          );
        }}
      />
    </View>
  );
}

export default AbaCalendar;
