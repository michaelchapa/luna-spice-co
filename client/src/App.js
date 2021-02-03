import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { CartProvider } from './components/CartContext'
import { InventoryProvider } from './components/InventoryContext'
import Navigation from './components/Navigation/Navigation'
import Homepage from './components/Homepage/Homepage'
import Checkout from './components/Checkout/Checkout'
import About from './components/About/About'
import './App.css'

function App(){
  return (
    <div className="App">
      <InventoryProvider>
      <CartProvider>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path = "/" component = {Homepage} />
          <Route exact path = "/checkout" component = {Checkout} />
          <Route exact path = "/about" component = {About} />
        </Switch>
      </Router>
      </CartProvider>
      </InventoryProvider>
    </div>
  );
}

export default App;