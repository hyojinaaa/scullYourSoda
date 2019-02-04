const FRONTEND_DEV_URLS = ['http://localhost:3000'];

const FRONTEND_PROD_URLS = ['https://www.scullyoursoda.com'];

module.exports = process.env.NODE_ENV === 'dev' ? FRONTEND_DEV_URLS : FRONTEND_PROD_URLS;
