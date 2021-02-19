import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { CartContext } from '../CartContext'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import ShippingForm from './ShippingForm/ShippingForm'
import CardSection from './CardSection/CardSection'
import useSWR from 'swr'
import axios from 'axios'
import './Checkout.css'

function Checkout({ history }) {
    // eslint-disable-next-line
    const [cart, setCart, totalPrice, itemCount, cartSummary, sidebar, setSidebar, showSidebar] = useContext(CartContext);
    const fetcher = url => axios.post(url).then(res => res.data);
    let { data, error } = useSWR('/api/v1/charge', fetcher, {
                                                         revalidateOnFocus: false,
                                                         revalidateOnMount: false
                                                        });
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault(); // prevents page refresh

        if (!stripe || !elements){
            return;
        }

        data = await fetcher('/api/v1/charge');
        const clientSecret = data.client_secret;
        
        if(error){
            console.log("Fetch Error: ", error);
            return
        }

        // Call stripe.confirmCardPayment() with the client secret.
        let result = await stripe.confirmCardPayment(`${clientSecret}`, {
            payment_method: {
                card: elements.getElement(CardElement), 
                billing_details: {
                    name: 'Jenny Rosen',
                },
            }
        });

        if(result.error){
            // Show error to customer (e.g., insufficient funds)
            console.log(result.error.message);
        } else {
            // Payment has been processed :)
            if(result.paymentIntent.status === 'succeeded'){
                // Show a success message to your customer
                console.log(result.paymentIntent)
                console.log(result.paymentIntent.status);
                // There's a risk of the customer closing the window before the callback
                // execution. Set up a webhook or plugin to listen for the 
                // payment_intent.succeeded event that hanndles any business critical
                // post-payment actions.
            }
        }
    };

    return (
        <div>
            <h1>Checkout</h1>
            <button onClick = {showSidebar}>Edit Cart</button>
            {cartSummary}
            <ShippingForm />
            <form onSubmit = {handleSubmit}>
                <CardSection />
                <button disabled = {!stripe}>Confirm order</button>
            </form>
            <span className = "total-number">Total: ${totalPrice}</span>
            <button onClick = {handleSubmit} value = "Complete Order">postRequest</button>
        </div>
    )
}

export default withRouter(Checkout);