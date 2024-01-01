import { React, useState,  useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { colors } from "../../utils/colors";
import { HelpLogoWithModal } from "../helpLogoWithModal/HelpLogoWithModal";
import homeLogo from "../../../assets/home.png";

import { useNavigation } from "@react-navigation/native";
import Quiz from "../Quiz/Quiz";
import hotSauceQuizData from "../Quiz/QuizData";

import AnimatedHotSauce from "../animatedHotSauce/AnimatedHotSauce";
import { LeaderBoardModal } from "../leaderBoardModal/LeaderBoardModal";
import { PlayButton } from "../playButton/PlayButton";
const Game = ({ route }) => {
  const navigation = useNavigation();
  const { selectedHotSauceNum, players, selectedRounds } = route.params;
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(null);
  const [roundCount, setRoundCount] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState(players.map(() => 0));
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [animateHotSauce, setAnimateHotSauce] = useState(false);
  
  const triggerHotSauceAnimation = () => {
    setAnimateHotSauce(true);
  };

  useEffect(() => {
    if (animateHotSauce) {
      setAnimateHotSauce(false);
    }
  }, [animateHotSauce]);
  const updateScore = (additionalScore) => {
    setScores((prevScores) => {
      const newScores = [...prevScores];
      newScores[currentPlayerIndex] += additionalScore;
      return newScores;
    });
  };

  const handleStartButtonClick = () => {
    setIsTimerRunning(true);

    const nextPlayerIndex =
      currentPlayerIndex === null
        ? 0
        : currentPlayerIndex === players.length - 1
          ? 0
          : currentPlayerIndex + 1;

    setCurrentPlayerIndex(nextPlayerIndex);
    if (currentPlayerIndex !== null) {
      advanceQuestionInQuiz();
    }

    if (nextPlayerIndex === 0 && roundCount === selectedRounds - 1) {
      // Find the top three scores
      const sortedScores = [...scores].sort((a, b) => b - a);
      const uniqueScores = [...new Set(sortedScores)];
      const topThreeScores = uniqueScores.slice(0, 3);

      const winners = topThreeScores.map((score) => {
        return players[scores.indexOf(score)];
      });

      navigation.navigate("Game Over", { winners });
    } else if (currentPlayerIndex === players.length - 1) {
      setRoundCount((prevRoundCount) => prevRoundCount + 1);
    }
  };
  const advanceQuestionInQuiz = () => {
    setCurrentQuestionIndex((prevIndex) => {
      // Assuming you have the total number of questions
      const totalQuestions = hotSauceQuizData.length;
      return (prevIndex + 1) % totalQuestions;
    });
  };

  console.log("scores", scores);

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
        <LeaderBoardModal scores={scores} players={players} />

        <HelpLogoWithModal modalContent={<GameSetupContents />} />
      </View>
      {currentPlayerIndex !== null && (
        <View style={styles.playerInfoContainer}>
          <View style={styles.playerInfoContainer}>
            <View style={styles.scoreContainer}>
              <Text style={styles.timer}>
                Score: {scores[currentPlayerIndex]}
              </Text>
            </View>
            <View style={styles.playerNameContainer}>
              <Text style={styles.playerName}>
                {players[currentPlayerIndex]}
              </Text>
            </View>
          </View>
        </View>
      )}

      {isTimerRunning && (
        <Quiz
          currentQuestionIndex={currentQuestionIndex}
          advanceQuestion={advanceQuestionInQuiz}
          updatePlayerScore={updateScore}
          setIsTimerRunning={setIsTimerRunning} // Pass the function to change the timer state
          triggerHotSauceAnimation={triggerHotSauceAnimation}
        />
      )}

      {currentPlayerIndex == null && (
        <Text style={styles.playerName}>Click Start to begin</Text>
      )}

      {!isTimerRunning && (
        <AnimatedHotSauce
      
          selectedHotSauceNum={selectedHotSauceNum}
          onStartButtonClick={handleStartButtonClick}
          onNextQuestion={advanceQuestionInQuiz}
          triggerAnimation={animateHotSauce}
        />
      )}
      {currentPlayerIndex == null && (
        <PlayButton
          style={styles.button}
          size={100}
          title="START"
          onPress={handleStartButtonClick} // Use the same function for starting the game
        />
      )}
      {currentPlayerIndex != null && (
        <PlayButton
          style={styles.button}
          size={100}
          title="NEXT PLAYER"
          onPress={handleStartButtonClick} // Use the same function for starting the game
        />
      )}
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
    alignSelf: "stretch", // This will make the nav take full width
    width: "100%",
    paddingHorizontal: 0, // Set horizontal padding to 0

    paddingVertical: 5, // Maintain vertical padding
  },

  button: {
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  playerInfoContainer: {
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    height: 70,
    position: "relative",
  },
  playerNameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  playerName: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 2,
    alignSelf: "center",
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",

    width: "100%",
  },
  timer: {
    color: colors.white,
    fontSize: 20,
  },
});

export default Game;
