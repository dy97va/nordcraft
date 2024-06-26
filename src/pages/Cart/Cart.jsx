import React, { useState, useEffect } from 'react'
import { fs, auth } from '../../config/Config'
import { Footer } from '../../components/Footer/Footer'
import { CheckoutBox } from '../../components/Checkout/CheckoutBox'
import { CartProductList } from '../../components/CartProducts/CartProductList'
import './Cart.css'
import 'react-toastify/dist/ReactToastify.css'

export const Cart = () => {
	const [cartProducts, setCartProducts] = useState([])

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				fs.collection('Cart ' + user.uid).onSnapshot((snapshot) => {
					const newCartProduct = snapshot.docs.map((doc) => ({
						ID: doc.id,
						...doc.data(),
					}))
					setCartProducts(newCartProduct)
				})
			} else {
				console.log('user is not signed in to retrieve cart')
			}
		})
	}, [])

	const qty = cartProducts.map((cartProduct) => {
		return cartProduct.qty
	})

	const reducerOfQty = (accumulator, currentValue) => accumulator + currentValue

	const totalQty = qty.reduce(reducerOfQty, 0)

	const price = cartProducts.map((cartProduct) => {
		return cartProduct.TotalProductPrice
	})

	const reducerOfPrice = (accumulator, currentValue) => accumulator + currentValue

	const totalPrice = price.reduce(reducerOfPrice, 0)

	let Product
	const cartProductIncrease = (cartProduct) => {
		Product = cartProduct
		Product.qty = Product.qty + 1
		Product.TotalProductPrice = Product.qty * Product.price

		auth.onAuthStateChanged((user) => {
			if (user) {
				fs.collection('Cart ' + user.uid)
					.doc(cartProduct.ID)
					.update(Product)
					.then(() => {
						console.log('increment successful')
					})
			} else {
				console.log('You are not logged in')
			}
		})
	}

	const cartProductDecrease = (cartProduct) => {
		Product = cartProduct
		Product.qty = Product.qty - 1
		Product.TotalProductPrice = Product.qty * Product.price

		auth.onAuthStateChanged((user) => {
			if (user) {
				fs.collection('Cart ' + user.uid)
					.doc(cartProduct.ID)
					.update(Product)
					.then(() => {
						console.log('increment successful')
					})
			} else {
				console.log('You are not logged in')
			}
		})
	}

	return (
		<>
			{cartProducts.length > 0 && (
				<div className='cartBox'>
					<div className='cartProductsBox'>
						<CartProductList
							cartProducts={cartProducts}
							cartProductIncrease={cartProductIncrease}
							cartProductDecrease={cartProductDecrease}
						/>
					</div>
					<div className='checkoutBox'>
						<CheckoutBox totalPrice={totalPrice} totalQty={totalQty} cartProducts={cartProducts} />
					</div>
				</div>
			)}

			{cartProducts.length < 1 && <div className='container-fluid'>No Products In Cart Yet</div>}
			<Footer />
		</>
	)
}
