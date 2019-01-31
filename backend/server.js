const cors = require('cors');
const bodyParser = require('body-parser');

const CORS_WHITELIST = require('./constants/frontend');

const corsOptions = {
  origin: (origin, callback) =>
    CORS_WHITELIST.indexOf(origin) !== -1
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS')),
};

const configureServer = app => {
  app.use(cors(corsOptions));
  console.log('configure server');
  app.use(bodyParser.json());
};

module.exports = configureServer;

// const app = require('express')();
// const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);
// const dotenv = require('dotenv');

// const env = app.get('env');
// const config = dotenv.config({
//   path: env === 'development' ? '.env.local' : '',
// });
// const parsedConfig = config.parsed;

// app.use(require('body-parser').text());
// app.listen(5000, error => {
//   if (error) throw error;
//   console.log(`Server running on port: ${parsedConfig.REACT_APP_SERVER_URL}`);
// });

// app.post('/charge', async (req, res) => {
//   try {
//     let { status } = await stripe.charges.create({
//       amount: 2000,
//       currency: 'usd',
//       description: 'An example charge',
//       source: req.body,
//     });

//     const result = res.json({ status });
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//     res.status(500).end();
//   }
// });
