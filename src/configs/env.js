const Joi = require("joi");

require("dotenv").config();

const schema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "test", "provision")
    .default("development"),
  PORT: Joi.number().required(),
  DB_ENABLE_SSL:Joi.string().required(),
  DATABASE: Joi.string().required().description("Database connection URL"),
  SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
})
  .unknown()
  .required();

const { error, value: env } = schema.validate(process.env);

if (error) {
  console.error(`Config validation error: ${error.message}`);
  return;
}

const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  sessionSecret: env.SESSION_SECRET,
  dbURL: env.DATABASE_URL,
};

module.exports = config;
