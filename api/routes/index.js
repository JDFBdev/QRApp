var express = require('express');
var router = express.Router();

const validate = require('./validate');
router.use('/validate', validate);

const test = require('./test');
router.use('/test', test);

const bulkCreateQR = require('./bulkCreateQR');
router.use('/bulkCreateQR', bulkCreateQR);

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).send({message: "/validate", success: true});
});

module.exports = router;