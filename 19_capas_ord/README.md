#### http://{IP}:8080/login
En esta ruta, el usuario puede iniciar sesion con su nombre y contraseña la cual le asignara un token con JsonWebToken, que sera valido para la sesion que esta siendo almacenada en una base de datos en mongoDB. Tanto el token como la sesion tienen una validez 20 minutos.

#### http://{IP}:8080/register
En este endpoint el usuario puede registrarse , compartiendo los siguientes datos:
-   username
-   email
-   direccion
-   edad
-   numero de telefono

Toda esta informacion sera almacenada en una base de datos noSQL (MongoDB), y las contraseñas estan encriptadas con la libreria **bcrypt**

Cada vez que un usuario nuevo se registra, se envia un mail y un whatsapp al administrador, para esto se usa la libreria **twilio y nodemailer**

Cuando el usuario inicia la orden de compra, los productos se almacenan en mongoDB y ademas en el localstorage del navegador, por lo cual ese dato , cuando el usuario procede a hacer la compra, se hace una solicitud y le llega un mail y un whatsapp al administrador, con los datos de compra.

Los console.logs fueron reemplazados por la libreria **winston** para hacer logs, y se almacenan en un archivo de acuerdo al tipo.