import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors } from "../../utils/colors";

const HotSauceDropDown = () => {
  const [selectedRounds, setSelectedRounds] = useState("1");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Hot Sauces</Text>
      <Picker
        selectedValue={selectedRounds}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setSelectedRounds(itemValue)}
      >
        <Picker.Item style={styles.singlePicker} label="1" value="1" />
        <Picker.Item style={styles.singlePicker} label="2" value="2" />
        <Picker.Item style={styles.singlePicker} label="3" value="3" />
        <Picker.Item style={styles.singlePicker} label="4" value="4" />
        <Picker.Item style={styles.singlePicker} label="5" value="5" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 175,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    zIndex: 10,
  },
  label: {
    fontSize: 16,
    color: colors.black,

    fontWeight: "bold",
  },
  picker: {
    fontSize: 14,

    backgroundColor: colors.white,
    color: colors.black,
    zIndex: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  singlePicker: {
    fontSize: 14,
    color: colors.black,
  },
});

export default HotSauceDropDown;
