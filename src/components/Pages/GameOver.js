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
import champ from "../../../assets/champion.png";
import { useNavigation } from "@react-navigation/native";
import Confetti from "react-native-confetti";
const GameOver = ({ route }) => {
  const navigation = useNavigation();
  const { scores, players } = route.params;

  const playersWithScores = players.map((player, index) => ({
    name: player,
    score: scores[index],
  }));

  // Sort the array based on scores in descending order
  playersWithScores.sort((a, b) => b.score - a.score);

  // Extract the top three players
  const firstPlace = playersWithScores[0]?.name || "";
  const secondPlace = playersWithScores[1]?.name || "";
  const thirdPlace = playersWithScores[2]?.name || "";

  const confettiRef = useRef();

  const [glowAnim] = useState(new Animated.Value(10));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 15,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 10,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

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

        <HelpLogoWithModal modalContent={<GameOverContents />} />
      </View>

      <View style={styles.PlayButtonContainer}>
        <Text style={styles.winnerMsg}>King of Wings has be crowned</Text>
        <View style={styles.group}>
          <Image style={styles.KingImage} source={kingLogo} />
          <View style={styles.winnersContainers}>
            <Animated.Text
              style={[
                styles.firstPlaceText,
                {
                  textShadowRadius: glowAnim, // Animated glow effect
                },
              ]}
            >
              {firstPlace}
            </Animated.Text>
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
    width: 150,
    height: 150,
    zIndex: 10,
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
    color: "#FF8C00", // Deep orange color
    fontSize: 50,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    textShadowColor: "rgba(255, 140, 0, 0.8)", // Same deep orange with transparency for glow
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },

  secondPlaceText: {
    // ... existing styles for secondPlaceText ...
    flex: 1,
    textAlign: "left",
    paddingLeft: 20, // Adjust as needed
    color: colors.white, // Color for visibility
    fontSize: 18,
    paddingTop: 10,
  },
  thirdPlaceText: {
    // ... existing styles for thirdPlaceText ...
    flex: 1,
    textAlign: "right",
    paddingRight: 20, // Adjust as needed
    color: colors.white, // Color for visibility
    fontSize: 18,
    paddingTop: 10,
  },
  winnersContainers: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    height: 100,
    flexDirection: "column",
    width: "80%",
    backgroundColor: colors.black,
    marginTop: -20,
    marginBottom: -60, // Adjust this value as needed to move closer to the champ image
  },
  secondThirdContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20, // Adjust as needed
  },
  winnerMsg: {
    color: colors.white, // Color for visibility
    fontSize: 24,
    width: "100%",
    textAlign: "center",
  },
});

export default GameOver;
