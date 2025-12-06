// App.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ----------------------------------------------------------------------
// IMPORTAR PANTALLAS (Asumiendo que están en src/screens/)
// ----------------------------------------------------------------------
import WelcomeScreen from './src/screens/WelcomeScreen';
import MainMenuScreen from './src/screens/MainMenuScreen';
import CreatePetScreen from './src/screens/CreatePetScreen';
import PetListScreen from './src/screens/PetListScreen';
import PetDetailScreen from './src/screens/PetDetailScreen';
import AddActionScreen from './src/screens/AddActionScreen'; // Nueva pantalla

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: { backgroundColor: '#4CAF50' }, // Color corporativo (Verde)
          headerTintColor: '#fff', // Color del texto de la barra superior
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} // Ocultar barra en bienvenida
        />
        <Stack.Screen 
          name="MainMenu" 
          component={MainMenuScreen} 
          options={{ title: 'Menú Principal' }}
        />
        <Stack.Screen 
          name="CreatePet" 
          component={CreatePetScreen} 
          options={{ title: 'Alta de Mascota' }}
        />
        <Stack.Screen 
          name="PetList" 
          component={PetListScreen} 
          options={{ title: 'Consultar Expediente' }}
        />
        <Stack.Screen 
          name="PetDetail" 
          component={PetDetailScreen} 
          // Título dinámico: Expediente de [Nombre de la Mascota]
          options={({ route }) => ({ title: `Expediente de ${route.params.petName}` })} 
        />
        <Stack.Screen 
          name="AddAction" 
          component={AddActionScreen} 
          // Título dinámico: Nueva Consulta / Nueva Vacuna
          options={({ route }) => ({ 
            title: route.params.type === 'consulta' ? 'Nueva Consulta' : 'Nueva Vacuna' 
          })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}