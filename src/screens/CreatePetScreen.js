// src/screens/CreatePetScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
// Importar utilidades
import { savePet } from '../utils/Storage';
import { initialPetState } from '../utils/Constants';

/**
 * Pantalla para dar de Alta una nueva Mascota.
 * Implementa el formulario de captura y la lógica de guardado.
 */
export default function CreatePetScreen({ navigation }) {
  // Estado inicial basado en la estructura reutilizable (Punto 7)
  const [petData, setPetData] = useState(initialPetState);

  const handleChange = (key, value) => {
    // Actualiza solo el campo modificado
    setPetData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    // Validación mínima
    if (!petData.nombre || !petData.propietario || !petData.especie) {
      Alert.alert('Error', 'Los campos Nombre, Propietario y Especie son obligatorios.');
      return;
    }

    // Guarda el objeto de la mascota (Punto 6)
    const success = await savePet(petData);
    
    if (success) {
      // Punto 8: Mensaje de guardado exitoso
      Alert.alert('Guardado Exitoso', `Los datos de ${petData.nombre} se guardaron correctamente.`);
      
      // Reiniciar el estado para un nuevo registro
      setPetData(initialPetState);
      navigation.goBack(); // Volver al menú
    } else {
      Alert.alert('Error', 'Hubo un problema al guardar los datos. Intente de nuevo.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Registro de Nueva Mascota</Text>
      
      {/* Punto 5: Campos a añadir (Nombre, especie, edad, peso, sexo, propietario) */}
      <TextInput
        style={styles.input}
        placeholder="Nombre de la Mascota *"
        value={petData.nombre}
        onChangeText={(text) => handleChange('nombre', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Especie (ej: Canino) *"
        value={petData.especie}
        onChangeText={(text) => handleChange('especie', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad (años)"
        keyboardType="numeric"
        value={petData.edad}
        onChangeText={(text) => handleChange('edad', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={petData.peso}
        onChangeText={(text) => handleChange('peso', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sexo (Macho/Hembra)"
        value={petData.sexo}
        onChangeText={(text) => handleChange('sexo', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre del Propietario *"
        value={petData.propietario}
        onChangeText={(text) => handleChange('propietario', text)}
      />
      
      {/* El historial médico y vacunas se añaden en la pantalla de consulta (PetDetailScreen) */}
      <Text style={styles.note}>Nota: El historial médico y vacunas se completan en la sección de Consulta.</Text>

      <View style={styles.saveButtonContainer}>
        <Button 
          title="Guardar Mascota" 
          onPress={handleSave} 
          color="#28a745"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4CAF50',
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  note: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  saveButtonContainer: {
    marginTop: 20,
    marginBottom: 40,
  }
});