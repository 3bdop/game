import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function App() {
  const [generatedNumbers, setGeneratedNumbers] = useState({
    player1: null,
    player2: null,
    player3: null,
    player4: null,
  });

  const [maxNumber, setMaxNumber] = useState(null);

  const [buttonDisabled, setButtonDisabled] = useState({
    player1: false,
    player2: false,
    player3: false,
    player4: false,
  })
  const [number, setNumber] = useState()
  const generateRandomNumber = (player) => {
    if (!buttonDisabled[player]) {

      const newRandomNumber = Math.floor(Math.random() * 20);
      setGeneratedNumbers((prevNumbers) => ({
        ...prevNumbers,
        [player]: newRandomNumber,
      }));


      setButtonDisabled((prevButtonDisabled) => ({
        ...prevButtonDisabled,
        [player]: true,
      }));

      setNumber(newRandomNumber)
    }

  };
  const nextRound = () => {
    const maxNumberPlayer = Object.keys(generatedNumbers).reduce((prevPlayer, currentPlayer) => {
      return generatedNumbers[currentPlayer] > generatedNumbers[prevPlayer] ? currentPlayer : prevPlayer;
    }, 'player1'); // Initialize with 'player1' if all numbers are null

    setMaxNumber({
      value: generatedNumbers[maxNumberPlayer],
      player: maxNumberPlayer,
    });

    if (maxNumberPlayer) {
      setPlayerScore((prevScores) => ({
        ...prevScores,
        [maxNumberPlayer]: prevScores[maxNumberPlayer] + 1,
      }));
    }

    setGeneratedNumbers({
      player1: null,
      player2: null,
      player3: null,
      player4: null,
    })

    setButtonDisabled({
      player1: false,
      player2: false,
      player3: false,
      player4: false,
    })

    setNumber()
  }

  const [playerScore, setPlayerScore] = useState({
    player1: 0,
    player2: 0,
    player3: 0,
    player4: 0,
  })

  const updateScore = ((player) => {
    setPlayerScore((prevScores) => ({
      ...prevScores,
      [player]: prevScores[player] + 1
    }))
  })


  return (

    <View style={styles.container}>
      <LinearGradient
        colors={['#426994', '#30EAE4', '#2D2D2D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <SafeAreaView>
          <Text style={styles.title}>INFS4104, Lab2 - 60101806</Text>
          <View style={styles.upPlayers}>
            <TouchableOpacity style={[buttonDisabled.player1 ? styles.disabledButton : styles.player]}
              onPress={() => { generateRandomNumber('player1') }} disabled={buttonDisabled.player1}>
              <Text style={[buttonDisabled.player1 ? styles.disabledText : styles.text]}>Player 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[buttonDisabled.player2 ? styles.disabledButton : styles.player]}
              onPress={() => { generateRandomNumber('player2') }} disabled={buttonDisabled.player2}>
              <Text style={[buttonDisabled.player2 ? styles.disabledText : styles.text]}>Player 2</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.center} >
            <View style={[styles.square, { justifyContent: 'center' }]} >
              <Text style={[styles.text, { fontSize: 50 }]}>{number}</Text>
            </View>
          </View>

          <View style={styles.downPlayers}>
            <TouchableOpacity style={[buttonDisabled.player3 ? styles.disabledButton : styles.player]}
              onPress={() => { generateRandomNumber('player3') }} disabled={buttonDisabled.player3}>
              <Text style={[buttonDisabled.player3 ? styles.disabledText : styles.text]}>Player 3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[buttonDisabled.player4 ? styles.disabledButton : styles.player]}
              onPress={() => { generateRandomNumber('player4') }} disabled={buttonDisabled.player4}>
              <Text style={[buttonDisabled.player4 ? styles.disabledText : styles.text]}>Player 4</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.center, { flexDirection: 'row', justifyContent: 'space-evenly' }]}>
            <View style={styles.score}>
              <Text style={styles.nextRoundButtonText}>{playerScore.player1}</Text>
            </View>
            <View style={styles.score}>
              <Text style={styles.nextRoundButtonText}>{playerScore.player2}</Text>
            </View>
            <View style={styles.score}>
              <Text style={styles.nextRoundButtonText}>{playerScore.player3}</Text>
            </View>
            <View style={styles.score}>
              <Text style={styles.nextRoundButtonText}>{playerScore.player4}</Text>
            </View>


          </View>
          <View style={styles.center}>
            <View style={styles.nextRound}>
              <TouchableOpacity onPress={nextRound}>
                <View style={styles.nextRoundButton}>
                  <Text style={styles.nextRoundButtonText}>See Result</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Arial',
    fontWeight: "bold",
    textAlign: 'center',
    top: 30,
    fontSize: 20,
    color: '#6D10F1C9',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  disabledText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#808080'
  },
  player: {
    width: 150,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#3001FF',
    shadowRadius: 30,
    shadowOpacity: 2,
    justifyContent: 'center',
  },
  square: {
    width: 300,
    height: 250,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#FF6F00',
    shadowRadius: 30,
    shadowOpacity: 2,
    top: 165,
    zIndex: 1 //Makes the square under the other components

  },
  center: {
    alignItems: 'center'
  },
  score: {
    width: 90,
    height: 40,
    borderColor: '#BBBE2D',
    borderWidth: 3,
    top: 300,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  upPlayers: {
    top: 110,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    zIndex: 2 //Makes the players above the components
  },
  downPlayers: {
    top: 220,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    zIndex: 2
  },
  disabledButton: {
    width: 150,
    height: 50,
    backgroundColor: '#FFFFFFC3',
    borderRadius: 20,
    justifyContent: 'center',
  },
  nextRound: {
    width: 150,
    height: 50,
    backgroundColor: '#FD8E10',
    borderRadius: 20,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    top: 330
  },
  nextRoundButtonText: {
    fontWeight: 'bold'
  }
});
