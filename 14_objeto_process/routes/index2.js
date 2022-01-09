const { Router } = require('express');
const router = Router();

module.exports = (app) => {
    app.use('/random', router);
    
    router.get('/random', (req, res) => {
        console.log('Routes loaded');
        res.json({
            random: Math.random()
        });
    }
    );
}

