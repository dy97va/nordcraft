import React from 'react'
import '../styles/ProductCard.css'
import { Link } from 'react-router-dom'

export const IndividualProduct = ({individualProduct, addToCart}) => {
    const handleAddToCart=()=>{
        addToCart(individualProduct);
    }
    
    return (
        <div className='productCard'>
            <Link
      to={{
        pathname: `/product/${individualProduct.ID}`,
        state: { individualProduct } 
      }}
      key={individualProduct.ID}
    >
            <div className='productImg'>
                <img src={individualProduct.url} alt="product-img"/>
            </div>
            <div className='productTitle'>{individualProduct.title}</div>
            <div className='productPrice'> € {individualProduct.price}</div>
            </Link>
            <div className='productCardButton' onClick={handleAddToCart}>ADD TO CART</div>
        </div> 
    )
}