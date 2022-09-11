var express =require("express");
var router=express.Router();

var userController=require("../controllers/ users.controller");


router.post('/',userController.createUser)
router.get('/',userController.getUser)
router.put('/update_profile',userController.updateUser)



module.exports=router;
