import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default GameRulesContent = () => {
  return (
    <View>
      <Text style={styles.modalTitle}>King of Wings Game Rules</Text>
      <Text style={styles.modalText}>
        Welcome to King of Wings! Here's how to play:
      </Text>
      <Text style={styles.modalText}>
        1. Players take turns rolling a random number in the app.
      </Text>
      <Text style={styles.modalText}>
        2. Each number corresponds to a specific hot sauce level and a drinking
        challenge.
      </Text>
      <Text style={styles.modalText}>
        3. If you roll a 2, for example, you must take Hot Sauce Level 2 and
        complete the challenge
      </Text>
      <Text style={styles.modalText}>
        5. At the end of the game, the app will calculate the scores and
        announce the player with the lowest total as the King of Wings!
      </Text>
      <Text style={styles.modalText}>
        Remember: Drink responsibly and ensure everyone is comfortable with the
        game's challenges. Have fun!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
