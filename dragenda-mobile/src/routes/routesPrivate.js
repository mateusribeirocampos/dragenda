import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "../constants/theme.js";
import Main from "../screens/main/main.jsx";
import Services from "../screens/services/services.jsx";
import schedule from "../screens/schedule/schedule.jsx";

const Stack = createNativeStackNavigator();

function RoutesPrivate() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Médicos"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="services" component={Services}
        options={{
            headerTitle: "Serviços",
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerTintColor: COLORS.white,
            headerStyle: {
              backgroundColor: COLORS.blue,
            }
        }}
      />
            <Stack.Screen
        name="schedule"
        component={schedule}
        options={{
          headerTitle: "Fazer uma reserva",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTintColor: COLORS.blue,
          headerTitleStyle: {
            fontSize: 20, // Tamanho da fonte do título
            fontWeight: "bold", // Peso da fonte
            color: COLORS.blue, // Cor do texto (sobrescreve headerTintColor, se necessário)
          },
      }}
      />
    </Stack.Navigator>
  );
}

export default RoutesPrivate;
