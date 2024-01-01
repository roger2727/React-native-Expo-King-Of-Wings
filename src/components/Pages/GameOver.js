import { React, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

import { colors } from "../../utils/colors";

import { PlayButton } from "../playButton/PlayButton";

import { HelpLogoWithModal } from "../helpLogoWithModal/HelpLogoWithModal";
import GameOverContents from "../helpLogoWithModal/modalContents/GameSetupContents";
import homeLogo from "../../../assets/home.png";
import kingLogo from "../../../assets/king.png";
import champ from "../../../assets/champion.png";
import { useNavigation } from "@react-navigation/native";
const GameOver = ({ route }) => {
  const navigation = useNavigation();
  const { winners } = route.params;
  const firstPlace = winners[0] || "N/A";
  const secondPlace = winners.length > 1 ? winners[1] : "N/A";
  const thirdPlace = winners.length > 2 ? winners[2] : "N/A";
  console.log(winners);
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Welcome")}
          style={styles.logoImage}
          source={homeLogo}
        >
          <Image style={styles.logoImage} source={homeLogo} />
        </TouchableOpacity>

        <HelpLogoWithModal modalContent={<GameOverContents />} />
      </View>

      <View style={styles.PlayButtonContainer}>
        <View style={styles.group}>
          <Image style={styles.KingImage} source={kingLogo} />
          <View style={styles.winnersContainers}>
            <Text style={styles.firstPlaceText}>{firstPlace}</Text>
            <View style={styles.secondThirdContainer}>
              <Text style={styles.secondPlaceText}>{secondPlace}</Text>
              <Text style={styles.thirdPlaceText}>{thirdPlace}</Text>
            </View>
          </View>
        </View>
        <Image style={styles.champImage} source={champ} />
        <PlayButton
          onPress={() => navigation.navigate("Welcome")}
          width={100}
          height={50}
          title="PLAY Again"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    width: "100%",

    alignContent: "center",
    justifyContent: "center",
    verticalAlign: "center",
    backgroundColor: colors.black,
  },
  PlayButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  KingImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
  },
  winnerText: {
    color: colors.white, // Color for visibility
    fontSize: 24,
    width: "100%",
  },
  champImage: {
    width: 300,
    height: 250,

    alignSelf: "center",
  },
  group: {
    alignItems: "center",
    justifyContent: "center",
  },
  firstPlaceText: {
    color: colors.white, // Color for visibility
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    color: colors.white, // Color for visibility
  },

  secondPlaceText: {
    // ... existing styles for secondPlaceText ...
    flex: 1,
    textAlign: "left",
    paddingLeft: 20, // Adjust as needed
    color: colors.white, // Color for visibility
    fontSize: 16,
  },
  thirdPlaceText: {
    // ... existing styles for thirdPlaceText ...
    flex: 1,
    textAlign: "right",
    paddingRight: 20, // Adjust as needed
    color: colors.white, // Color for visibility
    fontSize: 16,
  },
  winnersContainers: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    height: 100,
    flexDirection: "column",
    width: "95%",
    backgroundColor: colors.black,
    marginTop: -30, // Adjust this value as needed to move closer to the champ image
  },
  secondThirdContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20, // Adjust as needed
  },
});

export default GameOver;
