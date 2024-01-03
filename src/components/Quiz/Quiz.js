import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import hotSauceQuizData from "./QuizData";

const Quiz = ({
  currentQuestionIndex,
  advanceQuestion,
  updatePlayerScore,
  setIsTimerRunning,
  triggerHotSauceAnimation,
}) => {
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
            setIsTimerRunning(false); // Stop the timer and update state in parent component
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
    setTimer(2000); // Reset timer for the new question
  }, [currentQuestionIndex]); // Dependency array includes currentQuestionIndex

  const handleOptionPress = (option) => {
    if (!isAnswered) {
      setIsAnswered(true);

      setSelectedAnswer(option);
      // Delay all actions after an answer is selected
      if (option === hotSauceQuizData[currentQuestionIndex].correctAnswer) {
        const additionalScore = timer;
        updatePlayerScore(additionalScore);
      }
      setTimeout(() => {
        setIsTimerRunning(false);
        // Stop the timer
        triggerHotSauceAnimation(); // Trigger the animation

        advanceQuestion(); // Move to the next question
      }, 2500); // 2-second delay
    }
  };

  const currentQuestion = hotSauceQuizData[currentQuestionIndex];

  useEffect(() => {
    if (timer === 0 || isAnswered) {
      triggerHotSauceAnimation();
    }
  }, [timer, isAnswered]);

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
                  option !== currentQuestion.correctAnswer &&
                  styles.wrongOption,
                isAnswered &&
                  option === currentQuestion.correctAnswer &&
                  styles.correctOption,
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
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  quizContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    color: colors.white,
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
  },
  optionsGrid: {
    width: "100%",
  },
  option: {
    justifyContent: "center",
    backgroundColor: "#FAEBD7",
    padding: 5,
    verticalAlign: "center",
    borderRadius: 5,
    width: "100%",
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
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 5,
  },
  correctOption: {
    backgroundColor: "green",
    borderWidth: 0,
  },
  wrongOption: {
    backgroundColor: colors.red,
    borderWidth: 0,
  },

  timer: {
    color: colors.white,
    fontSize: 18,

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
