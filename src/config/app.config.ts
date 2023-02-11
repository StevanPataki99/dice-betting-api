const baseUrl = process.env.BASE_URL || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

export default {
  baseUrl,
  port,
};
