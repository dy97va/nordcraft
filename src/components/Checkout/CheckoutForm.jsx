import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'

toast.configure()

const CheckoutForm = ({ totalPrice, cartProducts }) => {
	const handleCheckout = async () => {
		console.log('Handling checkout...')
		try {
			const stripe = await loadStripe(
				'pk_test_51NzwJ2BnKw4OH10vID5msODJfsZqr3pknRjxxjskmGreSeifsmOx369DZmj1yYrYNAWz11HH3wKJAg3J5yKgEpxh00WE4EOkc0'
			)

			const response = await axios.post('http://localhost:8080/create-checkout-session', {
				cart: { totalPrice, cartProducts },
			})

			const { sessionId } = response.data
			console.log('Received sessionId:', sessionId)

			const { error } = await stripe.redirectToCheckout({
				sessionId,
			})

			if (error) {
				console.error('Error redirecting to checkout:', error)
				toast.error('Error redirecting to checkout. Please try again.')
			}
		} catch (error) {
			console.error('Error during checkout:', error)
			toast.error('Error creating checkout session. Please try again.')
		}
	}

	return (
		<div>
			<button className='checkoutButton' onClick={handleCheckout}>
				Checkout
			</button>
		</div>
	)
}

export default CheckoutForm
