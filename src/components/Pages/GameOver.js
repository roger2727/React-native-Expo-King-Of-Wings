import { React, useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Animated,
  StatusBar,
  Platform,
} from "react-native";

import { colors } from "../../utils/colors";

import { PlayButton } from "../playButton/PlayButton";

import { HelpLogoWithModal } from "../helpLogoWithModal/HelpLogoWithModal";
import GameOverContents from "../helpLogoWithModal/modalContents/GameSetupContents";
import homeLogo from "../../../assets/home.png";
import kingLogo from "../../../assets/crown.png";

import { useNavigation } from "@react-navigation/native";
import Confetti from "react-native-confetti";
import { LeaderBoardModal } from "../leaderBoardModal/LeaderBoardModal";
const GameOver = ({ route }) => {
  const navigation = useNavigation();
  const { winner, scores, players } = route.params;
  const confettiRef = useRef();

  useEffect(() => {
    if (confettiRef.current) {
      confettiRef.current.startConfetti();
    }

    return () => {
      if (confettiRef.current) {
        confettiRef.current.stopConfetti();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Confetti zIndex={10} ref={confettiRef} />
      <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Welcome")}
          style={styles.logoImage}
          source={homeLogo}
        >
          <Image style={styles.logoImage} source={homeLogo} />
        </TouchableOpacity>
        <LeaderBoardModal scores={scores} players={players} />
        <HelpLogoWithModal modalContent={<GameOverContents />} />
      </View>

      <View style={styles.PlayButtonContainer}>
        <Text style={styles.winnerMsg}>King of Wings has be crowned</Text>
        <View style={styles.group}>
          <Image style={styles.KingImage} source={kingLogo} />
          <Text style={styles.firstPlaceText}>
              {winner}
              </Text>
          

        </View>
      
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
    flex: 1,
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",

    width: "95%",
  },
  KingImage: {
    width: 300,

    zIndex: 10,
    resizeMode: "contain",
    alignSelf: "center",
  },


  group: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  firstPlaceText: {
    color: colors.primary, // Deep orange color
    fontSize: 50,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
 
  },
 
  winnersContainers: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    height: 100,
    flexDirection: "column",
    width: "80%",
    backgroundColor: colors.black,
// Adjust this value as needed to move closer to the champ image
  },
 
  winnerMsg: {
    color: colors.white, // Color for visibility
    fontSize: 24,
    width: "100%",
    textAlign: "center",
  },
});

export default GameOver;
