const configureStripe = require('stripe');

const STRIPE_SECRET_KEY =
  process.env.NODE_ENV === 'production'
    ? 'sk_live_ClTfRUlUnyeVnQ0iUEcL6zMg'
    : 'sk_test_zWEqmt9IgNsAVge3u0hE31LP';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
