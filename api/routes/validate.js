const express = require('express');
const router = express.Router();
const QR = require('../models/qr');

router.post('/', async (req, res) => {
    let {code, time} = req.body;
    try {
        var value = await QR.findOne({ where: {code}});
    }
    catch(err) {
        console.log(err);
    }

    if (!value) {
        res.send({
            message: "Ticket does not exist",
            success: 400,
            code
        });
    } else if (value.valid === true) {
        res.send({
            message: "Ticket has already been registererd", 
            success: 300,
            code: value.code,
            time: value.time
        });
    } else {
        await QR.update(
            {
                valid : true,
                time
            },
            {where: {code} }
        )
        res.send({
            message: "Ticket succesfully registered",
            success: 200, 
            code: value.code
        });
    }
})

module.exports = router;