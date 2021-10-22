
const express = require('express');
const app = express();
const PORT = 8080;
const serverRouter = require('./routes/');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(err, req, res, next) {
    
    console.error(err.stack);
    res.status(500).send('Something broke!');
}
);

app.listen(PORT, ( err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is listening on port ${PORT}`);
    }
    
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

serverRouter(app);