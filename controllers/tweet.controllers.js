const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

prisma.$on("query", async (e) => {
  // console.log(`${e.query} ${e.params}`);
});

// async function Tweet(req, res, next) {
//   const email = req.email;
//   const user = await prisma.users.findUnique({
//     select: {
//       id: true,
//     },
//     where: {
//       email,
//     },
//   });

//   const id = user.id;
// }

async function createTweet(req, res, next) {
  try {
    const { message } = req.body;
    const email = req.email;

    const id = await prisma.users.findUnique({
      select: {
        id: true,
      },
      where: {
        email,
      },
    });

    const newTweet = await prisma.tweets.create({
      data: {
        message,
        user_id: id.id,
      },
    });

    res.json(newTweet);
  } catch (err) {
    console.error("Error while getting Products", err.message);
    next(err);
  }
}

async function userTweets(req, res, next) {
  try {
    const email = req.email;

    const id = await prisma.users.findUnique({
      select: {
        id: true,
      },
      where: {
        email,
      },
    });

    const tweets = await prisma.tweets.findMany({
      // select:{
      //     message:true
      // },
      where: {
        user_id: id.id,
      },
    });

    res.json(tweets);
  } catch (err) {
    console.error("Error while getting Products", err.message);
    next(err);
  }
}

async function getTweetById(req, res, next) {
  try {
    const tweet_id = parseInt(req.query.tweet_id);
    const tweet = await prisma.tweets.findUnique({
      where: {
        id: tweet_id,
      },
      include: {
        user: {
          select: {
            name: true,
            user_name: true,
            image: true,
            email:true
          },
        },
      },
    });
    res.json(tweet);
  } catch (err) {
    console.error("Error while getting Products", err.message);
    next(err);
  }
}

async function allTweets(req, res, next) {
  try {
    const email = req.email;

    const id = await prisma.users.findUnique({
      select: {
        id: true,
      },
      where: {
        email,
      },
    });

    const followers = await prisma.followers.findMany({
      where: {
        follower_id: id.id,
      },
      select: {
        followed_id: true,
      },
    });

    const filteredFollowers = followers.map((follower) => {
      return follower.followed_id;
    });

    // res.json(filteredFollowers);
    const tweets = await prisma.tweets.findMany({
      where: {
        user_id: {
          in: filteredFollowers,
        },
      },
      // select:{
      //   message:true
      // },
      orderBy: {
        updatedAt: "desc",
      },
    });

    res.json(tweets);
  } catch (err) {
    console.error("Error while getting Products", err.message);
    next(err);
  }
}

async function tweets(req, res, next) {
  // console.log(req.query,req.params)
  try {
    const show = req.query.show;
    const email = req.query.email;
    const email1 = req.email;
    console.log(email, email1);

    const id = await prisma.users.findUnique({
      select: {
        id: true,
      },
      where: {
        email: email1,
      },
    });

    if (show === "all") {
      try {
        const followers = await prisma.followers.findMany({
          where: {
            follower_id: id.id,
          },
          select: {
            followed_id: true,
          },
        });

        const filteredFollowers = followers.map((follower) => {
          return follower.followed_id;
        });

        // res.json(filteredFollowers);
        const tweets = await prisma.tweets.findMany({
          where: {
            user_id: {
              in: filteredFollowers,
            },
          },
          include: {
            user: {
              select: {
                name: true,
                user_name: true,
                image: true,
                email:true
              },
            },
          },
          // select:{
          //   message:true
          // },
          orderBy: {
            updatedAt: "desc",
          },
        });

        res.json(tweets);
      } catch (err) {
        console.error("Error while getting Products", err.message);
        next(err);
      }
    } else if (show === "user") {
      try {
        const id2 = await prisma.users.findUnique({
          select: {
            id: true,
          },
          where: {
            email: email,
          },
        });

        const tweets = await prisma.tweets.findMany({
          include: {
            user: {
              select: {
                name: true,
                user_name: true,
                image: true,
                email:true
              },
            },
          },
          where: {
            user_id: id2.id,
          },
          orderBy: {
            updatedAt: "desc",
          },
        });

        res.json(tweets);
      } catch (err) {
        console.error("Error while getting Products", err.message);
        next(err);
      }
    } else if (show === "like") {
      try {
        const id2 = await prisma.users.findUnique({
          select: {
            id: true,
          },
          where: {
            email: email,
          },
        });

        const tweets = await prisma.likes.findMany({
          where: {
            user_id: id2.id,
          },
          select: {
            tweet_id: true,
          },
        });

        const filteredTweets = tweets.map((tweet) => {
          return tweet.tweet_id;
        });

        const likedTweets = await prisma.tweets.findMany({
          where: {
            id: {
              in: filteredTweets,
            },
          },
          include: {
            user: {
              select: {
                name: true,
                user_name: true,
                image: true,
                email:true
              },
            },
          },
          // select:{
          //   message:true
          // },
          orderBy: {
            updatedAt: "desc",
          },
        });

        res.json(likedTweets);
      } catch (err) {
        console.error("Error while getting Products", err.message);
        next(err);
      }
    }
  } catch (err) {
    console.error("Error while getting Products", err.message);
    next(err);
  }
}

async function likeTweet(req, res, next) {
  try {
    const email = req.email;
    const tweet_id = parseInt(req.params.tweet_id);

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

module.exports = {
  createTweet,
  userTweets,
  getTweetById,
  allTweets,
  likeTweet,
  tweets,
};
