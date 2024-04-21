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

export const getOrders = async () => {
	try {
		const orderSnapshot = await fs.collection('Orders').get()
		const ordersArray = []

		orderSnapshot.forEach((doc) => {
			const data = doc.data()
			data.ID = doc.id
			ordersArray.push(data)
		})

		return ordersArray
	} catch (error) {
		console.error('error fetching orders', error)
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

export const addToCart = (uid, product) => {
	const updatedProduct = { ...product }
	updatedProduct['qty'] = 1
	updatedProduct['TotalProductPrice'] = updatedProduct.qty * updatedProduct.price
	fs.collection('Cart ' + uid)
		.doc(product.ID)
		.set(updatedProduct)
		.then(() => {
			console.log('successfully added to cart')
		})
}
