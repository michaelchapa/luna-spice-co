import React from 'react';
import photo2 from '../spiceMix2.png';

export const InventoryContext = React.createContext();

export const InventoryProvider = (props) => {
    const [inventory, setInventory] = React.useState([
        {id: 0, name: "Spice Mix A", price: 13.99, image: photo2}, 
        {id: 1, name: "Spice Mix B", price: 10.99, image: photo2}
    ]);

    return(
        <InventoryContext.Provider value = {[inventory, setInventory]}>
            {props.children}
        </InventoryContext.Provider>
    );
}