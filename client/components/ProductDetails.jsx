import React from 'react';

const ProductDetails = ({ product }) => {
    return (
        <div>
            <h1>Name : {product.name}</h1>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
        </div>
    );
}

export default ProductDetails;