import React, { useState, useCallback, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import '../styles/ProductDetails.css'
import { GetUserUid } from '../services/AuthServices'
import { addToCart } from '../services/ProductServices'
import ImageViewer from 'react-simple-image-viewer'
import { getProduct } from '../services/ProductServices'
import { useParams } from 'react-router-dom'

export const Details = (props, { productID }) => {
	// const { individualProduct } = props.location.state || {}
	const uid = GetUserUid()
	const [product, setProduct] = useState(null)

	const { id } = useParams()

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const productData = await getProduct(id)
				setProduct(productData)
			} catch (error) {
				console.error('Error fetching product:', error)
			}
		}

		fetchProduct()
	}, [productID])

	// console.log(individualProduct)
	console.log(product)

	return (
		<div>
			<Navbar />
			{/* <div>{individualProduct.title}</div> */}
			<div>{product.description}</div>
			<Footer />
		</div>
	)
}
