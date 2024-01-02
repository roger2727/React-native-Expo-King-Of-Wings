import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default GameRulesContent = () => {
  return (
<View>
  <Text style={styles.modalTitle}>King of Wings In-Game Rules</Text>
  <Text style={styles.modalText}>
    During game play, the current player's name will be displayed at the top, indicating it's their turn. Players must answer the quiz question before the timer runs out. The quicker you answer, the more points you earn.
  </Text>
  <Text style={styles.modalText}>
    After answering, a random number will appear inside the image of a hot sauce bottle. You will then select the hot sauce that corresponds to this number from the lineup you arranged during game setup.
  </Text>
  <Text style={styles.modalText}>
    Once the current player's turn is complete, click "Next Player" to proceed. The game continues in this manner until all rounds are completed. Remember, speed and accuracy boost your score!
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
