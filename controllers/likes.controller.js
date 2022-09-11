const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getLikes(req, res, next) {
  try {
    const email = req.email;
    const tweet_id = parseInt(req.query.id);

    const id = await prisma.users.findUnique({
      select: {
        id: true,
      },
      where: {
        email,
      },
    });

    const likes = await prisma.likes.count({
      where: {
        tweet_id,
      },
    });
    const like = { count: likes };

    res.json(like);
  } catch (err) {
    console.error("Error while getting Products", err.message);
    next(err);
  }
}

async function setLike(req, res, next) {
  try {
    const email = req.email;
    // const tweet_id = parseInt(req.query.id);
    const tweet_id = (req.body.tweet_id);

    const id = await prisma.users.findUnique({
      select: {
        id: true,
      },
      where: {
        email,
      },
    });

    const like = await prisma.likes.create({
      data: {
        user_id: id.id,
        tweet_id,
      },
    });

    res.json(like);
  } catch (err) {
    console.error("Error while getting Products", err.message);
    next(err);
  }
}

async function setDisLike(req, res, next) {
  try {
    const tweet_id = (req.body.tweet_id);
    console.log("hii",req.body)
    const email = req.email;

    const id = await prisma.users.findUnique({
      select: {
        id: true,
      },
      where: {
        email,
      },
    });

    const data = await prisma.likes.delete({
      where: {
        user_id_tweet_id: {
         tweet_id:tweet_id,
         user_id:id.id
        },
      },
    });

    res.json(data);
  } catch (err) {
    console.error("Error while getting Products", err.message);
    next(err);
  }
}


async function userLiked(req, res, next) {
  try {
    const tweet_id = parseInt(req.query.tweet_id);
    const email = req.email;

    const id = await prisma.users.findUnique({
      select: {
        id: true,
      },
      where: {
        email,
      },
    });

    const data = await prisma.likes.count({
      where: {
       tweet_id,
       user_id:id.id
      }
    });

    res.json(data);
  } catch (err) {
    console.error("Error while getting Products", err.message);
    next(err);
  }
}

module.exports = { getLikes, setLike, setDisLike,userLiked };
