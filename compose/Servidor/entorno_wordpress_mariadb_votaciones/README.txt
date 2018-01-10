Este entorno es el utilizado en el servidor para el despliegue de los contenedores.

Los subsistemas pueden copiar este entorno en su máquina local y usarlo como entorno de pruebas añadiendo su contenedor.

######## IMPORTANTE ######## 
Para realizar pruebas en local con este entorno, hay que sustituir el docker-compose.yaml que se encuentra en la raíz por el que se encuentra en la carpeta /docker-compose_local. Es necesario ya que el docker-compose de la raíz es el del servidor, que contiene configuración extra para el proxy que no funciona en un entorno local. Por ello, se ha creado el que se indica para pruebas sin proxy.



######## ESTADO ######## 
19/12/17
Actualmente contiene los siguientes contenedores funcionando en servidor:

- MariaDB
- WordPress
- Login
- Cabina web