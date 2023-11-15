import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import '../styles/ProductDetails.css'
import { GetUserUid } from '../services/AuthServices'
import { addToCart } from '../services/ProductServices'
import ImageViewer from 'react-simple-image-viewer'
import { getProduct } from '../services/ProductServices'

export const ProductDetails = () => {
	const uid = GetUserUid()
	const [addToCartButton, setAddToCartButton] = useState('Add To Cart')
	const [currentImage, setCurrentImage] = useState(0)
	const [isViewerOpen, setIsViewerOpen] = useState(false)

	const { productId } = useParams()
	const [individualProduct, setIndividualProduct] = useState(null)

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const productData = await getProduct(productId)
				setIndividualProduct(productData)
			} catch (error) {
				console.error('Error fetching product:', error)
			}
		}

		fetchProduct()
	}, [productId])

	const handleAddToCart = () => {
		console.log('addded to cart successfuly')
		addToCart(uid, individualProduct)
		setAddToCartButton('Added To Cart')
	}

	const openImageViewer = useCallback((index) => {
		setCurrentImage(index)
		setIsViewerOpen(true)
	}, [])

	const closeImageViewer = () => {
		setCurrentImage(0)
		setIsViewerOpen(false)
	}

	return (
		<div>
			<Navbar />
			{!individualProduct ? (
				<div>Loading...</div>
			) : (
				<div className='productDetailsBox'>
					<div className='detailsImage'>
						{individualProduct.images.map((image, index) => (
							<img key={index} src={image} alt={`Product Image ${index}`} onClick={() => openImageViewer(index)} />
						))}
						{isViewerOpen && (
							<ImageViewer
								src={individualProduct.images}
								currentIndex={currentImage}
								disableScroll={false}
								closeOnClickOutside={true}
								onClose={closeImageViewer}
							/>
						)}
					</div>

					<div className='productInfo'>
						<div className='detailsTitle'>{individualProduct.title}</div>
						<div className='detailsPrice'> Price: € {individualProduct.price}</div>
						<div className='detailsDescription'>{individualProduct.description}</div>
						<div className='detailsCardButton' onClick={handleAddToCart}>
							{addToCartButton}
						</div>
					</div>
				</div>
			)}

			<Footer />
		</div>
	)
}
