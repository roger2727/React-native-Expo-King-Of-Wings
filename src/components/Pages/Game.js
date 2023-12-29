import {React, useState }  from 'react'
import { View, Text, StyleSheet, TouchableOpacity,Image, } from 'react-native'
import { colors } from '../../utils/colors'
import { HelpLogoWithModal } from '../helpLogoWithModal/HelpLogoWithModal'
import homeLogo from '../../../assets/home.png'

import { useNavigation } from '@react-navigation/native'
import Quiz from '../Quiz/Quiz'
import hotSauceQuizData from '../Quiz/QuizData'

import AnimatedHotSauce from '../animatedHotSauce/AnimatedHotSauce'
import { LeaderBoardModal } from '../leaderBoardModal/LeaderBoardModal'
const Game = ({ route }) => {
    const navigation = useNavigation()
    const { selectedHotSauceNum, players, selectedRounds } = route.params; 
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(null);
    const [roundCount, setRoundCount] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scores, setScores] = useState(players.map(() => 0));

    const updateScore = (additionalScore) => {
      setScores(prevScores => {
        const newScores = [...prevScores];
        newScores[currentPlayerIndex] += additionalScore;
        return newScores;
      });
    };

    const handleStartButtonClick = () => {
        // Move to next player or wrap around to the first player
        const nextPlayerIndex = currentPlayerIndex === null ? 0 :
            currentPlayerIndex === players.length - 1 ? 0 : currentPlayerIndex + 1;
    
        setCurrentPlayerIndex(nextPlayerIndex);
        if (currentPlayerIndex !== null) {
          advanceQuestionInQuiz();
        }

        if (nextPlayerIndex === 0 && roundCount === selectedRounds - 1) {
            // Navigate to 'Game Over' or any other desired page
            navigation.navigate('Game Over');
        } else if (currentPlayerIndex === players.length - 1) {
          
            setRoundCount(prevRoundCount => prevRoundCount + 1);
        }
    };

    const advanceQuestionInQuiz = () => {
      setCurrentQuestionIndex(prevIndex => {
        // Assuming you have the total number of questions
        const totalQuestions = hotSauceQuizData.length;
        return (prevIndex + 1) % totalQuestions;
      });
    };

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
      <LeaderBoardModal/>

      <HelpLogoWithModal modalContent={<GameSetupContents />} />

    </View>
    {currentPlayerIndex !== null && (
      <View style={styles.playerInfo}>
                <Text style={styles.timer}>{players[currentPlayerIndex]}</Text>
                <Text style={styles.timer}>Score: {scores[currentPlayerIndex]}</Text>
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


    <AnimatedHotSauce selectedHotSauceNum={selectedHotSauceNum} onStartButtonClick={handleStartButtonClick}  onNextQuestion={advanceQuestionInQuiz}   />
 
        </View>
  )
}

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
      alignSelf: "center",
      width: "95%",
    },
    playerName: {
      color: colors.white,
      fontSize: 30,
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
    playerInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: "center",
      width: "95%",
    },
    timer: {
      color: colors.white,
      fontSize: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.primary,
      padding: 10,
      borderRadius: 10,
    },

  });

export default Game