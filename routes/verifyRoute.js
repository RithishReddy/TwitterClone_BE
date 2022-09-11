var express = require("express");
var router = express.Router();

const verifyController = require("../controllers/verify.controller");


router.get("/",verifyController.verifyUser)

module.exports=router