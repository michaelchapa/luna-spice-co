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

    const [response, setResponse] = useState({});
    
    function goto(step) { 
        if(step === 0){
            history.push('/cart');
        }
    }

    function getRequest(){
        axios.get('/api/v1/charge').then((res) => {
            const resp = res.data;
            setResponse(resp);
            console.log(response);
        });
    }

    function postRequest(){
        axios.post('/api/v1/chargestripe').then((res) => {
            const resp = res.body;
            setResponse(resp);
            console.log(response);
        });
    }

    return (
        <div>
            <h1>Checkout</h1>
            {cartSummary}
            <ShippingForm />
            <button onClick = {showSidebar}>Edit Cart</button>
            <span className = "total-label">Total:</span>
            <span className = "total-number">${totalPrice}</span>
            <button onClick = {getRequest} value = "Complete Order">getRequest</button>
            <button onClick = {postRequest} value = "Complete Order">postRequest</button>
        </div>
    )
}

export default withRouter(Checkout);