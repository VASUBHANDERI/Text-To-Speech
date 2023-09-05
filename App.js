import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import Constants from "expo-constants";
import * as Speech from "expo-speech";

export default function App() {
  // State to store user's input text
  const [text, setText] = useState("");

  // State to manage speech status (speaking or not)
  const [speaking, setSpeaking] = useState(false);

  // Function to speak the entered text
  const speak = () => {
    if (text !== "") {
      // Check if there is text to speak
      Speech.speak(text, {
        onDone: () => {
          // When speech is done, set speaking status to false
          setSpeaking(false);
        },
      }); // Use the Speech API to speak the text
    } else {
      Speech.speak("Please enter some text!", {
        onDone: () => {
          // When speech is done, set speaking status to false
          setSpeaking(false);
        },
      }); // Speak a prompt if no text is entered
    }
    setSpeaking(true); // Update the speaking status to true
  };

  // Function to stop speaking
  const stop = () => {
    Speech.stop(); // Stop the speech
    setSpeaking(false); // Update the speaking status to false
  };

  return (
    <>
      <View style={styles.header}>
        {/* Header with app title */}
        <Text style={styles.headerText}>Text to Speech</Text>
      </View>

      <View style={styles.container}>
        {/* Use KeyboardAvoidingView to handle keyboard display */}
        <View style={styles.keyboardContainer}>
          <View style={styles.inputContainer}>
            {/* Text input field for user to enter text */}
            <TextInput
              value={text}
              style={styles.input}
              placeholder="Enter text to speak..."
              onChangeText={(value) => setText(value)} // Update the 'text' state with user input
              multiline={true} // Allow multiple lines in the input field
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {/* Button to start/stop speaking */}
          <Button
            color="#D27D2D"
            title={speaking ? "Stop" : "Speak"} // Change button text based on speaking status
            onPress={speaking ? stop : speak} // Call 'stop' or 'speak' function based on speaking status
          />
        </View>
      </View>
    </>
  );
}

// Styling for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },
  keyboardContainer: {
    flex: 1,
    width: "100%",
  },
  inputContainer: {
    flex: 1,
    width: "90%",
    justifyContent: "center", // Center horizontally
    marginBottom: 10, // Spacing from the bottom
    alignSelf: "center", // Center within the parent
  },
  input: {
    flex: 1, // Allow the input to expand vertically
    borderColor: "grey",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    textAlignVertical: "top", // Start input from the top
  },
  buttonContainer: {
    width: "90%", // Set button width
    marginBottom: 10, // Spacing from the bottom
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: "#D27D2D", // Header background color
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white", // Header text color
  },
});
