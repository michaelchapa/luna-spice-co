import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import ShippingForm from './ShippingForm/ShippingForm'
import { CartContext } from '../CartContext'

function Checkout({ history }) {
    // eslint-disable-next-line
    const [cart, setCart, totalPrice, itemCount, cartSummary, 
        sidebar, setSidebar] = useContext(CartContext);

    function goto(step) { 
        if(step === 0) {
            history.push('/cart');
        }
    }

    return (
        <div>
            <h1>Checkout</h1>
            {cartSummary}
            <span className = "total-label">Total:</span>
            <span className = "total-number">${totalPrice}</span>
            <ShippingForm />
            <p>3. Calculate Shipping</p>
            <p>4. Collect Payment Information</p>
            <p>5. SUBMISSION :O</p>
            <button onClick = {() => goto(0)}>Edit Cart</button>
            <input type = "submit" value = "Complete Order" />
        </div>
    )
}

export default withRouter(Checkout);