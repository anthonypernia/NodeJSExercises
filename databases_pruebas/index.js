let express = require('express');
let app = express();
let path = require('path')
let cors = require('cors');
let db_obj = require('./config/db');
let db = db_obj.client;
let PORT = process.env.PORT || 3000;

///settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public/uploads'));

//middleware
app.use(cors('*'));



// (async () => {
//     try{
//         //let res = await db.from('products')
//         //let res = await db.from('products').where({id: 2}).update({price: 5000})
//         let res = await db.from('products').whereIn('id', [6,7,8,9,10]).update({price: 290})
//         console.log(res)

//     }catch(err){
//         console.log(err);
//     }
// })();


app.get('/create_table', async (req, res) => {

    try{
        await db.schema.createTable("users", (table) => {
            table.increments('id').primary();
            table.string('name');
            table.string('lastname');
            table.integer('age');
            table.string('email');
        });

        await db.schema.createTable("partido", (table) => {
            table.increments('id').primary();
            table.string('partido');
            table.integer('id_user').unsigned().references('users.id');
        });

        console.log('table created');
        res.send('Table created');

    }catch(err){
        console.log(err);
    }

});

app.get('/', async (req, res) => {
    try{
        console.log(req.body);
        let data = {
            name: req.body.name,
            lastname: req.body.lastname,
            age: req.body.age,
            email : req.body.email,
        }
        let result = await db.from('users')
        console.log(result);
        res.send(result);
    }catch(err){
        console.log(err);
    }
});

app.post('/person', async (req, res) => {
    try{
        console.log(req.body);
        let data = {
            name: req.body.name,
            lastname: req.body.lastname,
            age: req.body.age,
            email : req.body.email,
        }
        let result1= await db.from('users').insert(data);
        let result2 = await db.from('partido').insert({'partido':req.body.partido, "id_user":result1[0]});
        console.log(result1 , result2);
        res.send(result1);
    }catch(err){
        console.log(err);
    }
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
    }
);