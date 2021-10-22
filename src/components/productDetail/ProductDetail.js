import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    
    const {productKey} = useParams()
    const product = fakeData.find(pd => pd.key === productKey )
  

    return (
        <div>
            <h2>{productKey} details </h2>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;