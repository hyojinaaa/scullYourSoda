const configureStripe = require('stripe');
const localConfig = require('../config.local.json');
const prodConfig = require('../config.prod.json');

const STRIPE_SECRET_KEY =
  process.env.NODE_ENV === 'dev' ? localConfig.REACT_APP_STRIPE_SECRET_KEY : prodConfig.REACT_APP_STRIPE_SECRET_KEY;

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
