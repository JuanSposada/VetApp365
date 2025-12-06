// src/utils/Constants.js

/**
 * Estructura inicial y reutilizable para el objeto de la Mascota.
 * (Punto 6 y 7)
 */
export const initialPetState = {
  id: '', // Se generará al guardar (para clave única)
  nombre: '',
  especie: '',
  edad: '', 
  peso: '', 
  sexo: '',
  propietario: '',
  // Los arrays se inicializan vacíos para añadir datos después
  historialMedico: [], // Array de objetos para consultas
  vacunas: [], // Array de objetos para vacunas
};

// Estructuras para los formularios de adición (Punto 4)
export const initialConsultationState = {
  fecha: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
  motivo: '',
  diagnostico: '',
  tratamiento: '',
};

export const initialVaccineState = {
  nombre: '',
  fecha: new Date().toISOString().slice(0, 10),
};