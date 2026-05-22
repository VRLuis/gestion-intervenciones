# Instrucciones de arranque

# Requisitos

- Tener node instalado
- Tener docker desktop y docker compose para el arranque de la base de datos

1. Clonamos el repositorio en nuestro equipo

2. Situarse en la carpeta raíz del proyecto y ejecutar el siguiente comando:

```
docker compose up -d
```

3. Copiamos y pegamos lo siguiente en la terminal (situándonos en la carpeta del proyecto)

```
cd frontend
npm install

cd ../backend
npm install
```

4. Arrancamos los programas (situándonos en la carpeta del proyecto)

```
cd backend
node app.js
```

Abrimos otra terminal y en la carpeta del proyecto:

```
cd frontend
npm run dev
```

Ya tendríamos los proyectos corriendo

Frontend: localhost:5173
Backend: localhost:5000