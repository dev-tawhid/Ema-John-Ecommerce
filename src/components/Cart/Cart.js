import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total, prd) => total + prd.price,0)
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const  product = cart[i];
        total = total + product.price * product.quantity;
    }
    let shipping = 0;
    if (total > 35) {
        shipping = 0;
        
    }else if(total > 15){
        shipping = 5;
    }else if(total > 0){
        shipping = 10;
    }
    
    let tex = (total/10).toFixed(2);
    const grandTotal = (total + shipping + Number(tex)).toFixed(2);
    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h2>Total items :{cart.length}</h2>
            <p>Product Price:${formatNumber(total)}</p>
            <p>Shipping Cost:${shipping}</p>
            <p>Tax+ Vat :${tex}</p>
            <p>Total Price: ${grandTotal}</p>
            {
                props.children
            }
            
        </div>
        
    );
};

export default Cart;