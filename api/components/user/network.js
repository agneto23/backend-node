const express = require('express');

const response = require('../../../network/response');

const router = express.Router();

router.get('/api/user', function (req, res) {
    response.success(req, res, 'Todo correcto ok ok ok oki2dsd omar3', 200)
})

module.exports = router;
