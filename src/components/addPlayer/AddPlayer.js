import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import { colors } from "../../utils/colors";
import { AddPlayerButton } from "./AddPlayerButton";
import deletePlayer from "../../../assets/cancel.png";

export const AddPlayer = () => {
  const [text, setText] = useState("");
  const [players, setPlayers] = useState([]);

  const handleAddPlayer = () => {
    if (text.trim()) {
      setPlayers([...players, text.trim()]);
      setText("");
    } else {
      Alert.alert("Invalid Input", "Please enter a player's name.");
    }
  };

  const handleDeletePlayer = (indexToDelete) => {
    setPlayers(players.filter((_, index) => index !== indexToDelete));
  };
  const customTheme = {
    colors: {
      primary: colors.primary,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          theme={customTheme}
          style={styles.TextInput}
          value={text}
          onChangeText={setText}
          label="Add a player"
        />
        <View style={styles.button}>
          <AddPlayerButton onPress={handleAddPlayer} size={60} title="+" />
        </View>
      </View>

      <ScrollView style={styles.playerList}>
        <Text alignSelf="center" style={styles.playerListHeading}>
          PLAYERS LIST
        </Text>
        {players.map((player, index) => (
          <View key={index} style={styles.playerContainer}>
            <Text style={styles.player}>
              {index + 1}. {player}
            </Text>
            <TouchableOpacity
              source={deletePlayer}
              style={styles.deleteButton}
              onPress={() => handleDeletePlayer(index)}
            >
              <Image style={styles.deleteButtonImage} source={deletePlayer} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 400,
  },
  button: {},
  TextInput: {
    color: colors.black,
    flex: 1,
    marginRight: 10,
    backgroundColor: colors.white,
    borderRadius: 5,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 20,
  },
  playerList: {
    alignSelf: "center",
    padding: 20,

    width: "90%",
    height: 300,
    maxHeight: 300,

    borderWidth: 4,
    borderRadius: 10,
    borderColor: colors.primary,
  },
  playerContainer: {
    flex: 1,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
    width: "90%",
    alignSelf: "center",
  },
  player: {
    fontSize: 18,
    color: colors.white,
    fontWeight: "bold",
    textShadowColor: "rgba(255, 255, 255, 0.8)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 40,
    letterSpacing: 1,
  },
  deleteButton: {
    width: 20,
    height: 20,
    zIndex: 10,
  },
  deleteButtonImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    zIndex: 10,
  },
  deleteButtonText: {
    color: "white",
  },

  playerListHeading: {
    fontSize: 25,
    color: colors.primary,
    fontWeight: "bold",
    alignSelf: "center",
    paddingBottom: 10,
  },
});

export default AddPlayer;
