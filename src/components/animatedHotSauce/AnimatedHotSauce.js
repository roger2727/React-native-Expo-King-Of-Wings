import { React, useState, useRef } from "react";
import { View, Text, Image, Animated, StyleSheet } from "react-native";
import hotSauce from "../../../assets/sauce.png";
import { colors } from "../../utils/colors";
import { PlayButton } from "../playButton/PlayButton";
import Quiz from "../Quiz/Quiz";
const AnimatedHotSauce = ({
  selectedHotSauceNum,
  onStartButtonClick,
  onNextQuestion,
}) => {
  const [randomNumber, setRandomNumber] = useState(null);
  const shakeAnimation = useRef(new Animated.Value(0)).current; // Ref for shake animation

  const handlePress = () => {
    // Generate a random number
    const num = Math.floor(Math.random() * selectedHotSauceNum) + 1;
    setRandomNumber(num);
    onStartButtonClick();
    // Start the shake animation
    Animated.sequence([
      // sequence of animation steps
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onNextQuestion();
  };
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Animated.View
          style={[
            styles.hotSauceContainer,
            { transform: [{ translateY: shakeAnimation }] },
          ]}
        >
          <Image style={styles.hotSauceImage} source={hotSauce} />
          {randomNumber !== null && (
            <Text style={styles.randomNumber}>{randomNumber}</Text>
          )}
        </Animated.View>
      </View>

      <PlayButton
        style={styles.button}
        size={100}
        title="START"
        onPress={handlePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
  },
  hotSauceContainer: {
    position: "relative",
    alignSelf: "center",
  },
  hotSauceImage: {
    width: 260,
    height: 230,
    resizeMode: "contain",
    alignSelf: "center",
  },
  randomNumber: {
    position: "absolute",
    color: colors.black,
    fontSize: 40,
    alignSelf: "center",
    top: "56%",
    fontWeight: "bold",
  },
  button: {
    alignSelf: "center",
  },
  score: {
    color: colors.white,
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  main: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
});

export default AnimatedHotSauce;
