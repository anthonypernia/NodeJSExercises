### Shop Anthony

Antes de iniciar, es necesario ejecutar la creacion de tablas que seria usando las rutas:

{{ip}}:8080/api/products/create
{{ip}}:8080/api/chat/create
{{ip}}:8080/api/cart/create

Se esta manera se crean las tablas donde se va a almacenar los datos.

Esta aplicacion trabaja almacenando en MongoDB , MariaDB , Firebase, o Sqlite. con toda usa el mismo modelado de datos.

Las rutas a usar serian:

Para CHAT:

GET {{ip}}:8080/api/chat/
- Trae todos los chats

POST {{ip}}:8080/api/chat/
Inserta un chat con el body de ejemplo:
{
    "message":"msj",
    "sender":"iam",
    "receiver":"you"
}

Para PRODUCTS:

POST {{ip}}:8080/api/products/
Insertar un producto, con el body de ejemplo     
{
        "name":"comida",
        "description":"comida 00000",
        "code":"111222333",
        "price":130,
        "photo":"fsfsfsfs",
        "stock":21
    }

GET {{ip}}:8080/api/products/{ID}
Para obtener un producto por id

GET {{ip}}:8080/api/products
Para obtener todos los productos

PUT {{ip}}:8080/api/products/{ID}
Para Editar un producto con el id {ID} y colocando la data en el body

DEL {{ip}}:8080/api/products/{ID}
Para borrar un producto por ID