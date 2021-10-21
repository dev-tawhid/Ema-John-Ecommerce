import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    console.log(props);
    const {name,price,seller,category,stock,key} = props.product;
    return (
        <div className="product-layout">
            <div className="product-img">
                <img src={props.product.img} alt="" />
            </div>
            <div className="product-info">
                <h4><Link to={"/product/"+ key}>{name}</Link></h4>
                <p> Category: {category}</p>
                <p> price:  ${price}</p>
                <p> only {stock} left in stock {seller}</p>
                <p>by: {seller}</p>
               { props.showAddToCart === true && <button onClick={() => props.handleAddProduct(props.product)} className="addToCartBtn"> <FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>}
            </div>
        </div>
    );
};

export default Product;