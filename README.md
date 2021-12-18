# Nodepop
### Proyecto fin módulo Node keepcoding

[![Build Status](https://github.com/webito/nodepop.git)](https://github.com/webito/nodepop.git)

Nodepop es un sistema de compra / venta de artículos mediante anuncios con un front que muestra los anuncios en un DataTable y una API con CRUD sobre los artículos
El sistema carece de un sistema de autenticacion, solo funcional para fines didácticos

Usa las tecnologías / librerías:
- Node
- Mongo DB (Mongoose)
- JavaScript
- Express
- Ejs
- DataTable


## Usage
Copy .env.example to .env and set your credentials

```sh
cp .env.example .env
```

## Instalación
Nodepop requiere [Node.js](https://nodejs.org/) 
Para instalar las dependencias ejecutar:

```sh
cd nodepop
npm i
```

## Comando para arrancar MongoDb (Windows)
```sh
C:\Program Files\MongoDB\Server\5.0\bin>mongo.exe
Podemos probar conexion con:
>show dbs
```

## Carga de anuncios predefinidos
Podemos cargar anuncios predefinidos para probar la aplicación
```sh
npm run initDB
en nueva version 
npm run init-db
```

## Ejecutar en entorno de producción
```sh
npm start
```

## Ejecutar en entorno de desarrollo
```sh 
npm run dev
```

## Ejecutar en entorno en modo Cluster
```sh 
npm run cluster
```

## Endpoints Api
El proyecto tiene un fichero llamado Nodepop.postman_collection.json el cual contiene los ejemplos de las llamadas a los enpoints de Nodepop
Este fichero debe ser importado a Postman el cual nos mostrara las llamadas para probar la aplicación

### nota endpoint con filtro de precios
Los filtros de precios tiene un rango de precios en el cual se pone primero el limite inferior y superior separados por un guion medio (-), se hace un split con el guion medio
http://localhost:3000/apiv1/anuncios/?precio=133-150

Si quisieramos poner un precio minimo, solo se coloca el primer precio y nos mostrara todos los anuncios con precio superior a 133 
http://localhost:3000/apiv1/anuncios/?precio=133

Si quisieramos poner el limite superior de precio en 150 ponemos el guion medio y el limite superior
http://localhost:3000/apiv1/anuncios/?precio=-150


## Rutas disponibles
/apiv1/anuncios
/users
/features
/change-locale
/login
/privado
## Licencia

MIT

**Software libre con fines didácticos**