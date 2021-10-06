const express = require('express')
const { userControllers } = require('../controllers')
const { auth } = require('../helper/authToken')
const routers = express.Router()

routers.post('/login', userControllers.getData)
routers.get('/get', userControllers.getAllUsers)

module.exports = routers