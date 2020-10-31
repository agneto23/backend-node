const express = require('express');

const response = require('../../../network/responde');

const router = express.Router();

router.get('/', function (req, res) {
    response.success(req, res, 'Todo correcto', 200)
})

module.exports = router;
