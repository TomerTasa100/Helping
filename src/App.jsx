import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* 1. The Top Text */}
      <Text style={styles.title}>Helping App</Text>
      <Text style={styles.subtitle}>Please sign in to continue</Text>

      {/* 2. Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#999"
      />

      {/* 3. Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry={true} // This turns text into dots (•••••)
      />

      {/* 4. Login Button */}
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={() => alert('Login Clicked!')} />
      </View>
    </View>
  );
}

// The Styles make it look good
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center', // Centers items horizontally
    justifyContent: 'center', // Centers items vertically
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40, // Pushes the inputs down
  },
  input: {
    width: '100%', // Take up full width of the container
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8, // Rounded corners
    paddingHorizontal: 15, // Space inside the box
    marginBottom: 15, // Space between boxes
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  }
});