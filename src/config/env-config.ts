import * as Joi from 'joi';

const envFilePath = `${process.cwd()}/.env.${process.env.NODE_ENV}`;

const validationSchema = Joi.object({
  POSTGRES_USER: Joi.string(),
  POSTGRES_PASSWORD: Joi.string(),
  POSTGRES_DB: Joi.string(),
  DATABASE_URL: Joi.string(),
  JWT_SECRET_KEY: Joi.string(),
  NODE_ENV: Joi.string().valid('dev', 'prod', 'test').default('dev'),
  PORT: Joi.number().default(3000),
});

const forRootObject = {
  envFilePath,
  isGlobal: true,
  validationSchema,
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
};

export { validationSchema, envFilePath, forRootObject };
