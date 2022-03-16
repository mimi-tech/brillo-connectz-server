const { auth } = require("../services");
const { response } = require("../helpers");



const welcomeText = async (req, res) => {
    const data = await auth.welcomeText(req.form);
    return response(res, data);
  };

  const userRegistration = async (req, res) => {
    const data = await auth.userRegistration(req.form);
    return response(res, data);
  };

  const generalLogin = async (req, res) => {
    const data = await auth.generalLogin(req.form);
    return response(res, data);
  };

  
  const validateUserToken = async (req, res) => {
    const data = await auth.validateUserToken(req.form);
    return response(res, data);
  };


  const getAUser = async (req, res) => {
    const data = await auth.getAUser(req.form);
    return response(res, data);
  };

  const updateAuthData = async (req, res) => {
    const data = await auth.updateAuthData(req.form);
    return response(res, data);
  };

 

  const deleteAUser = async (req, res) => {
    const data = await auth.deleteAUser(req.form);
    return response(res, data);
  };

  
  const forgotPassword = async (req, res) => {
    const data = await auth.forgotPassword(req.form);
    return response(res, data);
  };

  const updateEmailAddress = async (req, res) => {
    const data = await auth.updateEmailAddress(req.form);
    return response(res, data);
  };

  const matchUsers = async (req, res) => {
    const data = await auth.matchUsers(req.form);
    return response(res, data);
  };

  const validateAuthCodes = async (req, res) => {
    const data = await auth.validateAuthCodes(req.form);
    return response(res, data);
  };
  
 



  

  module.exports = {
    welcomeText,
    generalLogin,
    validateUserToken,
    userRegistration,
    getAUser,
    updateAuthData,
    deleteAUser,
    forgotPassword,
    updateEmailAddress,
    matchUsers,
    validateAuthCodes
  }