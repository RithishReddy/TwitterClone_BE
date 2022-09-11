const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function Follow(req, res, next) {
  try {
   
    const email1 = req.email;
    const {email} = req.body;
    console.log(email)

    const id = await prisma.users.findUnique({
      select: {
        id: true,
      },
      where: {
        email:email1,
      },
    });

    const id2 = await prisma.users.findUnique({
      select: {
        id: true,
      },
      where: {
        email:email,
      },
    });

    const id1 = id.id;

    const data = await prisma.followers.create({
      data: {
        follower_id: id1,
        followed_id: id2.id,
      },
    });

    res.json(data);
  } catch (err) {
    console.error("Error while getting Products", err.message);
    next(err);
  }
}

async function unFollow(req, res, next) {
  try {
    const email1 = req.email;
    const {email} = req.body;
    console.log(email)
    

    const id = await prisma.users.findUnique({
      select: {
        id: true,
      },
      where: {
        email:email1,
      },
    });

    const id2 = await prisma.users.findUnique({
      select: {
        id: true,
      },
      where: {
        email:email,
      },
    });
    const id1 = id.id;
    

    const data = await prisma.followers.delete({
      where: {
        follower_id_followed_id:{
            follower_id: id1,
            followed_id: id2.id,
        }
       
      },
    });

    res.json(data);
  } catch (err) {
    console.error("Error while getting Products", err.message);
    next(err);
  }
}
async function userFollowed(req, res, next) {
  try {
    const email2 = (req.query.email);
    const email = req.email;

    const id = await prisma.users.findUnique({
      select: {
        id: true,
      },
      where: {
        email,
      },
    });
    const id2 = await prisma.users.findUnique({
      select: {
        id: true,
      },
      where: {
        email:email2,
      },
    });

    const data = await prisma.followers.count({
      
      where:{
        follower_id:id.id,
        followed_id:id2.id

      }
    });

    res.json(data);
  } catch (err) {
    console.error("Error while getting Products", err.message);
    next(err);
  }
}

module.exports = { Follow, unFollow ,userFollowed};
