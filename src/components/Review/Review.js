import { faHandMiddleFinger } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import './Review.css'
import successImg from '../../images/giphy.gif'
import { useHistory } from 'react-router';
// import Product from '../Product/Product';


const Review = () => {
    const [cart,setCart] = useState([]);
    const history = useHistory();

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

    const [orderPlace,SetOrderPlace] = useState(false);

    let thankyou;
    if(orderPlace){
        thankyou = <img src={successImg} alt="" />
    }

    const handleProceedCheckout = () => {
        // setCart([]);
        // SetOrderPlace(true);
        // processOrder();
        history.push('/Shipment')
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
                {
                    thankyou
                }
           </div>
           <div className="review-cart">
               <Cart cart={cart} >
                   <button onClick={handleProceedCheckout}>Checkout</button>
               </Cart>
           </div>
        </div>
    );
};

export default Review;