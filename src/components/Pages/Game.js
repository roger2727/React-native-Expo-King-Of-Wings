import { React, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { colors } from "../../utils/colors";
import { HelpLogoWithModal } from "../helpLogoWithModal/HelpLogoWithModal";
import homeLogo from "../../../assets/home.png";

import { useNavigation } from "@react-navigation/native";
import Quiz from "../Quiz/Quiz";
import hotSauceQuizData from "../Quiz/QuizData";

import AnimatedHotSauce from "../animatedHotSauce/AnimatedHotSauce";
import { LeaderBoardModal } from "../leaderBoardModal/LeaderBoardModal";
const Game = ({ route }) => {
  const navigation = useNavigation();
  const { selectedHotSauceNum, players, selectedRounds } = route.params;
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(null);
  const [roundCount, setRoundCount] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState(players.map(() => 0));

  const updateScore = (additionalScore) => {
    setScores((prevScores) => {
      const newScores = [...prevScores];
      newScores[currentPlayerIndex] += additionalScore;
      return newScores;
    });
  };

  const handleStartButtonClick = () => {
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

      {currentPlayerIndex !== null && (
        <Quiz
          currentQuestionIndex={currentQuestionIndex}
          advanceQuestion={advanceQuestionInQuiz}
          updatePlayerScore={updateScore}
        />
      )}

      {currentPlayerIndex == null && (
        <Text style={styles.playerName}>Click Start to begin</Text>
      )}

      <AnimatedHotSauce
        selectedHotSauceNum={selectedHotSauceNum}
        onStartButtonClick={handleStartButtonClick}
        onNextQuestion={advanceQuestionInQuiz}
      />
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

  playerName: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "bold",

    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
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
    height: 60,
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
