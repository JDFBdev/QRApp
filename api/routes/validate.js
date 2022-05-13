const express = require('express');
const router = express.Router();
const QR = require('../models/qr');

router.post('/', async (req, res) => {
    let {code, time} = req.body;
    var value = {};
    var qrTotal = 0;
    try {
        await Promise.all([QR.findOne({ where: {code}}), QR.count()])
        .then(values =>{
            value = values[0];
            qrTotal = values[1];
        })
    }
    catch(err) {
        console.log(err);
    }

    if (!value) {
        res.send({
            message: "Ticket does not exist",
            success: 400,
            code,
            total: `${qrValid}/${qrTotal}`
        });
    } else if (value.valid === true) {
        res.send({
            message: "Ticket has already been registererd", 
            success: 300,
            code: value.code,
            time: value.time,
            total: `${qrValid}/${qrTotal}`
        });
    } else {
        await QR.update(
            {
                valid : true,
                time
            },
            {where: {code} }
        )
        let qrValid = await QR.count({where: {valid : true}})
        res.send({
            message: "Ticket succesfully registered",
            success: 200,
            code : value.code,
            total: `${qrValid}/${qrTotal}`
        });
    }
})

module.exports = router;