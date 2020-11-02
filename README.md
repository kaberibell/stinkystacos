## Set up Payment Integration

This is a sample app for Stinky's Fish Tacos that sets up a payment intent for $14.00 and submits to Stripe's server. 

To run this app, please ensure you:

1. Have the latest [node.js](https://nodejs.org/en/) installed on your computer.
2. Install the Stripe CLI for your specific OS from [here](https://stripe.com/docs/payments/handling-payment-events#install-cli).

For homebrew, type `brew install stripe/stripe-cli/stripe` in your preferred terminal.

### Getting started
1. Download the github repository. 
2. Unzip and navigate to the folder using your preferred terminal. 
3. Type `stripe listen --forward-to http://localhost:4242/webhook` to enable the Stripe webhook (this enables logging). You should see `> Ready!`
3. Open a new terminal window and type `npm start` to initialize the server.
4. This will launch your default browser, and navigate to `localhost:3000/checkout`. Verify that the credit card interface appears (hit reload if not).
6. In the browser window, enter the following test data to verify the paymentintent is working:

    *Payment without authentication:*

    - Credit card number:`4242 4242 4242 4242`
    - MM/YY: `11/22`
    - CVT: `123`
    - zip: `98103`


    *Payment with 3D Secure authentication:*

    - Credit card number:`4000 0025 0000 3155`
    - MM/YY: `11/22`
    - CVT: `123`
    - zip: `98103`

    *Payment failed:*

    - Credit card number:`4000 0000 0000 9995`
    - MM/YY: `11/22`
    - CVT: `123`
    - zip: `98103`


7. Finally, open `payment_log.txt` to verify that the successful payments have been logged.