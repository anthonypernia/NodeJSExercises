
    function validateSecurity(req, res, next) {

        if (req.method != 'GET' && !req.headers.authorization && req.url.includes('/products/')) {
            return res.status(401).send({ error: 'You must be authorized to make this request.'});
        }
        next();
    }

    export { validateSecurity };