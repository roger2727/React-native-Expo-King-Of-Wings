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

export const AddPlayer = ({ players, onAddPlayer, onDeletePlayer }) => {
  const [text, setText] = useState("");
  const isAddButtonDisabled = players.length >= 8;
  const handleAddPlayer = () => {
    const trimmedText = text.trim();
    if (trimmedText) {
      // Check if the player name is longer than 15 characters
      if (trimmedText.length > 12) {
        Alert.alert(
          "Name Too Long",
          "Player's name must be 12 characters or less.",
        );
      }
      // Check if the player name already exists in the players array
      else if (players.includes(trimmedText)) {
        Alert.alert("Duplicate Name", "This player's name already exists.");
      } else {
        onAddPlayer(trimmedText);
        setText("");
      }
    } else {
      Alert.alert("Invalid Input", "Please enter a player's name.");
    }
  };

  const handleDeletePlayer = (indexToDelete) => {
    onDeletePlayer(indexToDelete);
  };
  const customTheme = {
    colors: {
      primary: colors.primary,
    },
  };
  const getFontSize = (playersCount) => {
    if (playersCount > 6) {
      return 14; // Smaller font size for more than 6 players
    } else {
      return 18; // Default font size
    }
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
        <View>
          <AddPlayerButton
            disabled={isAddButtonDisabled}
            onPress={handleAddPlayer}
            size={60}
            title="+"
          />
        </View>
      </View>

      <ScrollView style={styles.playerList}>
        <Text
          alignSelf="center"
          style={[
            styles.playerListHeading,
            { fontSize: getFontSize(players.length) },
          ]}
        >
          PLAYERS LIST
        </Text>
        {players.map((player, index) => (
          <View key={index} style={styles.playerContainer}>
            <Text
              style={[styles.player, { fontSize: getFontSize(players.length) }]}
            >
              {index + 1}. {player.toUpperCase()}
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
    flex: 1,
    backgroundColor: colors.black,
  },

  TextInput: {
    color: colors.black,
    flex: 1,
    marginRight: 10,
    backgroundColor: "#FAEBD7",
    borderRadius: 5,
  },
  inputContainer: {
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    paddingBottom: 20,
  },
  playerList: {
    alignSelf: "center",
    padding: 20,
    backgroundColor: "#FAEBD7",
    width: "95%",

    minHeight: 280,
    maxHeight: 350,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: colors.primary,
  },
  playerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
    width: "95%",
    alignSelf: "center",
  },
  player: {
    fontSize: 18,
    color: colors.black,
    fontWeight: "bold",

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
