import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { getDatabase, ref, onValue, set } from "firebase/database";
import "./firebase";

export default function App() {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
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

  const playRound = (num) => {
    const computerChoice = Math.floor(Math.random() * 3);
    console.log(num, computerChoice);
    if (num === computerChoice) {
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
      <Text style={styles.scoreBox}>{highScore}</Text>
      <Text style={styles.score}>High Score</Text>
      <View style={styles.btnContainer}>
        <Pressable style={styles.btn} onPress={() => playRound(0)}>
          <Text style={{ color: "white" }}>Pick Me</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => playRound(1)}>
          <Text style={{ color: "white" }}>Pick Me</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => playRound(2)}>
          <Text style={{ color: "white" }}>Pick Me</Text>
        </Pressable>
      </View>
      <Text style={styles.scoreBox}>{currentScore}</Text>
      <Text style={styles.score}>Current Score</Text>

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
    margin: 50,
  },
  btn: {
    margin: 10,
    backgroundColor: "steelblue",
    padding: 10,
    width: 75,
    alignItems: "center",
    borderRadius: 20,
  },
  scoreBox: {
    fontSize: 32,
    fontWeight: "bold",
    margin: 15,
    padding: 25,
    borderWidth: 1,
  },
  score: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
