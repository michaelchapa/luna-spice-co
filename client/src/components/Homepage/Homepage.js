import React, { useContext } from 'react'
import { CartContext } from '../CartContext'
import { InventoryContext } from '../InventoryContext'
import styles from './Homepage.module.css'

export default function Homepage() {
    // eslint-disable-next-line
    const [cart, setCart, totalPrice, itemCount, cartSummary, sidebar, setSidebar, showSidebar] = useContext(CartContext);
    const [inventory] = useContext(InventoryContext);

    function handleAddToCart(e) {
        e.preventDefault();
        showSidebar();

        let updatedCart = [];
        let inCart = false;

        for(const item of cart){
            if(item.id === e.target.value){
                item.quantity = item.quantity + 1;
                updatedCart.push(item);
                inCart = true;
            } else {
                updatedCart.push(item);
            }
        }

        if(inCart){
            setCart(updatedCart);
        } else{
            let productToAdd = inventory[e.target.value];
            productToAdd.quantity = 1;
            setCart([...cart, productToAdd]);
        }
    }

    return (
        <>
        <h1>Luna Spice Co.</h1>
        <div>
            <img className = {styles.productImage} src = {inventory[0].image} 
                 alt = {inventory[0].name} />
            <span id = {styles.product1Header}>{inventory[0].name}</span>
            <span id = {styles.product1} className = {styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Morbi condimentum posuere nulla, vel viverra enim accumsan a. 
                Etiam auctor accumsan malesuada. Integer sagittis porttitor arcu sed finibus. 
                Sed eget purus nec lorem elementum luctus id non risus. 
                Sed tellus nisi, fringilla a fermentum et, rutrum et diam. 
            </span>
            <button id = {styles.addToCartButton} value = {inventory[0].id}
               onClick = {handleAddToCart} href = "#" >Add to Cart</button>
        </div>
        <div>
            <img className = {styles.productImage} src = {inventory[1].image}
                alt = {inventory[1].name} />
            <span id = {styles.product2Header}>{inventory[1].name}</span>
            <span id = {styles.product2} className = {styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Morbi condimentum posuere nulla, vel viverra enim accumsan a. 
                Etiam auctor accumsan malesuada. Integer sagittis porttitor arcu sed finibus. 
                Sed eget purus nec lorem elementum luctus id non risus. 
                Sed tellus nisi, fringilla a fermentum et, rutrum et diam. 
            </span>
            <button id = {styles.addToCartButton} onClick = {handleAddToCart} 
                    value = {inventory[1].id} href = "#">Add to Cart</button>
        </div>
        </>
    );
}