const express = require('express');

const config = require('../config.js')

const user = require('./components/user/network');

const app = express();

//router

app.use('/api/user', user)

app.listen(config.api.port, () =>{
    console.log('escuchando en: ', config.api.port)
})
