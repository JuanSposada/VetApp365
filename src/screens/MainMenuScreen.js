// src/screens/MainMenuScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

/**
 * Pantalla del Menú Principal (Menú 1).
 * Ofrece las opciones de dar de alta o consultar una mascota.
 */
export default function MainMenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona una Opción</Text>

      {/* Opción 1: Alta de la mascota */}
      <View style={styles.buttonSpacing}>
        <Button 
          title="🐾 Dar de Alta Mascota" 
          onPress={() => navigation.navigate('CreatePet')} 
          color="#28a745" // Verde
        />
      </View>

      {/* Opción 2: Consulta de la mascota */}
      <View style={styles.buttonSpacing}>
        <Button 
          title="📄 Consultar Expediente" 
          onPress={() => navigation.navigate('PetList')} 
          color="#007BFF" // Azul
        />
      </View>
      
      {/* Punto 9: Opción para la salida de la aplicación (regresar a Bienvenida) */}
      <View style={styles.exitButton}>
        <Button 
          title="🚪 Salir" 
          onPress={() => navigation.navigate('Welcome')} 
          color="#dc3545" // Rojo
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  buttonSpacing: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  exitButton: {
    marginTop: 50,
    borderRadius: 8,
    overflow: 'hidden',
  }
});