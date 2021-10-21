import React, { useState } from 'react';
import './Shop.css'
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import DisplayCartItems from '../DisplayCartItem/DisplayCartItems';
import { library } from '@fortawesome/fontawesome-svg-core';
import { addToDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    // console.log(fakeData);
    const first10 = fakeData.slice(0,10);
    const [products,setProducts] = useState(first10);
    const [cart,setCart] = useState([]);
    // console.log(cart);
    const handleAddProduct = (pd) => {
        const newCart = [...cart,pd];
        setCart(newCart);
        const sameProduct = newCart.filter(pd=> pd.key === pd.key )
        // console.log(count);
        const count = sameProduct.length;
        addToDatabaseCart(pd.key, count )
        
    }

    //  const cartData = cart.map(cartItem => cartItem)
    //  console.log(cart);
     

    return (
        <div className="shop-container">
            <div className="product-container">
                    {
                       products.map(product =>  <Product
                         showAddToCart={true} 
                         key={product.key} handleAddProduct={handleAddProduct} 
                         product={product}  >
                         </Product> )
                    }       
            </div>
            <div className="cart-container">
                <h3>Your selected products list</h3>
                {
                    cart.map(element =>  <DisplayCartItems data={element} ></DisplayCartItems> )
                }
                 <Cart cart={cart}></Cart>  
            </div>
        </div>
    );
};

export default Shop;