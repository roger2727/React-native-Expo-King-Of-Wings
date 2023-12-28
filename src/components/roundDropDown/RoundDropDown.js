import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors } from "../../utils/colors";

const RoundDropDown = () => {
  const [selectedHotSauceNum, setSelectedHotSauceNum] = useState("1");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Rounds:</Text>
      <Picker
   
        selectedValue={selectedHotSauceNum}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setSelectedHotSauceNum(itemValue)}
      >
        <Picker.Item style={styles.singlePicker} label="1 Round" value="1" />
        <Picker.Item style={styles.singlePicker} label="2 Rounds" value="2" />
        <Picker.Item style={styles.singlePicker} label="3 Rounds" value="3" />
        <Picker.Item style={styles.singlePicker} label="4 Rounds" value="4" />
        <Picker.Item style={styles.singlePicker} label="5 Rounds" value="5" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 175,

    padding: 10,
    backgroundColor: colors.white,
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
