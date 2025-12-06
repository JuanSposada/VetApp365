// src/utils/Storage.js

import AsyncStorage from '@react-native-async-storage/async-storage';

const PETS_STORAGE_KEY = '@VetApp365:pets';

// Obtiene todas las mascotas guardadas
export const getPets = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(PETS_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error reading pets:', e);
    return [];
  }
};

// Obtener una sola mascota por ID
export const getPetById = async (id) => {
    const pets = await getPets();
    return pets.find(p => p.id === id);
}

// Guarda una nueva mascota o actualiza una existente (Punto 6, 7)
export const savePet = async (newPet) => {
  try {
    const currentPets = await getPets();
    
    // Asignar un ID si es nuevo
    if (!newPet.id) {
        newPet.id = Date.now().toString(); 
    }
    
    // Reemplazar la mascota existente o añadir la nueva
    const existingIndex = currentPets.findIndex(p => p.id === newPet.id);
    if (existingIndex > -1) {
        currentPets[existingIndex] = newPet; // Actualizar
    } else {
        currentPets.push(newPet); // Añadir
    }
    
    const jsonValue = JSON.stringify(currentPets);
    await AsyncStorage.setItem(PETS_STORAGE_KEY, jsonValue);
    return true; // Éxito
  } catch (e) {
    console.error('Error saving pet:', e);
    return false; // Fallo
  }
};

// Actualiza campos específicos de una mascota (usado para historial/vacunas)
export const updatePetData = async (petId, newData) => {
    const pets = await getPets();
    const index = pets.findIndex(p => p.id === petId);
    if (index > -1) {
        // Combinar datos existentes con los nuevos (ej: agregar una consulta)
        pets[index] = { ...pets[index], ...newData };
        const jsonValue = JSON.stringify(pets);
        await AsyncStorage.setItem(PETS_STORAGE_KEY, jsonValue);
        return pets[index];
    }
    return null;
}