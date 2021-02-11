require('dotenv').config();

const charge = async (req, res, next) => {
    try {
        const stripe = require('stripe')(process.env.API_KEY);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000,
            currency: 'usd',
            payment_method_types: ['card'],
            receipt_email: 'michaelchapa1@gmail.com',
            metadata: {integration_check: 'accept_a_payment'}
            });
    
        res.status(200).json({client_secret: paymentIntent.client_secret});
    } catch(error){
        console.log("API ERROR: ", error);
    }
}

module.exports.charge = charge;