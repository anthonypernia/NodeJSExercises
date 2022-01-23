### Entregable 15 load balancer con nginx
Si desea iniciar las aplicaciones en modo cluster usando el metodo cluster, es necesario usar la plabra clave CLUSTER despues de llamar al script con node.
`node index.js CLUSTER`
Si no se agrega el parametro, iniciara en modo fork.

Si se desea especificar un puerto, se debe agregar el flag -p seguido del puerto:
`node index.js -p 3000`


### Primera parte, sin pm2

Iniciamos cluster en puerto 8081
`node index.js CLUSTER -p 8081`
Iniciamos servidor individual en 8080
`node index.js -p 8080`
Y configuramos el nginex como esta en el archivo nginx.conf, esta en este mismo directorio.
El codigo en el archivo seria:

```
    ###PRIMERA PARTE####
	upstream node_app_random{
		server 127.0.0.1:8081;
	}
	upstream node_app_others{
		server 127.0.0.1:8080;
	}
	server{
		listen 80;
		server_name nginx_app;
		root /home/anthony/node_projects/15_load_balancer;
		location /randoms {
			proxy_pass http://node_app_random;
		}
		location / {
			proxy_pass http://node_app_others;
		}
	}
```

### Segunda parte, usando PM2 y varias instancias:

Usando PM2, podemos iniciar el servidor en modo cluster o fork, manualmente, o con nginx como proxy.
Primero , para verificar el status de NGINX. lo verificamos con:
`sudo systemctl status nginx` en linux

##### Usamos PM2

Para inicializar el servidor en modo cluster, con pm2 en el puerto 8081:
`pm2 start index.js --name="server_anthony_cluster" --watch -i max  --  -p 8081`
Para inicializar el servidor en modo fork, con pm2 en el puerto 8080:
`pm2 start index.js --name="server_anthony1" --watch --  -p 8080`

(Recordar que con el flag -p se coloca el puerto)

Usando NGINX, con la configuracion establecida en nginx.conf

```
    ####SEGUNDA PARTE####
	upstream node_app_random{
		server 127.0.0.1:8082;
		server 127.0.0.1:8083;
		server 127.0.0.1:8084;
		server 127.0.0.1:8085;
	}
	upstream node_app_others{
		server 127.0.0.1:8080;
	}
	server{
		listen 80;
		server_name nginx_app;
		root /home/anthony/node_projects/15_load_balancer;
		location /randoms {
			proxy_pass http://node_app_random;
		}
		location / {
			proxy_pass http://node_app_others;
		}
	}
```
Inicializamos nginx
```
sudo systemctl start nginx
sudo systemctl start nginx.service 
```
Inicializamos las instancias
```
pm2 start index.js --name="server_anthony_cluster_4" --watch --  -p 8085
pm2 start index.js --name="server_anthony_cluster_3" --watch --  -p 8084
pm2 start index.js --name="server_anthony_cluster_2" --watch --  -p 8083
pm2 start index.js --name="server_anthony_cluster_1" --watch --  -p 8082
pm2 start index.js --name="server_anthony_cluster_others" --watch --  -p 8080
```

Y posteriormente solo queda hacer las pruebas al endpoint:
`{IP}/random/:number?/`
Y en la respuesta nos dice desde que puerto nos esta respondiendo, asi sabremos la instancia.
Para verificar las otras rutas, se agrego un endpoint de prueba
`{IP}/prueba/`
Asi verificamos que las rutas que no sean random , esten funcionando y vayan a un puerto distinto
