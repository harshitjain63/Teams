import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import React from 'react';
const TextInputWrapper = ({reciever_id}: {reciever_id: string}) => {
  return (
    <View style={styles.textInputWrapper}>
      <TextInput
        label={'UserName'}
        mode="outlined"
        outlineColor="blue"
        activeOutlineColor="blue"
        outlineStyle={styles.outlineStyle}
      />
      <TextInput
        label={'Reciever-ID'}
        mode="outlined"
        value={reciever_id}
        outlineColor="blue"
        activeOutlineColor="blue"
        outlineStyle={styles.outlineStyle}
      />
    </View>
  );
};

export default TextInputWrapper;
const styles = StyleSheet.create({
  textInputWrapper: {
    width: '90%',
    rowGap: 10,
    padding: 10,
    alignSelf: 'center',
  },
  outlineStyle: {borderRadius: 12},
});
