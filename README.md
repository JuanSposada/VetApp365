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

## 📸 Capturas de Pantalla de la Aplicación

A continuación se muestran las interfaces principales del flujo de la aplicación.

### 1. WelcomeScreen (Pantalla de Inicio)
Establece el tema visual con el fondo de "Los 3 Puerquitos" y sirve como entrada principal al sistema.

<img width="551" height="988" alt="image" src="https://github.com/user-attachments/assets/d86c9c7b-5e22-41f1-aa46-98523c145f04" />

### 2. MainMenuScreen (Menú Principal)
Menú simple que ofrece las opciones de Alta de Mascota y Consulta de Expedientes.

<img width="550" height="987" alt="image" src="https://github.com/user-attachments/assets/b1132d2e-106a-4ab3-900b-1150b230a6e2" />


### 3. CreatePetScreen (Formulario de Alta)
Formulario para registrar los datos generales de una nueva mascota y su propietario.

<img width="412" height="844" alt="image" src="https://github.com/user-attachments/assets/0ed2b276-b289-4d85-9203-2e3259edce79" />


### 4. PetListScreen (Lista de Expedientes)
Muestra todas las mascotas registradas. Al tocar un ítem, navega al detalle.

<img width="411" height="819" alt="image" src="https://github.com/user-attachments/assets/dbea47df-7533-4ec6-9eee-e4c6d3b610f6" />


### 5. PetDetailScreen (Detalle y Historial)
Muestra los datos generales de la mascota, el historial de consultas y vacunas, e incluye botones para agregar nuevos registros.

<img width="409" height="638" alt="image" src="https://github.com/user-attachments/assets/1d828e81-8b87-4001-bfb0-66fcdb781ac8" />


### 6. AddActionScreen (Agregar Consulta)
Ejemplo de formulario dinámico utilizado para añadir una nueva consulta al historial médico de la mascota seleccionada.

<img width="407" height="716" alt="image" src="https://github.com/user-attachments/assets/b39f4442-cadc-4354-9b90-fcb961976b04" />

### 7. AddActionScreen (Agregar Vacuna)
La misma pantalla dinámica, configurada para registrar una nueva vacuna y su fecha de aplicación.

<img width="411" height="573" alt="image" src="https://github.com/user-attachments/assets/c2b8cf85-6d8a-4246-ba9c-08a11a2e50d3" />


