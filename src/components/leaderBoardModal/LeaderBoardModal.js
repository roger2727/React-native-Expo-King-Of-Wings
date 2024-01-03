import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  View,
  Text,
} from "react-native";
import leaderBoardLogo from "../../../assets/leaderboard.png";
import { colors } from "../../utils/colors";

export function LeaderBoardModal({ scores, players }) {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  // Create an array of player-score pairs, sort it, and then map it
  const sortedPlayers = players
    .map((player, index) => ({ name: player, score: scores[index] }))
    .sort((a, b) => b.score - a.score);

  return (
    <View>
      <TouchableOpacity
        style={styles.leaderBoardLogoContainer}
        onPress={openModal}
      >
        <Image style={styles.leaderBoardLogo} source={leaderBoardLogo} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Leader board</Text>
            {sortedPlayers.map((player, index) => (
              <View key={index} style={styles.scoreEntry}>
                <Text style={styles.playerName}>{`${index + 1}. ${
                  player.name
                }`}</Text>
                <Text style={styles.playerScore}>{player.score}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.button} onPress={closeModal}>
              <Text>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  leaderBoardLogoContainer: {
    display: "flex",
    height: 50,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  leaderBoardLogo: {
    zIndex: 2,
    width: 40,
    height: "100%",
    resizeMode: "contain",
  },
  modalView: {
    margin: 20,
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
    width: "80%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 50,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: colors.accent,
    marginTop: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scoreEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50%",
    padding: 5,
  },
  playerName: {
    fontSize: 16,
    color: colors.primary,
  },
  playerScore: {
    fontSize: 16,
    color: "black",
  },
});
