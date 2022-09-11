const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function verifyUser(req, res, next) {
  const email = req.email;
  // console.log(email)

  try {
    
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      res.send({isPresent:true})
      // res.status(307).json("user exists");
    } else {
      res.status(307).send({isPresent:false})
    }
  } catch (err) {
    console.error("Error while getting Products", err.message);
    next(err);
  }
}

module.exports = { verifyUser };
