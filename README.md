# 🐷 VetApp365: Veterinaria Los 3 Puerquitos

Esta es una aplicación móvil desarrollada con **React Native** (usando Expo) para la gestión de expedientes de mascotas en la Veterinaria "Los 3 Puerquitos". La aplicación permite dar de alta nuevas mascotas y llevar un registro detallado de su historial médico y vacunas.

## 🌟 Características Principales

* **Registro de Mascotas:** Captura de datos básicos del paciente (nombre, especie, dueño, etc.).
* **Gestión de Expedientes:** Consulta detallada de datos de la mascota.
* **Historial Médico:** Adición y visualización de consultas con motivo, diagnóstico y tratamiento.
* **Registro de Vacunas:** Adición y visualización de vacunas aplicadas.
* **Persistencia de Datos:** Uso de `AsyncStorage` para guardar la información localmente en el dispositivo.

## 🛠️ Tecnologías Utilizadas

* **Framework:** React Native
* **Entorno:** Expo
* **Navegación:** `react-navigation` (Stack Navigator)
* **Almacenamiento Local:** `@react-native-async-storage/async-storage` (implementado en `src/utils/Storage.js`).
* **Lenguaje:** JavaScript (ES6+)

---

## 🏗️ Estructura del Proyecto

El proyecto sigue una estructura modular para separar la lógica de negocio, la UI y la navegación:

```
vetapp365/
├── node_modules/
├── src/
│   ├── assets/
│   │   └── fondo_puerquitos.png   <- Imagen de fondo
│   ├── screens/
│   │   ├── AddActionScreen.js     <- Añadir Consulta/Vacuna
│   │   ├── CreatePetScreen.js     <- Formulario de Alta
│   │   ├── MainMenuScreen.js      <- Menú Principal
│   │   ├── PetDetailScreen.js     <- Detalle y Historial (CRUD)
│   │   ├── PetListScreen.js       <- Lista de Mascotas
│   │   └── WelcomeScreen.js       <- Pantalla de Inicio
│   └── utils/
│       ├── Constants.js           <- Estructuras de datos (initialPetState)
│       └── Storage.js             <- Lógica de AsyncStorage (CRUD)
├── App.js                         <- Contenedor principal y Stack Navigator
├── package.json                   
└── README.md                      
```
---

## 🚀 Puesta en Marcha (Instalación Local)

Sigue estos pasos para descargar, instalar y ejecutar el proyecto en tu entorno de desarrollo.

### 1. Requisitos

Asegúrate de tener instalado **Node.js** y la CLI de Expo.

```bash
# Instalar Expo CLI globalmente (si aún no lo tienes)
npm install -g expo-cli
```

### 2. Instalación de Dependencias

Navega a la carpeta principal del proyecto (`vetapp365`) y ejecuta:

```bash
npm install
```

### 3. Ejecutar la Aplicación
```bash
expo start
```

Esto abrirá Expo Dev Tools en tu navegador. Puedes escanear el código QR con la aplicación Expo Go en tu teléfono o usar un emulador/simulador para ver la aplicación.

## 📦 Compilación para Producción (APK/AAB)

Para generar el archivo ejecutable (`.apk` o `.aab`), utilizamos **EAS Build** (Expo Application Services).

### 1. Instalar EAS CLI

Asegúrate de que la herramienta EAS esté instalada globalmente:

```bash
npm install -g eas-cli
```

### 2. Configuración e Inicio de Sesión

Inicia sesión con tu cuenta de Expo:

```bash
eas login
```

### 3. Configurar el Proyecto (si es la primera vez)

```bash
eas build:configure
```

### 4. Iniciar la Compilación

Ejecuta el comando para compilar el archivo final para Android:

```bash
eas build -p android --profile production
```
