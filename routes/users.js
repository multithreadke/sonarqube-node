var express = require('express');
var router = express.Router();
var winston = require('../config/winston');
var uuid = require('uuid');
var splunk = require('../config/splunk');
var userService = require('../service/userService');

/* GET users listing. */
router.get('/', userService.findAll);
router.get('/:userId', userService.findOne);
router.post('/create', userService.create);
router.put('/update/:userId', userService.update);
router.delete('/delete', userService.delete);
module.exports = router;
