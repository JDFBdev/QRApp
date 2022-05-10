const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    let {n} = req.body;
    if(n == "0"){
        res.send({message: exito, succes: true})
    }
    else {
        res.send({message: fail, succes: false})
    }
})

module.exports = router;