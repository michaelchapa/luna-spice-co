import React, { useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import ShippingForm from './ShippingForm/ShippingForm'
import { CartContext } from '../CartContext'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, useElements,  
         useStripe, CardElement
        } from '@stripe/react-stripe-js'
import './Checkout.css'
import axios from 'axios';

function Checkout({ history }) {
    // eslint-disable-next-line
    const [cart, setCart, totalPrice, itemCount, cartSummary, 
        sidebar, setSidebar, showSidebar] = useContext(CartContext);

    const stripePromise = loadStripe('pk_test_51IGs5iHicKdfEPCDHlFCfn' + 
                                     'LCgEX6GAd3un1hlgE7XL4EedobIfi5Y' +
                                     'djI0EEAvpPh7yw3rXHT0Zcn3PuFaMNq' +
                                     'P8LT00FhRLgsmL');

    useEffect(() => {
        
    });
    
    function goto(step) { 
        if(step === 0) {
            history.push('/cart');
        }
    }

    const CheckoutForm = () => {
        const stripe = useStripe();
        const elements = useElements();

        const handleSubmit = async event => {
            event.preventDefault();

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card", 
                card: elements.getElement(CardElement)
            });

            if(!error){
                const { id } = paymentMethod;

                try{
                    const { data } = await axios.post("/api/v1/charge", {id, amount: 1099});
                    console.log(data);
                } catch(error) {
                    console.log(error);
                }
            }
        };

        return <form className = "checkoutForm">
                    <CardElement />
                        <button type = "button" disabled = {!stripe}>
                        Pay
                        </button>
                </form>
    }

    return (
        <div>
            <h1>Checkout</h1>
            {cartSummary}
            <button onClick = {showSidebar}>Edit Cart</button>
            <span className = "total-label">Total:</span>
            <span className = "total-number">${totalPrice}</span>
            <ShippingForm />
            <Elements stripe = {stripePromise}>
                <CheckoutForm />
            </Elements>
            
            
            <input type = "submit" value = "Complete Order" />
        </div>
    )
}

export default withRouter(Checkout);