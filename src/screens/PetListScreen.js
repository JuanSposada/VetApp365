// src/screens/PetListScreen.js

import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Para recargar la lista
import { getPets } from '../utils/Storage'; // Función para obtener datos

/**
 * Pantalla que lista todas las mascotas registradas.
 * Permite seleccionar una mascota para ver su detalle/historial.
 */
export default function PetListScreen({ navigation }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPets = async () => {
    setLoading(true);
    const storedPets = await getPets();
    setPets(storedPets);
    setLoading(false);
  };

  // Recarga la lista cada vez que la pantalla se enfoca
  useFocusEffect(
    useCallback(() => {
      loadPets();
    }, [])
  );

  const handlePetPress = (pet) => {
    // Navegar a la pantalla de detalle, pasando solo el ID y el nombre
    navigation.navigate('PetDetail', { petId: pet.id, petName: pet.nombre });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.petItem} onPress={() => handlePetPress(item)}>
      <Text style={styles.petName}>{item.nombre}</Text>
      <Text style={styles.petInfo}>Especie: {item.especie} | Dueño: {item.propietario}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Cargando expedientes...</Text>
      </View>
    );
  }

  if (pets.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No hay mascotas registradas.</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => navigation.navigate('CreatePet')}
        >
          <Text style={styles.addButtonText}>Dar de Alta una Mascota</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  petItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#007BFF',
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  petInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});