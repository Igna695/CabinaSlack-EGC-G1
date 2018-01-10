INFO
----
Este entorno servirá de partida para el contenedor de WordPress que se está desarrollando para el despliegue en servidor del portal del congreso.

La carpeta wp-content debe ser rellenada con la correspondiente subida al repositorio de integración, que es el contenido del propio portal.


IMPORTANTE
----
Actualmente, la aplicación funciona en la URL http:localhost/splc.
Si en el entorno donde se despliegue, se accede a la aplicación mediante una URL diferente, ejecutar el script que se encuentra en la carpeta ./scripts/script_wordpress_replace_url.sql adaptando dicho script con la URL nueva (leer correspondiente README)