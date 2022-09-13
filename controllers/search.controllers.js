const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createUser(req, res, next) {
  try {
    const name = req.query.name;
    const profile = await prisma.users.findMany({
      where: {
        user_name: {
          contains: name,
        },
      },
      select: {
        user_name: true,
        image:true,
        email:true
      },
    });

    const tweets = await prisma.tweets.findMany({
      where: {
        message: {
          contains: name,
        },
      },
      select: {
        message: true,
        id:true,
        user:{
          select:{
            email:true,
            user_name:true
          }
        }
  
      },
    });
    res.json({ profile, tweets });
  } catch (err) {
    console.error("Error while getting Products", err.message);
    next(err);
  }
}

module.exports = { createUser };
