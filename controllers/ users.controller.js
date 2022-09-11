const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createUser(req, res, next) {
  
  try {
    const { user_name, name,email, image, bio } = req.body;
    const newUser = await prisma.users.create({
      data: {
        user_name,
        name,
        email,
        image,
        bio,
      },
    });
    res.json(newUser);
  } catch (err) {
    console.error("Error while getting Products", err.message);
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
  

    const email = (req.query.email);
    const id = await prisma.users.findUnique({
      select: {
        id: true,
      },
      where: {
        email,
      },
    });
 

    const user = await prisma.users.findUnique({
      where: {
        id:id.id
      },
      include:{
        _count:{
          select:{
            followers:true,
            following:true,
            tweets:true
          }
        }
      }
    });
    res.json(user);
  } catch (err) {
    console.error("Error while getting Products", err.message);
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const { user_name, image, bio } = req.body;
    const email=req.email
    const user = await prisma.users.update({
      where: {
        email,
      },
      data: {
        user_name,
        email,
        image,
        bio,
      },
    });
    res.json(user);
  } catch (err) {
    console.error("Error while getting Products", err.message);
    next(err);
  }
}

module.exports = {
createUser,getUser,updateUser
};
