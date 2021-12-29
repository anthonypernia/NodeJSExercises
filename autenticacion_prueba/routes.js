

class Login{

    getRoot(req, res, next){
        res.send('Wellcome');
    }

    getLogin(req, res, next){
        if (req.isAuthenticated()) {
            res.status(200).send('user logueado');
        }
    }


    getSignup( req, res, next ){
    }

    getFailLogin( req, res, next ){

    }

    getFailSignup( req, res, next ){
    }

    failRoute( req, res, next ){

    }

    postLogin( req, res, next ){
    }

    postSignup( req, res, next ){
    }

}