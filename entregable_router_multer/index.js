
const express = require('express');
const app = express();
const PORT = 3030;
const serverRouter = require('./routes/');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.get('/', (req, res) => {
    
    res.send('Hello World');
});

serverRouter(app);