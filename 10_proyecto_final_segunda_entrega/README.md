### Shop Anthony

Antes de iniciar, es necesario ejecutar la creacion de tablas que seria usando las rutas:
```
{{ip}}:8080/api/products/create
{{ip}}:8080/api/chat/create
{{ip}}:8080/api/cart/create
```

Se esta manera se crean las tablas donde se va a almacenar los datos.

Esta aplicacion trabaja almacenando en:
<ul>
<li>MongoDB</li>
<li>MariaDB</li>
<li>Firebase</li>
<li>Sqlite</li>
</ul>

Con todas usa el mismo modelado de datos.

Los endpoints con los que trabaja hasta ahora serian con los objetos:
<ul>
<li>CHATS</li>
<li>PRODUCTS</li>
<li>CART</li>
</ul>

#### CHAT
###### Las peticiones posibles serian:
```
GET {{ip}}:8080/api/chat/
```
Traer todos los chats
<br>
```
POST {{ip}}:8080/api/chat/
```
Inserta un chat en la base.
Debe poseer el mensaje en el body. Por ejemplo:
```
{
    "message":"msj",
    "sender":"SENDER MSJ",
    "receiver":"you"
}
```
<br>

#### PRODUCTS
###### Las peticiones posibles serian:
```
POST {{ip}}:8080/api/products/
```
Insertar un producto, con el body de ejemplo     
```
{
        "name":"comida",
        "description":"comida 00000",
        "code":"111222333",
        "price":130,
        "photo":"https://",
        "stock":21
    }
```

```
GET {{ip}}:8080/api/products/{ID}
```
Para obtener un producto por id
<br>
```
GET {{ip}}:8080/api/products
```
Para obtener todos los productos
<br>
```
PUT {{ip}}:8080/api/products/{ID}
```
Para Editar un producto con el id {ID} y colocando la data en el body
Ejemplo de data:
```
    {
        "name":"EDITADO DESDE PUT",
        "description":"DESDE PUT",
        "code":"DESDE PUT",
        "photo":"https://",
        "price":34,
        "stock":32
    }
```
<br>
```
DEL {{ip}}:8080/api/products/{ID}
```
Para borrar un producto por ID

#### CART
###### Las peticiones posibles serian:

```
POST {{ip}}:8080/api/cart/{ID}/products/
```
Para insertar un Producto a un CART
En el body debe ir el  producto:
```
    {
        "code": "111222333",
        "description": "product",
        "photo": "https",
        "price": 130,
        "stock": 21,
        "timestamp": "2021-12-03 01:24:11",
        "name": "product"
    }
```
<br>

```
DEL {{ip}}:8080/api/cart/{IDCART}/products/{IDPROD}
```
Para borrar un producto de algun CART

<br>

```
GET {{ip}}:8080/api/cart/{ID}/products/
```

Para traer la lista de productos de un CART colocando su ID

<br>

```
DEL {{ip}}:8080/api/cart/{ID}
```

Para borrar in CART por su ID

Si desea hacer pruebas con bases de datos con docker.
Seguir este link a un repotorio con los archivos Docker-compose.yml

<br>

<a href='https://github.com/anthonyperniah/DatabaseContainers' target="_blank" > Link a repositorios en Github </a>