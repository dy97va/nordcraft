import React, { useState, useEffect } from 'react'
import { ProductList } from '../../components/Products/ProductList'
import { GetUserUid } from '../../services/AuthServices'
import { addToCart, getProducts } from '../../services/ProductServices'
import './Products.css'
import { Footer } from '../../components/Footer/Footer'

export const Products = () => {
	const uid = GetUserUid()
	const [products, setProducts] = useState([])

	useEffect(() => {
		getProducts().then((products) => {
			setProducts(products)
		})
	}, [])

	const handleAddToCart = (product) => {
		if (uid !== null) {
			addToCart(uid, product)
		} else {
			console.log('login required')
		}
	}

	return (
		<>
			{products.length > 0 && (
				<div className='productContainer'>
					<div className='productsBoxWrapper'>
						<div className='productsBox'>
							<ProductList products={products} addToCart={handleAddToCart} />
						</div>
					</div>
				</div>
			)}
			{products.length < 1 && <div>Please wait....</div>}
			<Footer />
		</>
	)
}
