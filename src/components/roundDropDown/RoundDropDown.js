import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";


const RoundDropDown = ({ selectedRounds, onRoundsChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Rounds:</Text>
      <Picker
        selectedValue={selectedRounds}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => onRoundsChange(itemValue)}
      >
        <Picker.Item style={styles.singlePicker} label="1" value="1" />
        <Picker.Item style={styles.singlePicker} label="2" value="2" />
        <Picker.Item style={styles.singlePicker} label="3" value="3" />
        <Picker.Item style={styles.singlePicker} label="4" value="4" />
        <Picker.Item style={styles.singlePicker} label="5" value="5" />
        <Picker.Item style={styles.singlePicker} label="6" value="6" />
        <Picker.Item style={styles.singlePicker} label="7" value="7" />
        <Picker.Item style={styles.singlePicker} label="8" value="8" />
        <Picker.Item style={styles.singlePicker} label="9" value="9" />
        <Picker.Item style={styles.singlePicker} label="10" value="10" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 175,

    padding: 10,
    backgroundColor: "#FAEBD7",
    borderRadius: 10,
    zIndex: 10,
  },
  label: {
    fontSize: 18,

    fontWeight: "bold",
  },
  picker: {
    zIndex: 20,
  },
  singlePicker: {
    fontSize: 18,
  },
});

export default RoundDropDown;
