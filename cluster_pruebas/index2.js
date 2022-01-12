let express = require('express');
let app = express();
let PORT = 8080


app.get('/', (req, res) => {
    res.send('Hello World!');
}
);


app.listen(PORT, () => {
    console.log('Server is running on port 8080');
}
);