const baseUrl = process.env.BASE_URL || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);
const isDevEnv = process.env.APP_DEV_ENVIRONMENT === 'true' ? true : false;

export default {
  baseUrl,
  port,
  isDevEnv,
};
