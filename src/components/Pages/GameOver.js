import {React, useState} from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import { colors } from "../../utils/colors";

import { PlayButton } from "../playButton/PlayButton";

import { HelpLogoWithModal } from "../helpLogoWithModal/HelpLogoWithModal";
import GameOverContents from "../helpLogoWithModal/modalContents/GameSetupContents";
import homeLogo from "../../../assets/home.png";
import kingLogo from "../../../assets/king.png";
import { useNavigation } from "@react-navigation/native";
const GameOver = () => {

    const navigation = useNavigation();
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

        <HelpLogoWithModal modalContent={ <GameOverContents />} />
      </View>
    
    
      <View style={styles.PlayButtonContainer}>
        <Image style={styles.KingImage} source={kingLogo} />
      <PlayButton 
          onPress={() => navigation.navigate("Welcome")}
          width={100} 
          height={50} 
          title="PLAY" 
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
    height: 400,
  },
  DropDownsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
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
    width: 400,
    height: 400,
    resizeMode: "contain",
    alignSelf: "center",
  },
});

export default GameOver;
