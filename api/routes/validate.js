const express = require('express');
const router = express.Router();
const QR = require('../models/qr');

router.post('/', async (req, res) => {
    let {code} = req.body;
    try {
        var value = await QR.findOne({ where: {code}});
    }
    catch(err) {
        console.log(err);
    }
    if (!value) {
        
    }
})

module.exports = router;