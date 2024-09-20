import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';

type PropType = {
  label: string;
  val: string | null;
  disabled?: boolean;
};

const FormComponent = ({label, val, disabled}: PropType) => {
  const [value, setValue] = useState(val);
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{label}</Text>
      <TextInput
        value={value ? value : 'Tech'}
        onChangeText={text => setValue(text)}
        style={styles.input}
        editable={!disabled}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomWidth: 0.3,
    borderBottomColor: 'blue',
    marginTop: '-2%',
    color: 'black',
  },
  container: {
    marginTop: '10%',
  },
  txt: {
    color: 'blue',
    fontSize: 15,
    justifyContent: 'flex-end',
  },
});
export default FormComponent;
