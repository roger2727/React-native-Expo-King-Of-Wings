import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default GameRulesContent = () => {
  return (
<View>
  <Text  style={styles.modalTitle}>King of Wings Game Rules</Text>
  <Text style={styles.modalText}>
    Welcome to King of Wings! Setup your hot sauces from mild to hot, add players, and decide on the number of rounds.
  </Text>
  <Text style={styles.modalText}>
    Gameplay: Players take turns rolling a number, answering a question for points, and eating a wing with the sauce matching their roll. Keep going until all rounds are complete.
  </Text>
  <Text style={styles.modalText}>
    Scoring is based on answer speed. The player with the highest score at the end is crowned the King of Wings!
  </Text>
</View>

  );
};

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
