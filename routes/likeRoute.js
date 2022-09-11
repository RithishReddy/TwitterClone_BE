var express = require('express');
var router = express.Router();

var likeController=require("../controllers/likes.controller");



router.get('/',likeController.getLikes)
router.post('/',likeController.setLike)
router.delete('/',likeController.setDisLike)
router.get("/check",likeController.userLiked)


module.exports=router