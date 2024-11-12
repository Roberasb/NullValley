# Proyecto NULL VALLEY - Prueba técnica

Este repositorio contiene un proyecto de aplicación con arquitectura cliente-servidor. La estructura del proyecto se compone de múltiples carpetas y archivos esenciales para el backend en Node.js, frontend en React, y base de datos en MySQL, además de configuración de Docker (dockercompose) para ambiente local de mysql.

## Estructura del Proyecto

## Carpetas Principales

### frontend-react

Contiene el proyecto del frontend desarrollado en React. Esta carpeta incluye todos los componentes, recursos y configuraciones necesarios para la interfaz de usuario del proyecto.

### netlify

Contiene el backend modificado para ser compatible con Netlify. Aquí se encuentran los ajustes necesarios para el despliegue del backend en la plataforma Netlify.

### SQL

Incluye los scripts SQL utilizados para la configuración y migración de la base de datos. Estos scripts permiten la creación de tablas, inserción de datos iniciales, y más.

## Extras

### backend-node

Contiene el proyecto del backend desarrollado en Node.js. Esta carpeta incluye toda la lógica y configuración para la API del proyecto, sin integración con Netlify.

### DockerDesarrolloLocal

Esta carpeta contiene el archivo `docker-compose.yml`, que se utiliza para el despliegue de un entorno de desarrollo local con MySQL. Permite la creación y administración de un contenedor de base de datos al iniciar el proyecto.

## Archivos Principales
- **netlify.toml**: Archivo de configuración de Netlify, utilizado para establecer reglas de despliegue.
- **package.json**: Archivo de configuración de dependencias y scripts del proyecto.
- **README.md**: Este archivo que estas leyendo, contiene una descripción general de la estructura y configuración del proyecto.

## Instrucciones de Configuración

### Requisitos

#### Para entorno de desarrollo local

1. Node.js y npm instalados en tu entorno.

2. Docker para la configuración del entorno de base de datos local.

3. Netlify CLI (opcional) si deseas realizar despliegues en Netlify directamente desde el entorno local.

### Pasos de Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/Roberasb/NullValley.git
```

2. Instala las dependencias del backend y del frontend:

```bash
cd frontend-react
npm install
cd ..
cd netlify/functions
npm install
cd ../..
```

3. Debes ejecutar `netlify dev` en la raíz del repo, es decir en la carpeta "nullvalley" donde está  netlify.toml.

La estructura debería ser así:
```
nullvalley/               <- EJECUTAR AQUÍ netlify dev
├── frontend-react/
├── netlify/
│   └── functions/
├── netlify.toml
└── ...
```

ejecutar:
```bash
netlify dev
```


#### En caso de no utilizar el despliegue en la nube 

Si deseas utilizar la bd local, levanta el entorno de desarrollo de Docker para MySQL:

```bash
cd DockerDesarrolloLocal/NV_MySQL
docker-compose up -d
```

Una vez conectado a la instancia de MySQL, Instala las piezas SQL con el script proporcionado. (los datos de conexión están en el archivo docker-compose.yml)

Configura el archivo `.env` en el backend y frontend según tus necesidades.
  
### Despliegue en Netlify

Para desplegar el backend en Netlify, asegúrate de que la carpeta `netlify` contenga todos los ajustes específicos y revisa el archivo `netlify.toml` para una configuración correcta.
En mi caso levante la bd en Railway, por lo tanto todas las configuraciones de bd apuntan hacia alla.