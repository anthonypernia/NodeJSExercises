let express = require("express");
let cluster = require("cluster");
let numCPUs = require('os').cpus().length;
let modo_cluster = process.argv[2] == "CLUSTER";


let app = express();

const PORT = 5000;

app.get("/", (req, res, next)=>{
    res.send("Hi Class!");
});


if(modo_cluster && cluster.isMaster){

    console.log(`Master -> PID: ${process.pid}`);

    // Workers
    console.log("cpuuus ..", numCPUs );
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();        
    }

    cluster.on('exit', (worker, code, signal)=>{
        console.log(`Murió el subproceso : ${worker.process.pid}`);
        cluster.fork();  
    });
}else{
    app.listen(PORT, ()=>{
        console.log(`Server on http://localhost:${PORT} || Worker ${process.pid} started!, fecha: ${new Date()}`);
    })
}
