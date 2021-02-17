require('dotenv').config();

const charge = async (req, res, next) => {
        const stripe = require('stripe')(process.env.API_KEY);
        let paymentIntent = await stripe.paymentIntents.create({
            amount: 1000,
            currency: 'usd',
            payment_method_types: ['card'],
            receipt_email: 'michaelchapa@gmail.com',
            metadata: {integration_check: 'accept_a_payment'}
            });
        
        if(paymentIntent){
            console.log("paymentIntent returned: ");
            console.log(paymentIntent.client_secret);
        }

        res.json({client_secret: paymentIntent.client_secret});
}

module.exports.charge = charge;