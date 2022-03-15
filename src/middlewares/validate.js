const Joi = require("joi");
const { response } = require("../helpers");



module.exports = (obj,) => {
  return async (req, res, next) => {
    const schema = Joi.object().keys(obj).required().unknown(false);
    const value = req.method === "GET" ? req.query : req.body;
    const { error, value: vars } = schema.validate(value);

    if (error) {
      return response(res, { status: false, message: error.message });
    }
    let publicData;
 
    if(req.authData){
       publicData = {
        authId: req.authData._id,
        email: req.authData.email,
        accountType: req.authData.accountType,
        isEmailVerified: req.authData.isEmailVerified,
        isPhoneNumberVerified: req.authData.isPhoneNumberVerified,
        hasOnboarded: req.authData.hasOnboarded,
        phoneNumber: req.authData.phoneNumber,
      };
    }


    const personalData = {
      ...vars,
      ...publicData
    };

    req.form = personalData;
    next();
  };
};
