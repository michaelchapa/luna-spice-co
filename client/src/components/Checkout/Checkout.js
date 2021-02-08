import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import ShippingForm from './ShippingForm/ShippingForm'
import { CartContext } from '../CartContext'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, 
         useElements,  
         useStripe, 
         CardElement } from '@stripe/react-stripe-js'
import './Checkout.css'
import axios from 'axios'

function Checkout({ history }) {
    const [cart, setCart, totalPrice, itemCount, cartSummary, 
        sidebar, setSidebar, showSidebar] = useContext(CartContext);

    const [clientSecret, setClientSecret] = useState({});
    
    function goto(step) { 
        if(step === 0){
            history.push('/cart');
        }
    }

    function postRequest(){
        axios.post('/api/v1/charge').then((res) => {
            return res.data;
            
        }).then((responseJson) => {
            const clientSecret = responseJson.client_secret;
            setClientSecret(clientSecret);
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
            <button onClick = {postRequest} value = "Complete Order">postRequest</button>
        </div>
    )
}

export default withRouter(Checkout);