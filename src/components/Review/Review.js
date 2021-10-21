import { faHandMiddleFinger } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItems from '../ReviewItems/ReviewItems';
// import Product from '../Product/Product';

const Review = () => {
    const [cart,setCart] = useState([]);

    const handleRemoveProduct = (productKey) =>{
        // console.log("remove button clicked");
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

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

    return (
        <div>
          
            {
                cart.map(pd=> <ReviewItems
                     handleRemoveProduct={handleRemoveProduct} 
                      key={pd.key} 
                      product={pd}>
                      </ReviewItems>)
            }
        </div>
    );
};

export default Review;