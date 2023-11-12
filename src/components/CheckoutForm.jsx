import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth, fs } from '../config/Config'

toast.configure()

export const CheckoutForm = ({ totalPrice, cartProducts }) => {
	const history = useHistory()

	const handleToken = async (token) => {
		const cart = { name: 'All Products', totalPrice }
		const response = await axios.post('http://localhost:8080/checkout', {
			token,
			cart,
		})

		let { status } = response.data

		if (status === 'success') {
			history.push('/')
			toast.success('Your order has been placed successfully', {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			})

			const uid = auth.currentUser.uid
			const carts = await fs.collection('Cart ' + uid).get()
			for (var snap of carts.docs) {
				fs.collection('Cart ' + uid)
					.doc(snap.id)
					.delete()
			}
		} else {
			alert('Something went wrong in checkout')
		}
	}

	return (
		<StripeCheckout
			stripeKey='pk_test_51NzwJ2BnKw4OH10vID5msODJfsZqr3pknRjxxjskmGreSeifsmOx369DZmj1yYrYNAWz11HH3wKJAg3J5yKgEpxh00WE4EOkc0'
			token={handleToken}
			billingAddress
			shippingAddress
			name='All Products'
			amount={totalPrice * 100}></StripeCheckout>
	)
}
