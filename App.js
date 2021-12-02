import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const gameChoices = ['rock', 'paper', 'scissors'];
  const [outCome, setOutCome] = useState({user: "", computer: ""});

  const playRound = (userChoice) => {
    const computerChoice = Math.floor(Math.random() * 3);
    setOutCome({user: userChoice, computer: gameChoices[computerChoice]});
    
    if (userChoice === gameChoices[computerChoice]) return;

    if (
      (userChoice === "scissors" && gameChoices[computerChoice] === "paper") ||
      (userChoice === "paper" && gameChoices[computerChoice] === "rock") ||
      (userChoice === "rock" && gameChoices[computerChoice] === "scissors")
    ) {
      setCurrentScore(currentScore + 1);
      if (currentScore >= highScore) {
        setHighScore(currentScore + 1);
        // storeHighScore(currentScore + 1);
      }
    } else {
      setCurrentScore(0);
    }
  }




  return (
    <View style={styles.container}>
      <Text>{highScore}</Text>
      <Button onPress={() => playRound("rock")} title="Rock"/>
      <Button onPress={() => playRound("paper")} title="Paper"/>
      <Button onPress={() => playRound("scissors")} title="Scissors"/>
      <Text>{currentScore}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
