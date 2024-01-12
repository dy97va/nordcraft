import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './ProductCard.css'

export const IndividualProduct = ({ individualProduct, addToCart }) => {
	const [addToCartButton, setAddToCartButton] = useState('Add To Cart')

	const handleAddToCart = () => {
		addToCart(individualProduct)
		setAddToCartButton('Added To Cart')
	}

	return (
		<div className='productCard individualCards'>
			<Link
				to={{
					pathname: `/product/${individualProduct.ID}`,
					state: { individualProduct },
				}}
				key={individualProduct.ID}>
				<div className='productImg'>
					<img src={individualProduct.images[0]} alt='product-img' />
				</div>
				<div className='productTitle'>{individualProduct.title}</div>
			</Link>
			<div className='productCardRight'>
				<div className='productPrice'> € {individualProduct.price}</div>
				<div className='productCardButton' onClick={handleAddToCart}>
					{addToCartButton}
				</div>
			</div>
		</div>
	)
}
