import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import '../styles/ProductDetails.css'
import { GetUserUid } from '../services/AuthServices'
import { addToCart } from '../services/ProductServices'

export const ProductDetails = (props) => {
	const { individualProduct } = props.location.state || {}
	const uid = GetUserUid()
	const [addToCartButton, setAddToCartButton] = useState('Add To Cart')

	const handleAddToCart = () => {
		console.log('addded to cart successfuly')
		addToCart(uid, individualProduct)
		setAddToCartButton('Added To Cart')
	}

	return (
		<div>
			<Navbar />
			{!individualProduct ? (
				<div>Loading...</div>
			) : (
				<div className='productDetailsBox'>
					<div className='productImage'>
						{individualProduct.images.map((image, index) => (
							<img key={index} src={image} alt={`Product Image ${index}`} />
						))}
					</div>
					<div className='productInfo'>
						<div className='productTitle'>{individualProduct.title}</div>
						<div className='productPrice'> Price: € {individualProduct.price}</div>
						<div className='productDescription'>{individualProduct.description}</div>
						<div className='productCardButton' onClick={handleAddToCart}>
							{addToCartButton}
						</div>
					</div>
				</div>
			)}

			<Footer />
		</div>
	)
}
