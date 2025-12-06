// src/screens/AddActionScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
// Importar funciones y estructuras de datos
import { getPetById, updatePetData } from '../utils/Storage'; 
import { initialConsultationState, initialVaccineState } from '../utils/Constants';

/**
 * Pantalla dinámica para agregar una nueva Consulta o una nueva Vacuna al expediente.
 * (Cierra el ciclo del Punto 4)
 */
export default function AddActionScreen({ route, navigation }) {
  const { petId, petName, type } = route.params;
  
  // Define el estado inicial y los textos basados en el 'type'
  const isConsulta = type === 'consulta';
  const initialState = isConsulta ? initialConsultationState : initialVaccineState;
  const title = isConsulta ? 'Agregar Nueva Consulta' : 'Agregar Nueva Vacuna';
  
  const [formData, setFormData] = useState(initialState);
  
  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };
  
  const handleSaveAction = async () => {
    
    // 1. Validaciones específicas
    if (isConsulta && !formData.motivo) {
        Alert.alert('Error', 'El motivo de la consulta es obligatorio.');
        return;
    }
    if (!isConsulta && !formData.nombre) {
        Alert.alert('Error', 'El nombre de la vacuna es obligatorio.');
        return;
    }
      
    // 2. Obtener el expediente actual para no sobrescribir
    const currentPet = await getPetById(petId);
    if (!currentPet) {
        Alert.alert('Error', 'No se encontró el expediente de la mascota.');
        return;
    }
    
    let updatedData = {};
    
    // 3. Preparar los datos a actualizar
    if (isConsulta) {
        // Añadir la nueva consulta al array historialMedico
        const newHistorial = [...currentPet.historialMedico, formData];
        updatedData = { historialMedico: newHistorial };
    } else { 
        // Añadir la nueva vacuna al array vacunas
        const newVacunas = [...currentPet.vacunas, formData];
        updatedData = { vacunas: newVacunas };
    }
    
    // 4. Actualizar el objeto de la mascota en AsyncStorage
    const result = await updatePetData(petId, updatedData);
    
    if (result) {
      Alert.alert('Éxito', `${title} guardada para ${petName}.`);
      // Navegar de vuelta a PetDetailScreen (que se recargará automáticamente por useFocusEffect)
      navigation.goBack(); 
    } else {
      Alert.alert('Error', `Fallo al guardar ${title}.`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Expediente: {petName}</Text>
      
      {/* Campo de Fecha (común) */}
      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={formData.fecha}
        onChangeText={(text) => handleChange('fecha', text)}
      />

      {isConsulta ? (
        <>
          {/* Campos Específicos de Consulta */}
          <TextInput
            style={styles.input}
            placeholder="Motivo de la Consulta *"
            value={formData.motivo}
            onChangeText={(text) => handleChange('motivo', text)}
          />
          <TextInput
            style={styles.inputLarge}
            placeholder="Diagnóstico"
            multiline
            value={formData.diagnostico}
            onChangeText={(text) => handleChange('diagnostico', text)}
          />
          <TextInput
            style={styles.inputLarge}
            placeholder="Tratamiento"
            multiline
            value={formData.tratamiento}
            onChangeText={(text) => handleChange('tratamiento', text)}
          />
        </>
      ) : (
        /* Campo Específico de Vacuna */
        <TextInput
          style={styles.input}
          placeholder="Nombre de la Vacuna *"
          value={formData.nombre}
          onChangeText={(text) => handleChange('nombre', text)}
        />
      )}

      <View style={styles.saveButtonContainer}>
        <Button 
          title={`Guardar ${isConsulta ? 'Consulta' : 'Vacuna'}`} 
          onPress={handleSaveAction} 
          color={isConsulta ? '#4CAF50' : '#007BFF'} 
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
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
  inputLarge: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlignVertical: 'top', // Para que el texto empiece arriba en Android
  },
  saveButtonContainer: {
    marginTop: 20,
    marginBottom: 40,
  }
});