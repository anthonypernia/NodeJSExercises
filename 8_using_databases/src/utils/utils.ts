
    function validateSecurity(req) {
        ///Por ahora solo validamos que tenga algo en la parte de autorization
        if (req.headers.authorization) {
            return true;
        }else{
            return false;
        }
    }

    export { validateSecurity };