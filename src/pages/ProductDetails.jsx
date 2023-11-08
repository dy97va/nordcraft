import React, { useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import '../styles/ProductDetails.css'
import { GetUserUid } from '../services/AuthServices'
import { addToCart } from '../services/ProductServices'
import { useParams, useLocation } from 'react-router-dom'
import { fs } from '../config/Config'

export const ProductDetails = (props) => {
	const { individualProduct } = props.location || {}
	console.log(props.location)
	const productID = useParams()
	console.log(productID)
	const location = useLocation()
	console.log(location)
	const uid = GetUserUid()
	const [addToCartButton, setAddToCartButton] = useState('Add To Cart')

	const [productData, setProductData] = useState(null)
	useEffect(() => {
		const productRef = db.collection('products').doc(productID)

		productRef.get().then((doc) => {
			if (doc.exists) {
				setProductData(doc.data())
			} else {
				// Handle the case when the product doesn't exist in Firestore
			}
		})
	}, [productID])

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
