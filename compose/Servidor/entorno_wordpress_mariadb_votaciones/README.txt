Este entorno es el utilizado en el servidor para el despliegue de los contenedores.

Los subsistemas pueden copiar este entorno en su m�quina local y usarlo como entorno de pruebas a�adiendo su contenedor.

######## IMPORTANTE ######## 
Para realizar pruebas en local con este entorno, hay que sustituir el docker-compose.yaml que se encuentra en la ra�z por el que se encuentra en la carpeta /docker-compose_local. Es necesario ya que el docker-compose de la ra�z es el del servidor, que contiene configuraci�n extra para el proxy que no funciona en un entorno local. Por ello, se ha creado el que se indica para pruebas sin proxy.



######## ESTADO ######## 
19/12/17
Actualmente contiene los siguientes contenedores funcionando en servidor:

- MariaDB
- WordPress
- Login
- Cabina web