import { React, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, StatusBar, Platform ,KeyboardAvoidingView, ScrollView} from "react-native";
import AddPlayer from "../addPlayer/AddPlayer";
import { colors } from "../../utils/colors";
import RoundDropDown from "../roundDropDown/RoundDropDown";
import { PlayButton } from "../playButton/PlayButton";
import HotSauceDropDown from "../hotSauceDropDown/HotSauceDropDown";
import { HelpLogoWithModal } from "../helpLogoWithModal/HelpLogoWithModal";
import GameSetupContents from "../helpLogoWithModal/modalContents/GameSetupContents";
import homeLogo from "../../../assets/home.png";
import { useNavigation } from "@react-navigation/native";
const GameSetup = () => {
  const navigation = useNavigation();
  const [selectedHotSauceNum, setSelectedHotSauceNum] = useState("1");
  const [selectedRounds, setSelectedRounds] = useState("1");

  const [players, setPlayers] = useState([]);

  const handleAddPlayer = (newPlayer) => {
    if (newPlayer.trim()) {
      setPlayers([...players, newPlayer.trim()]);
    } else {
      Alert.alert("Invalid Input", "Please enter a player's name.");
    }
  };

  const handleDeletePlayer = (indexToDelete) => {
    setPlayers(players.filter((_, index) => index !== indexToDelete));
  };
  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: colors.black }} 
    
   
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.nav}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Welcome")}
              style={styles.logoImage}
            >
              <Image style={styles.logoImage} source={homeLogo} />
            </TouchableOpacity>
  
            <HelpLogoWithModal modalContent={<GameSetupContents />} />
          </View>
          <View style={styles.DropDownsContainer}>
    <View style={styles.dropDownStyle}>
      <RoundDropDown
        selectedRounds={selectedRounds}
        onRoundsChange={setSelectedRounds}
      />
    </View>
    <View style={styles.dropDownStyle}>
      <HotSauceDropDown
        selectedHotSauceNum={selectedHotSauceNum}
        onRoundsChange={setSelectedHotSauceNum}
      />
    </View>
  </View>
          <View style={styles.InputContainer}>
            <AddPlayer
              players={players}
              onAddPlayer={handleAddPlayer}
              onDeletePlayer={handleDeletePlayer}
            />
          </View>
          <View style={styles.PlayButtonContainer}>
            <PlayButton
              style={styles.button}
              onPress={() =>
                navigation.navigate("Game", {
                  selectedHotSauceNum,
                  players,
                  selectedRounds,
                })
              }
            size={100}
              title="PLAY"
              disabled={players.length === 0} // Disable the button if no players
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
  
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 15,
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
    gap: 20,


    alignContent: "center",
    justifyContent: "center",
    verticalAlign: "center",
    backgroundColor: colors.black,
  },
  PlayButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  InputContainer: {
    flex: 1,

    backgroundColor: "#FAEBD7",


    borderColor: colors.primary,
  
  },
  DropDownsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 10, // add padding if needed
  },
  dropDownStyle: {
    width: "50%", // Set width of each dropdown to 50%
    paddingHorizontal: 5, // Adjust padding for spacing
  },
  logoImage: {
    width: 45,
    height: 45,
    resizeMode: "contain",
    alignSelf: "center",
  },
  nav: {
 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",

    width: "95%",
  },
  
});

export default GameSetup;
