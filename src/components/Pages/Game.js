import { React, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import { colors } from "../../utils/colors";
import { HelpLogoWithModal } from "../helpLogoWithModal/HelpLogoWithModal";
import homeLogo from "../../../assets/home.png";
import { useNavigation } from "@react-navigation/native";
import Quiz from "../Quiz/Quiz";
import hotSauceQuizData from "../Quiz/QuizData";
import AnimatedHotSauce from "../animatedHotSauce/AnimatedHotSauce";
import { LeaderBoardModal } from "../leaderBoardModal/LeaderBoardModal";
import { PlayButton } from "../playButton/PlayButton";
import InGameRules from "../helpLogoWithModal/modalContents/InGameRules";

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
    if (isNaN(additionalScore)) {
      console.error("Invalid score update:", additionalScore);
      return; // Do not update scores if the input is invalid
    }
    setScores((prevScores) => {
      const newScores = [...prevScores];
      const currentScore = newScores[currentPlayerIndex] || 0; // Fallback to 0 if undefined
      newScores[currentPlayerIndex] = currentScore + additionalScore;
      return newScores;
    });
  };

  const handleStartButtonClick = () => {
    console.log(
      "Start button clicked. Current Player Index:",
      currentPlayerIndex,
    );

    setIsTimerRunning(true);

    let nextPlayerIndex;

    // Check if it's the start of the game
    if (currentPlayerIndex === null) {
      nextPlayerIndex = Math.floor(Math.random() * players.length);
      console.log(
        "Starting the game. Randomly selected first player index:",
        nextPlayerIndex,
      );
    } else {
      // Logic for subsequent players
      nextPlayerIndex = currentPlayerIndex + 1;

      // Advance to the next question if it's not the first button press
      advanceQuestionInQuiz();
    }

    // Check if it's the last player's turn
    if (nextPlayerIndex >= players.length) {
      nextPlayerIndex = 0; // Reset to the first player for the next round
      const newRoundCount = roundCount + 1;
      setRoundCount(newRoundCount);
      console.log(`Round completed. New round count: ${newRoundCount}`);

      // Check if the game should end
      if (newRoundCount >= selectedRounds) {
        console.log(
          "End of the selected rounds. Navigating to Game Over screen.",
        );

        // Pass the entire scores and players array to the Game Over screen
        navigation.navigate("Game Over", { scores, players });
        return; // Exit the function to prevent further processing
      }
    }

    console.log(
      `Setting next player index for the next turn: ${nextPlayerIndex}`,
    );
    setCurrentPlayerIndex(nextPlayerIndex);
  };

  const advanceQuestionInQuiz = () => {
    setCurrentQuestionIndex((prevIndex) => {
      // Assuming you have the total number of questions
      const totalQuestions = hotSauceQuizData.length;
      return (prevIndex + 1) % totalQuestions;
    });
  };

  console.log("scores", scores);
  console.log("players", players);
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

        <HelpLogoWithModal modalContent={<InGameRules />} />
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

      {!isTimerRunning && currentPlayerIndex != null && (
        <View style={styles.msgContainer}>
          <Text style={styles.msg}></Text>
          <Text style={styles.msg}>Your random hot sauce number is</Text>
          <AnimatedHotSauce
            selectedHotSauceNum={selectedHotSauceNum}
            onStartButtonClick={handleStartButtonClick}
            onNextQuestion={advanceQuestionInQuiz}
            triggerAnimation={animateHotSauce}
          />
        </View>
      )}
      {currentPlayerIndex == null && (
        <View style={styles.gameStartContainer}>
          <Text style={styles.msg}>
            New here? Tap the 'Question' button above for a quick guide.
          </Text>
          <Text style={styles.playerName}>Get Ready!</Text>
          <Text style={styles.msg}>
            A random player will kick off the game.
          </Text>

          <PlayButton
            style={styles.button}
            size={120}
            title="START"
            onPress={handleStartButtonClick}
          />
        </View>
      )}
      {currentPlayerIndex != null && (
        <PlayButton
          style={styles.button}
          size={100}
          title="NEXT PLAYER"
          onPress={handleStartButtonClick}
          disabled={isTimerRunning}
          // Disable button when quiz is active
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
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
    alignSelf: "center", // This will make the nav take full width
    width: "95%",

    // Maintain vertical padding
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
    fontSize: 25,
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
    fontSize: 16,
  },
  msgContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  msg: {
    color: colors.white,
    fontSize: 20,
    textAlign: "center",
  },
  gameStartContainer: {
    flex: 1,
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    width: "80%",
  },
});

export default Game;
