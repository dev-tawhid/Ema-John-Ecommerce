import { faHandMiddleFinger } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import './Review.css'
// import Product from '../Product/Product';

const Review = () => {
    const [cart,setCart] = useState([]);

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        // console.log(productKey);

        const cartProducts = productKey.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        })
        setCart(cartProducts);
    },[]);

    const handleRemoveProduct = (productKey) =>{
        // console.log("remove button clicked");
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    return (
        <div className="review-container">
           <div className="review-product-container">
            {
                    cart.map(pd=> <ReviewItems
                        handleRemoveProduct={handleRemoveProduct} 
                        key={pd.key} 
                        product={pd}>
                        </ReviewItems>)
                }
           </div>
           <div className="review-cart">
               <Cart cart={cart} ></Cart>
           </div>
        </div>
    );
};

export default Review;