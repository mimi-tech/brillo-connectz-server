const Joi = require("joi");

module.exports = {
  generalLogin: {
    email: Joi.string(),
    phoneNumber: Joi.string(),
    password: Joi.string().required(),
  },


  userRegistration: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    username: Joi.string().lowercase({ force: true }).required(),
    profileImageUrl: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    interest: Joi.string().lowercase({ force: true }).required(),
  },
  validateAuthCodes:{ 
    authId: Joi.string().required(),
    verificationCode: Joi.number().required(),
  },

  getAUser:{
    authId: Joi.string().required(),
  },


  updateAuthData:{
    authId: Joi.string().required(),
    username: Joi.string().lowercase({ force: true }).required(),
    
  },


  deleteAUser:{
    authId: Joi.string().required(),
  },
  
  validateUserToken: {
    token: Joi.string().required(),
  },

  
  forgotPassword:{ 
    email: Joi.string().required(),
    password: Joi.string().required(),
  },

 
  updateEmailAddress:{ 
    newEmail: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    authId: Joi.string().required(),
    oldEmail: Joi.string().required(),
  },
  
  matchUsers:{ 
    interest: Joi.string().required(),
    page: Joi.number().required(),
    authId: Joi.string().required(),
   
  },


}