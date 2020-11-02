const express = require("express");
const app = express();
var bodyParser = require('body-parser')
var fs = require('file-system');
const { resolve } = require("path");
// This is your real test secret API key.
const stripe = require("stripe")('sk_test_51Hj5wrC0Cc2pCXXBTAnbY26gXx5ym1qe6Kcf9e4BKdKlzRSxIv1k9TjazaTahE9mq6fSE8GdRKTVFLOL3CiUEroT00w2gpgb5g');


app.use(express.static("."));
app.use(express.json());

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {

  let event = request.body;

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      var stream = fs.createWriteStream("payment_log.txt", {flags:'a'});
      stream.write(JSON.stringify(paymentIntent));
      stream.write("\n");
      stream.end();
      console.log('PaymentIntent was successful!')
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!')
      break;
    // ... handle other event types
    default:
      // Unexpected event type
      return response.status(400).end();
  }

  // Return a 200 response to acknowledge receipt of the event
  response.json({received: true});
});


app.listen(4242, () => console.log('Node server listening on port 4242!'));
