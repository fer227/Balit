# docker build -t shippingmicroservice .
# docker tag  shippingmicroservice fer227/shippingmicroservice
# docker push fer227/shippingmicroservice

# Utilizamos la versión LTS de Node junto con alpine para obtener una imagen más ligera
FROM node:16-alpine
# Etiquetas generales de información
LABEL maintainer ="Fernando Izquierdo Romera <fer227@correo.ugr.es>" \
        com.bliotec.repository="https://github.com/fer227/Balit"

# Creamos los directorios que vamos a necesitar con los permisos necesarios para la posterior instalación de dependencias.
# Puesto que utilizaremos el usuario por defecto de 'node', pondremos al mismo como propietario
RUN mkdir /home/node/node_modules && chown -R node:node /home/node/node_modules

# Vamos a trabajar directamente en el directorio del usuario node
WORKDIR /home/node

# Copiamos solo los archivos necesarios para la optimización en peso de la imagen (con los permisos correspondientes)
COPY --chown=node  ./ ./

# Cambiamos al usuario que hemos mencionado para tener los permisos justos y necesarios
USER node

# Instalamos las dependencias
RUN npm install

# Actualizamos la variable PATH
ENV PATH=/app/node_modules/.bin:$PATH

# El puerto que utilizaremos
EXPOSE 6000

# Lanzamos el servicio
CMD ["node", "index.js"]