const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getComments(req, res, next) {
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

    const comments = await prisma.comments.findMany({
      where: {
        tweet_id,
      },
      include: {
        user: {
          select: {
            name: true,
            user_name: true,
            image: true,
          },
        },
      },
      orderBy:{
        updatedAt:"desc"
      }
    });

    res.json(comments);
  } catch (err) {
    console.error("Error while getting Products", err.message);
    next(err);
  }
}


// async function getCommentsCount(req, res, next) {
//   try {
//     const email = req.email;
//     const tweet_id = parseInt(req.query.id);

//     const id = await prisma.users.findUnique({
//       select: {
//         id: true,
//       },
//       where: {
//         email,
//       },
//     });

//     const comments = await prisma.comments.count({
//       where: {
//         tweet_id,
//       },
//     });
//     const comment = { count: comments };

//     res.json(comment);
//   } catch (err) {
//     console.error("Error while getting Products", err.message);
//     next(err);
//   }
// }

async function createComment(req, res, next) {
  try {
    const email = req.email;
    const tweet_id = parseInt(req.body.tweet_id);
    const comment = req.body.comment;

    const id = await prisma.users.findUnique({
      select: {
        id: true,
      },
      where: {
        email,
      },
    });

    const newComment = await prisma.comments.create({
      data: {
        comment,
        user_id: id.id,
        tweet_id,
      },
    });

    res.json(newComment);
  } catch (err) {
    console.error("Error while getting Products", err.message);
    next(err);
  }
}

async function countComments(req, res, next) {
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

    const data = await prisma.comments.count({
      where: {
        tweet_id,
      },
    });
    const comment = { count: data };

    res.json(comment);
  } catch (err) {
    console.error("Error while getting Products", err.message);
    next(err);
  }
}

module.exports = { getComments, createComment, countComments };
