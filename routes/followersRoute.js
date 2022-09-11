var express =require("express");
var router=express.Router();

var followersController=require("../controllers/followers.controller");

router.post('/',followersController.Follow)
router.delete('/',followersController.unFollow)
router.get('/check',followersController.userFollowed)




module.exports=router