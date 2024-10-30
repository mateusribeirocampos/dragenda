import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 
import Abahome from "../abaHome/abahome.jsx";
import AbaCalendar from "../abaCalendar/abacalendar.jsx";
import AbaProfile from "../abaProfile/abaprofile.jsx";
import icon from "../../constants/icon.js";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

function Main() {
  return <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Abahome} options={{
        headerTitleAlign: 'center',
        headerTitle: () => {
          return <Image source={icon.logo} style={{ width: 125, height: 29 }} />
        },
        tabBarIcon: ({focused}) => {
          return <Image source={icon.home} style={
            { 
              width: 25, 
              height: 25, 
              opacity: focused ? 1 : 0.2
            }
          } />
        },
        tabBarShowLabel: false,
      }} />
      <Tab.Screen name="Calendar" component={AbaCalendar} options={{
        headerTitleAlign: 'center',
        headerTitle: () => {
          return <Image source={icon.logo} style={{ width: 125, height: 29,}} />
        },
        tabBarIcon: ({focused}) => {
          return <Image source={icon.calendar} style={
            { 
              width: 25, 
              height: 25,
              opacity: focused ? 1 : 0.2
            }
          } />
        },
        tabBarShowLabel: false,
      }}/>
      <Tab.Screen name="Profile" component={AbaProfile} options={{
        headerTitleAlign: 'center',
        headerTitle: () => {
          return <Image source={icon.logo} style={{ width: 125, height: 29 }} />
        },
        tabBarIcon: ({focused}) => {
          return <Image source={icon.profile} style={
            { 
              width: 25, 
              height: 25,               
              opacity: focused ? 1 : 0.2
            }
          } />
        },
        tabBarShowLabel: false,
      }}/>


    </Tab.Navigator>

  </NavigationContainer>
}

export default Main;