const { Router } = require("express");
const { auth } = require("../controllers");
const { validate } = require("../middlewares");
const { auth: validator } = require("../validator");

const routes = Router();

routes.get("/", auth.welcomeText);

routes.post("/create-user-account",validate(validator.userRegistration), auth.userRegistration);

routes.post("/login",validate(validator.generalLogin), auth.generalLogin);

routes.post("/validate-user-token", validate(validator.validateUserToken),auth.validateUserToken);

routes.get("/get-user", validate(validator.getAUser), auth.getAUser);

routes.put("/update-user-data",validate(validator.updateAuthData),auth.updateAuthData);

routes.delete("/delete-user",validate(validator.deleteAUser),auth.deleteAUser);

routes.post("/forgot-Password",validate(validator.forgotPassword),auth.forgotPassword);

routes.put("/update-email",validate(validator.updateEmailAddress),auth.updateEmailAddress);

routes.get("/match-user",validate(validator.matchUsers),auth.matchUsers);

routes.post("/verify-auth-code",validate(validator.validateAuthCodes),auth.validateAuthCodes);



module.exports = routes; 
