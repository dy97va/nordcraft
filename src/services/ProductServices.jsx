import { useState } from 'react'
import { fs } from '../config/Config'

export const getProducts = async () => {
	try {
		const productsSnapshot = await fs.collection('Products').get()
		const productsArray = []

		productsSnapshot.forEach((doc) => {
			const data = doc.data()
			data.ID = doc.id
			productsArray.push(data)
		})

		return productsArray
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

export const getProduct = async (productID) => {
	const productSnapshot = await fs.collection('Products').doc(productID).get()
	if (productSnapshot.exists) {
		return productSnapshot.data()
	} else {
		return null
	}
}

let Product
export const addToCart = (uid, product) => {
	Product = product
	Product['qty'] = 1
	Product['TotalProductPrice'] = Product.qty * Product.price
	fs.collection('Cart ' + uid)
		.doc(product.ID)
		.set(Product)
		.then(() => {
			console.log('successfully added to cart')
		})
}
