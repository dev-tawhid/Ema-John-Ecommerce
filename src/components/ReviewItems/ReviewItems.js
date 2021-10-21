import React from 'react';
import { Link } from 'react-router-dom';
import './ReviewItems.css'

const ReviewItems = (props) => {
    // console.log(props);
    const {name,img,price,quantity,key,seller} = props.product;
    return (
        <div className="reviewitems">
                <div className="product-img">
                    <img src={img} alt="" />
                </div>
            <div className="product-info">
                <h4>{name}</h4>
                <p> price: {price}</p>
                <p>by: {seller}</p>
                <button onClick={() => props.handleRemoveProduct(key)} className="removeItem">Remove item</button>
            </div>
    </div>
        

        
    );
};

export default ReviewItems;


