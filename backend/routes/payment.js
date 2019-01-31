const stripe = require('../constants/stripe');

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    console.log('there is a stripe error', stripeErr);
    res.status(500).send({ error: stripeErr });
  } else {
    console.log('success');
    res.status(200).send({ success: stripeRes });
  }
};

const paymentApi = app => {
  console.log('paymentApi');
  app.get('/', (req, res) => {
    res.send({
      message: 'Hello Stripe checkout server!',
      timestamp: new Date().toISOString(),
    });
  });

  app.post('/', (req, res) => {
    stripe.charges.create(req.body, postStripeCharge(res));
  });

  return app;
};

module.exports = paymentApi;
