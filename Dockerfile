# Usa una imagen base de Node.js
FROM node:20
# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app
# Copia los archivos de tu proyecto al directorio de trabajo
COPY package*.json ./
# Instala las dependencias del proyecto
RUN npm install
# Copia el resto de los archivos de tu proyecto
COPY . .
# Construye tu aplicación
RUN npm run build
# Expone el puerto en el que se ejecuta tu aplicación
EXPOSE 3000
# Comando para iniciar tu aplicación
CMD ["npm", "start"]