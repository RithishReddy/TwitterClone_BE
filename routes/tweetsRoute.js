var express = require("express");
var router = express.Router();

var tweetController = require("../controllers/tweet.controllers");

router.post("/", tweetController.createTweet);
router.get("/",tweetController.tweets)
router.get("/profile", tweetController.userTweets);
router.get("/home",tweetController.allTweets)
router.post("/like/:tweet_id",tweetController.likeTweet)
router.get("/user",tweetController.getTweetById)


module.exports = router;
