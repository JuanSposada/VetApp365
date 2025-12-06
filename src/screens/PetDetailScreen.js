// src/screens/PetDetailScreen.js

import React, { useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getPetById } from '../utils/Storage'; // Función para obtener la mascota

// -----------------------------------------------------------------
// Componente Auxiliar para mostrar elementos del historial
// -----------------------------------------------------------------
const HistorialItem = ({ item, type }) => {
  const isConsulta = type === 'consulta';
  
  return (
    <View style={[styles.historialCard, { borderLeftColor: isConsulta ? '#4CAF50' : '#007BFF' }]}>
      {isConsulta ? (
        <>
          <Text style={styles.historialTitle}>Fecha: {item.fecha}</Text>
          <Text style={styles.historialTitle}>Motivo: {item.motivo}</Text>
          <Text style={styles.historialDetail}>Diagnóstico: {item.diagnostico || 'N/A'}</Text>
          <Text style={styles.historialDetail}>Tratamiento: {item.tratamiento || 'N/A'}</Text>
        </>
      ) : (
        <>
          <Text style={styles.historialTitle}>Vacuna: {item.nombre}</Text>
          <Text style={styles.historialDetail}>Aplicada el: {item.fecha}</Text>
        </>
      )}
    </View>
  );
};
// -----------------------------------------------------------------


/**
 * Pantalla para ver el expediente detallado de una mascota.
 * Muestra Datos Generales, Historial de Consultas y Vacunas.
 * Incluye botones para añadir nuevos registros (Punto 4).
 */
export default function PetDetailScreen({ route, navigation }) {
  const { petId, petName } = route.params;
  const [pet, setPet] = useState(null);

  // Carga los datos de la mascota usando el ID de los parámetros
  const loadPet = useCallback(async () => {
    const data = await getPetById(petId);
    if (data) {
        setPet(data);
    } else {
        Alert.alert('Error', 'No se pudieron cargar los datos del expediente.');
        navigation.goBack();
    }
  }, [petId, navigation]); // Dependencias: petId y navigation

  // Recargar datos cada vez que la pantalla se enfoca 
  useFocusEffect(
    useCallback(() => {
      loadPet();
    }, [loadPet]) // Dependencia: loadPet
  );
  
  if (!pet) {
    return (
      <View style={styles.centerContainer}>
        <Text>Cargando datos del expediente...</Text>
      </View>
    );
  }

  // Navegar a la pantalla de adición (Consulta o Vacuna)
  const handleAddAction = (type) => {
    // Se navega a la siguiente pantalla (AddAction) pasando el ID y el tipo de acción
    navigation.navigate('AddAction', { petId: pet.id, petName: pet.nombre, type: type });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Expediente de {pet.nombre}</Text>
      
      {/* 1. Información General */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos Generales</Text>
        <Text style={styles.dataText}>Dueño: {pet.propietario}</Text>
        <Text style={styles.dataText}>Especie: {pet.especie} | Sexo: {pet.sexo}</Text>
        <Text style={styles.dataText}>Edad: {pet.edad} años | Peso: {pet.peso} kg</Text>
      </View>

      {/* 2. Historial de Consultas */}
      <View style={styles.section}>
        <View style={styles.headerWithButton}>
          <Text style={styles.sectionTitle}>Historial de Consultas ({pet.historialMedico.length})</Text>
          <Button 
            title="+ Consulta" 
            onPress={() => handleAddAction('consulta')} 
            color="#4CAF50" // Verde para Consulta
          />
        </View>
        
        {pet.historialMedico.length === 0 ? (
          <Text style={styles.emptyText}>No hay consultas registradas.</Text>
        ) : (
          <FlatList
            data={pet.historialMedico}
            // Usamos el índice como clave ya que no tienen ID único
            keyExtractor={(_, index) => `c-${index}`} 
            renderItem={({ item }) => <HistorialItem item={item} type="consulta" />}
          />
        )}
      </View>

      {/* 3. Vacunas */}
      <View style={styles.section}>
        <View style={styles.headerWithButton}>
          <Text style={styles.sectionTitle}>Registro de Vacunas ({pet.vacunas.length})</Text>
          <Button 
            title="+ Vacuna" 
            onPress={() => handleAddAction('vacuna')} 
            color="#007BFF" // Azul para Vacuna
          />
        </View>

        {pet.vacunas.length === 0 ? (
          <Text style={styles.emptyText}>No hay vacunas registradas.</Text>
        ) : (
          <FlatList
            data={pet.vacunas}
            keyExtractor={(_, index) => `v-${index}`}
            renderItem={({ item }) => <HistorialItem item={item} type="vacuna" />}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
// ... (Los estilos se mantienen iguales)
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  headerWithButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dataText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  emptyText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 5,
  },
  // Estilos del componente HistorialItem
  historialCard: {
    padding: 12,
    marginTop: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    borderLeftWidth: 5, // El color se define dinámicamente
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  historialTitle: {
    fontWeight: 'bold',
    marginBottom: 3,
    fontSize: 15,
  },
  historialDetail: {
    fontSize: 14,
    color: '#666',
  }
});