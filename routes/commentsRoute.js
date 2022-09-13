var express =require("express");
var router=express.Router();

var commentsController=require("../controllers/comment.controllers");



router.get('/',commentsController.getComments)
router.post("/",commentsController.createComment)
router.get('/count',commentsController.countComments)


module.exports=router