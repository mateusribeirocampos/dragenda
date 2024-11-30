import { Text, TouchableOpacity } from "react-native";
import { styles } from "./button.style.js";

function Button(props) {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        props.theme == "danger" ? styles.danger : styles.primary,
      ]}
      onPress={props.onPress}
    >
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

export default Button;
