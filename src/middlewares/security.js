const jwt = require("jsonwebtoken");
const { response } = require("../helpers");
const { auth } = require("../services");


//creates a list of non restricted endpoints
const nonRestrictedEndPoints = [
  "/",
  "/create-user-account",
  "/login",
  "/forgot-Password",
  "/validate-user-token",
  "/match-user",
  "/verify-auth-code"

];

//creates list of authorized endpoints
const restrictedEndPoints = [
  
  "/get-user",
  "/update-user-data",
  "/delete-user",
   "/update-email",
  
   
  
]

const inServiceEndPoints = [

]



module.exports = async (req, res, next) => {

  //forwards request without validation if is not restricted
  if (nonRestrictedEndPoints.includes(req.path)) {
    next();
  } else if (inServiceEndPoints.includes(req.path)) {
    jwt.sign({}, process.env.SECRET)
    try {
      jwt.verify(req.headers["x-access-token"], process.env.SECRET);
    } catch (error) {
      return response(res, { status: false, message: "Unauthorized Access!  " }, 401);
    }
    next();
  }

  else {
    //validates request if is restricted
    const token = req.headers.authorization;
    const body = { token: token }
    const data = await auth.validateUserToken(body);
    if (data.status === false) {
      return response(res, { status: false, message: "Unauthorized Access" }, 401);
    }
    req.authData = data.data
    next();
  }






};
