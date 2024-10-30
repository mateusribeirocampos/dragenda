import { Alert, Text, TouchableOpacity } from 'react-native';
import {styles} from './button.style.js';

function Button(props) {

  function TestClick() {
    Alert.alert('Clicou no botão');
  }

  return <TouchableOpacity onPress={TestClick} 
  style={styles.btn}>
    <Text 
    style={styles.text}>
      {props.text}</Text>
  </TouchableOpacity>

}

export default Button;