import React, {useState} from 'react'
import '../styles/ProductCard.css'
import { Link } from 'react-router-dom'

export const IndividualProduct = ({individualProduct, addToCart}) => {
    
    const [addToCartButton, setAddToCartButton] = useState('Add To Cart');

    const handleAddToCart=()=>{
        addToCart(individualProduct);
        setAddToCartButton('Added To Cart');
    }
    
    
    
    return (
        <div className='productCard'>
            <Link to={{
                pathname: `/product/${individualProduct.ID}`,
                state: { individualProduct } 
            }}
                key={individualProduct.ID}
            >
            <div className='productImg'>
                <img src={individualProduct.images[0]} alt="product-img"/>
            </div>
            <div className='productTitle'>{individualProduct.title}</div>
            <div className='productPrice'> € {individualProduct.price}</div>
            </Link>
            <div className='productCardButton' onClick={handleAddToCart}>{addToCartButton}</div>
        </div> 
    )
}