import React from 'react';
import './DisplayCartItem.css';

const DisplayCartItems = (props) => {
    console.log(props);
   
    return (
        <div className="displayCartItems">
            <div className="displayImg">
                <img src={props.data.img} alt="" />
            </div>
            <div className="displayImg">
                <h6>{props.data.name}</h6>
            </div>
        </div>
    );
};

export default DisplayCartItems;