require('dotenv').config();

const charge = (req, res, next) => {
    res.status(200).json({
        head: 'This the head bro',
        body: 'body ody ody ody ody ody ody',
        foot: 'feetz'
    });
}

const chargestripe = async (req, res, next) => {
    const stripe = require('stripe')(process.env.API_KEY);
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: 'usd',
        payment_method_types: ['card'],
        receipt_email: 'michaelchapa1@gmail.com',
    });

    res.status(200).json(paymentIntent);
}

module.exports.charge = charge;
module.exports.chargestripe = chargestripe; 