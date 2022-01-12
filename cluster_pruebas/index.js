let cluster = require('cluster');
let numCPUs = require('os').cpus().length;
let express = require('express');
let app = express();
let PORT = 8080


if (cluster.isMaster) {

    console.log(`Number of CPUs: ${numCPUs}`);

    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });

} else {
    console.log(`Worker ${process.pid} started`);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}, Worker ${process.pid}`);
    }
    );
}

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);


// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// }
// );