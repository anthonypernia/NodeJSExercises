import { Router } from "express";
let router = Router();


export default ( app ) => {
    app.use( '/', router );

    router.get( '/login', ( req, res, next) => {
        res.render('./login.ejs', {});
    });

    router.post( '/login', ( req, res, next) => {
        console.log( req.body );
        res.json({
            message: 'Login success'
        });
        // res.redirect('/home');
    });
}



// app.get('/login', (req, res, next) => {
//     
// });

