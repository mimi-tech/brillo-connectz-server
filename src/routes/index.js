const { Router } = require("express");
const authRoutes = require("./auth");


const { response } = require("../helpers");

const routes = Router();

routes.use("", authRoutes);


routes.use((_, res) => {
  response(res, { status: false, message: "Route not found" }, 404);
});

module.exports = routes;
