// src/screens/WelcomeScreen.js

import React from 'react';
// Importar ImageBackground
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native'; 

// 1. RUTA DE LA IMAGEN (Asegúrate de que la ruta sea correcta)
const PIG_BACKGROUND_IMAGE = require('../assets/fondo_puerquitos.png'); 

/**
 * Pantalla de Bienvenida con fondo temático.
 */
export default function WelcomeScreen({ navigation }) {
  const navigateToMenu = () => {
    navigation.navigate('MainMenu');
  };

  return (
    // USAR ImageBackground como contenedor principal
    <ImageBackground 
      source={PIG_BACKGROUND_IMAGE} 
      resizeMode="cover" 
      style={styles.background}
    >
      {/* Contenedor interno para centrar y añadir capa transparente */}
      <View style={styles.overlay}> 
        <Text style={styles.hospitalName}>VetApp365</Text>
        <Text style={styles.clinicName}>Veterinaria Tres Puerquitos</Text>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Ingresar al Sistema" 
            onPress={navigateToMenu}
            color="#007BFF"
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // Estilo para ImageBackground
  background: {
    flex: 1,
  },
  // Contenedor interno para mejorar la legibilidad del texto
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // Capa semi-transparente para contrastar el texto sobre la imagen
    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
  },
  hospitalName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50', 
    marginBottom: 5,
    // Sombra para que el texto resalte
    textShadowColor: 'white', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  clinicName: {
    fontSize: 22,
    color: '#333',
    marginBottom: 60,
    textShadowColor: 'white', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  buttonContainer: {
    width: '80%',
  }
});