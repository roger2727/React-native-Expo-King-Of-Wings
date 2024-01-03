import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Image,
  Animated,
} from "react-native";
import { colors } from "../../utils/colors";
import logo from "../../../assets/new-logo.png";
import { PlayButton } from "../playButton/PlayButton";
import { HelpLogoWithModal } from "../helpLogoWithModal/HelpLogoWithModal";
import { useNavigation } from "@react-navigation/native";
import GameRulesContent from "../helpLogoWithModal/modalContents/GameRulesContent";

export default function Home() {
  const navigation = useNavigation();
  const pulseAnim = useRef(new Animated.Value(1)).current; // Step 2

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseAnim]);
  return (
    <View style={styles.container}>
      <HelpLogoWithModal modalContent={<GameRulesContent />} />
      <View style={styles.logo}>
        <Animated.Image
          source={logo}
          style={[
            styles.logoImage,
            { transform: [{ scale: pulseAnim }] }, // Homely animated scale
          ]}
        />
        <PlayButton
          width={100}
          height={50}
          title="LETS GO!"
          onPress={() => navigation.navigate("Game Setup")}
        />
      </View>
      <View></View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: colors.black,
    alignContent: "center",
    justifyContent: "center",
    paddingBottom: 100,

    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 70,
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    resizeMode: "contain",
    width: 450,
  },

  text: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "bold",
  },
});
