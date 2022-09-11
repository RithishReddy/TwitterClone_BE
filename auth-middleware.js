const firebase = require("./firebase/index");

function authMiddleware(request, response, next) {
  const headerToken = request.headers.authorization;
  if (!headerToken) {
    return response.send({ message: "No token provided" }).status(401);
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    response.send({ message: "Invalid token" }).status(401);
  }

  //  console.log(headerToken)
  const token = headerToken.split(" ")[1];
  // console.log(token);
  firebase
    .auth()
    .verifyIdToken(token)
    .then((result) => {
      request.email = result.email;
      next();
    //  console.log(result)
    })
    .catch(() => response.send({ message: "Could not authorize" }).status(403));
}

module.exports = authMiddleware;
