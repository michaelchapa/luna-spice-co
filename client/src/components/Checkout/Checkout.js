import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { CartContext } from '../CartContext'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import ShippingForm from './ShippingForm/ShippingForm'
import CardSection from './CardSection/CardSection'
import axios from 'axios'
import './Checkout.css'

function Checkout({ history }) {
    // eslint-disable-next-line
    const [cart, setCart, totalPrice, itemCount, cartSummary, sidebar, setSidebar, showSidebar] = useContext(CartContext);
    const [clientSecret, setClientSecret] = useState({});

    const stripe = useStripe();
    const elements = useElements();

    function handleSubmit(){
        axios.post('/api/v1/charge').then((res) => {
            return res.data;
            
        }).then((responseJson) => {
            const secret = responseJson.client_secret;
            setClientSecret(secret);
        }).then(() => {
            console.log(clientSecret);
        });

        // Call stripe.confirmCardPayment() with the client secret.
    }

    return (
        <div>
            <h1>Checkout</h1>
            {cartSummary}
            <ShippingForm />
            <button onClick = {showSidebar}>Edit Cart</button>
            <span className = "total-label">Total:</span>
            <span className = "total-number">${totalPrice}</span>
            <button onClick = {handleSubmit} value = "Complete Order">postRequest</button>
        </div>
    )
}

export default withRouter(Checkout);