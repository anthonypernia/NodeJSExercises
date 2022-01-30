### Entregable loggin

Usando compresion con GZIP para la ruta INFO

```
const compression = require("compression");
app.use(compression());
app.get("/info", (req, res, next) => {
  res.json({
    argIn: yargs.argv,
    env: process.env,
    nodeVersion: process.version,
    os: process.platform,
    memoryReserve: process.memoryUsage(),
    pathExec: process.execPath,
    processId: process.pid,
    folderProcess: process.cwd(),
    numCPUsUsage : numCPUs
  });
});
```

Para hacer log se uso la libreria winston.

En el caso de los info se creo un objeto:

```
const loggerInfo = new winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console( level = 'verbose' )
    ]
});
```

Para los Warning y Error, identico, pero se le coloco un archivo destino:

```
const loggerErr = new winston.createLogger({
    level: 'error',
    transports: [
        new winston.transports.File({ filename: `${logsFolder}/error.log` }),
        new winston.transports.Console( level = 'verbose' )
    ]
});
```
Para informar todas las peticiones a las rutas recibidas , creo un metodo en utils, que verifica, logea, y deja continuar la peticion:
```
function logInfRoutes(req, res, next) {
    loggerInfo.info(`${req.method} ${req.url}`);
    next();
}
```

Para informar un error en chat|products lo coloco en las respuestas a las peticiones:
```
class ChatController{

    async getChats(req, res, next){
        try{
            let result = await chatService.getChats();
            res.status(200).json(result);
        }catch(err){
            loggerErr.error(err);
            res.status(500).json({error: err});
        }  
    }
```

Y para las rutas inexistentes, uso el logger en el metodo de utils que verifica cuando hay una peticion a una ruta inexistente:
```
function inexistentRoute(req, res, next) {
    loggerWarn.warn(`${req.method} ${req.url}`);
    res.status(404).json({
        error: -2,
        description: `Method ${req.method} not implemented to endpoint ${req.url}`
        });
    
}
```


Usando Artillery para test de estres en la ruta /info
Se realizo test en modo fork, y en modo cluster
Luego de iniciar el servido en modo fork o cluster con:

```
npm --prof index.js //para fork
npm --prof index.js CLUSTER // para cluster
```

Para las pruebas de estres se usa el comando:

```
artillery quick --count 20 -n 50 http://{IP}/info > results_fork_info.txt
artillery quick --count 20 -n 50 http://{IP}/info > results_cluster_info.txt
```

Renombramos los logs que creo automaticmaente log, a : info_fork1.log

Los resultados estan en :
- results_fork_info.txt
- results_cluster_info.txt

PAra analizar los logs que creamos con --prof
```
node --prof-process info_fork1.log > result_flork_info_from_prof.txt
```

Usando los Dev Tools de Chrome:
Ejecutamos el server con : 
```
node --inspect index.js 
```
Y nos vamos a : chrome://inspect

Posteriormente, hacemos la prueba de estres con artillery y obtendemos una respuesta como esta:
