import {React, useState, useRef }from 'react';
import { View, Text, Image, Animated, StyleSheet } from 'react-native';
import hotSauce from '../../../assets/sauce.png';
import { colors } from '../../utils/colors';
import { PlayButton } from '../playButton/PlayButton';

const AnimatedHotSauce = ({ selectedHotSauceNum, onStartButtonClick }) => {
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
            })
        ]).start();
    };
    return (
        <View>
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
            <PlayButton style={styles.button} size={100} title="START" onPress={handlePress} />
        </View>
    );
};

const styles = StyleSheet.create({
    hotSauceContainer: {

        position: 'relative',
        alignSelf: 'center',
    
    },
    hotSauceImage: {
        width: 300,
        height: 300,
        resizeMode: "contain",
        alignSelf: "center",
   
    },
    randomNumber: {
        position: 'absolute',
        color: colors.black,
        fontSize: 40,
        alignSelf: 'center',
        top: '57%',
        fontWeight: 'bold',
    },
    button: {
        alignSelf: 'center',
        marginTop: 20,
    },
});

export default AnimatedHotSauce;
