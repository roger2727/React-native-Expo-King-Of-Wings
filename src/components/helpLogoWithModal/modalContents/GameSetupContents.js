import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default GameSetupContents = () => {
  return (
    <View>
      <Text style={styles.modalTitle}>King of Wings Game Setup</Text>
      <Text style={styles.modalText}>
        Welcome to King of Wings! Here's how to set your game up:
      </Text>

      <Text style={styles.modalText}>
        1. select how may rounds you want to play .
      </Text>
      <Text style={styles.modalText}>
        2. select how many hot sauces you are playing with.
      </Text>
      <Text style={styles.modalText}>
        3. Add the players to the player list by typing in the name and press
        the + button.
      </Text>
      <Text style={styles.modalText}>
        4. click play and let the game begin.
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
