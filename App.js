import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { getDatabase, ref, onValue, set } from "firebase/database";
import "./firebase";

export default function App() {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const gameChoices = ["rock", "paper", "scissors"];
  const [outCome, setOutCome] = useState({ user: "", computer: "" });
  const db = getDatabase();
  const reference = ref(db, "highscore/");

  useEffect(() => {
    onValue(reference, (snapshot) => {
      if (snapshot.val() !== null) {
        const highscore = snapshot.val().highscore;
        setHighScore(highscore);
      }
    });
  }, []);

  const storeHighScore = (score) => {
    set(reference, {
      highscore: score,
    });
  };

  const playRound = (userChoice) => {
    const computerChoice = Math.floor(Math.random() * 3);
    setOutCome({ user: userChoice, computer: gameChoices[computerChoice] });

    if (userChoice === gameChoices[computerChoice]) return;

    if (
      (userChoice === "scissors" && gameChoices[computerChoice] === "paper") ||
      (userChoice === "paper" && gameChoices[computerChoice] === "rock") ||
      (userChoice === "rock" && gameChoices[computerChoice] === "scissors")
    ) {
      setCurrentScore(currentScore + 1);
      if (currentScore >= highScore) {
        setHighScore(currentScore + 1);
        storeHighScore(currentScore + 1);
      }
    } else {
      setCurrentScore(0);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>{highScore}</Text>
      <View style={styles.btnContainer}>
        <Pressable
          style={styles.btn}
          onPress={() => playRound("rock")}
          title="Rock"
        >
          <Text>Rock</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => playRound("paper")}>
          <Text>Paper</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => playRound("scissors")}>
          <Text>Scissors</Text>
        </Pressable>
      </View>
      <Text style={styles.score}>{currentScore}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  btn: {
    margin: 10,
    backgroundColor: "steelblue",
    padding: 10,
    width: 75,
    alignItems: "center",
    borderRadius: 20,
  },
  score: {
    fontSize: 32,
    fontWeight: "bold",
    margin: 40,
  },
});
