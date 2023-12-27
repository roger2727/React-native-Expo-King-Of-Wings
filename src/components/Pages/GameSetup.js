import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Input from "../addPlayer/AddPlayer";
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

        <HelpLogoWithModal modalContent={<GameSetupContents />} />
      </View>
      <View style={styles.DropDownsContainer}>
        <RoundDropDown />
        <HotSauceDropDown />
      </View>
      <View style={styles.InputContainer}>
        <Input />
      </View>

      <View style={styles.PlayButtonContainer}>
        <PlayButton width={100} height={50} title="PLAY " />
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
});

export default GameSetup;
