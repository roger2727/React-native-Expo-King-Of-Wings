import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const RoundDropDown = ({ selectedRounds, onRoundsChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Rounds:</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.selectedText}>{selectedRounds}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Select number of rounds</Text>
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
    fontWeight: "bold",
  },
  selectedText: {
    fontSize: 18,
    padding: 8,
    backgroundColor: "#FAEBD7",
    borderRadius: 5,
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
    marginBottom: 20,
  },
});

export default RoundDropDown;
