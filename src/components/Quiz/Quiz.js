import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import hotSauceQuizData from "./QuizData";

const Quiz = ({ currentQuestionIndex, advanceQuestion, updatePlayerScore }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(20);

  useEffect(() => {
    let interval;
    if (!isAnswered) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setIsAnswered(true);
            // advanceQuestion(); // Advance to the next question when the timer runs out
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isAnswered, advanceQuestion]); // Added advanceQuestion as a dependency

  useEffect(() => {
    // Reset states when the question changes
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTimer(20); // Reset timer for the new question
  }, [currentQuestionIndex]); // Dependency array includes currentQuestionIndex

  const handleOptionPress = (option) => {
    if (!isAnswered) {
      setSelectedAnswer(option);
      setIsAnswered(true);
      if (option === hotSauceQuizData[currentQuestionIndex].correctAnswer) {
        const additionalScore = timer; // Calculate score based on timer or any other logic
        updatePlayerScore(additionalScore); // Update the player's score
      }
    }
  };

  const currentQuestion = hotSauceQuizData[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <View style={styles.quizContainer}>
        <Text style={styles.question}>{currentQuestion.question}</Text>
        <View style={styles.optionsGrid}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                isAnswered &&
                  option === selectedAnswer &&
                  (option === currentQuestion.correctAnswer
                    ? styles.correctOption
                    : styles.wrongOption),
              ]}
              onPress={() => handleOptionPress(option)}
              disabled={isAnswered}
            >
              <Text style={styles.optionText}>{option}</Text>
              {isAnswered && <View style={styles.overlay}></View>}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.timerScoreContainer}>
          <Text style={styles.timer}>Timer: {timer}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  quizContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    color: colors.white,
    marginBottom: 20,
    fontSize: 20,
    textAlign: "center",
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "100%",
  },
  option: {
    justifyContent: "center",
    backgroundColor: "#FAEBD7",
    padding: 5,
    verticalAlign: "center",
    borderRadius: 5,
    width: "48%",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    height: 60,
  },
  selectedOption: {
    backgroundColor: colors.primary,
  },
  optionText: {
    color: colors.black,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: colors.primary,
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 5, // Match the border radius of the option buttons
  },
  correctOption: {
    backgroundColor: "green",
  },
  wrongOption: {
    backgroundColor: colors.red,
  },

  timer: {
    color: colors.white,
    fontSize: 20,

    borderColor: colors.primary,
  },
  timerScoreContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", // Aligns content to the right
    alignItems: "center", // Centers content vertically in the container
    width: "100%",
    // Adds padding around the container
  },
});

export default Quiz;
