import {React,  }  from 'react'
import { View, Text, StyleSheet, TouchableOpacity,Image, } from 'react-native'
import { colors } from '../../utils/colors'
import { HelpLogoWithModal } from '../helpLogoWithModal/HelpLogoWithModal'
import homeLogo from '../../../assets/home.png'
import { useNavigation } from '@react-navigation/native'

import AnimatedHotSauce from '../animatedHotSauce/AnimatedHotSauce'
const Game = ({ route }) => {
    const navigation = useNavigation()
    const { selectedHotSauceNum } = route.params; 



console.log(selectedHotSauceNum)
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
    <Text style={styles.playerName} >player 1</Text>

    <AnimatedHotSauce selectedHotSauceNum={selectedHotSauceNum} />

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

  });

export default Game