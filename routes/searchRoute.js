var express = require('express');
var router = express.Router();

var searchController=require("../controllers/search.controllers");



router.get('/',searchController.createUser)


module.exports=router