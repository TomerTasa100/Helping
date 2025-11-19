import 'react-native-gesture-handler'; // This MUST be at the very top
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';

// Initialize the Stack Navigator
const Stack = createStackNavigator();

// ==========================================
// SCREEN 1: THE LOGIN SCREEN
// ==========================================
function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // REPLACE THIS WITH YOUR REAL IP ADDRESS
      const response = await fetch('http://172.20.27.248:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // SUCCESS: Navigate to Home
        // We use 'replace' so the user can't go 'back' to the login screen
        navigation.replace('Home'); 
      } else {
        Alert.alert("Error", data.detail);
      }
    } catch (error) {
      Alert.alert("Connection Error", "Is the backend running?");
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Please sign in to continue</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        placeholderTextColor="#aaa"
        onChangeText={setUsername} 
        value={username}
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        placeholderTextColor="#aaa"
        secureTextEntry={true} 
        onChangeText={setPassword} 
        value={password}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

// ==========================================
// SCREEN 2: THE HOME SCREEN (With 4 Buttons)
// ==========================================
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>What would you like to do?</Text>

      {/* The Grid of 4 Buttons */}
      <View style={styles.gridContainer}>
        
        <TouchableOpacity style={styles.menuButton} onPress={() => Alert.alert("Clicked Map")}>
          <Text style={styles.menuText}>🗺️ Map</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => Alert.alert("Clicked Chat")}>
          <Text style={styles.menuText}>💬 Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => Alert.alert("Clicked Profile")}>
          <Text style={styles.menuText}>👤 Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => Alert.alert("Clicked Settings")}>
          <Text style={styles.menuText}>⚙️ Settings</Text>
        </TouchableOpacity>

      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={[styles.loginButton, {backgroundColor: '#ff4444', marginTop: 30}]} 
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.loginButtonText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

// ==========================================
// MAIN APP: THE TRAFFIC CONTROLLER
// ==========================================
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

// ==========================================
// STYLES
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: { fontSize: 32, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 40 },
  input: {
    width: '100%', height: 50, backgroundColor: '#f1f1f1',
    borderRadius: 8, paddingHorizontal: 15, marginBottom: 15,
    borderWidth: 1, borderColor: '#ddd'
  },
  loginButton: {
    width: '100%', height: 50, backgroundColor: '#007AFF',
    borderRadius: 8, alignItems: 'center', justifyContent: 'center',
    marginTop: 10,
  },
  loginButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  
  // New Styles for the Grid
  gridContainer: {
    width: '100%',
    flexDirection: 'row', // Arrange items in a row
    flexWrap: 'wrap',     // Allow them to wrap to the next line
    justifyContent: 'space-between',
  },
  menuButton: {
    width: '48%', // Roughly half width (minus spacing)
    height: 120,
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  menuText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  }
});