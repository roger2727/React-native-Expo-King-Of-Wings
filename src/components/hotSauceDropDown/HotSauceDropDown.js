import React, { useState } from "react";
import { Modal, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

const HotSauceDropDown = ({ selectedHotSauceNum, onRoundsChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const options = Array.from({ length: 10 }, (_, i) => (i + 1).toString()); // Creating options from 1 to 10

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Hot Sauces:</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectedText}>{selectedHotSauceNum}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>number of hot sauces</Text>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => {
                onRoundsChange(option);
                setModalVisible(false);
              }}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    backgroundColor: "#FAEBD7",
    borderRadius: 10,
    zIndex: 10,
  },
  label: {
    fontSize: 18,
    color: colors.black,
    fontWeight: "bold",
  },
  dropdown: {
    padding: 8,
    backgroundColor: "#FAEBD7",
  },
  selectedText: {
    fontSize: 18,
  },
  modalView: {
    margin: 40,

    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 18,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default HotSauceDropDown;
