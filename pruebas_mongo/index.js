let express = require('express');
let app = express();
const foodRouter = require('./routes/Foods');

let bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));


app.use('/food',foodRouter);

app.listen(3000, function () {
    console.log('Server started on port 3000');
})