import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import './CheckoutBox.css'

const stripePromise = loadStripe(
	'pk_test_51NzwJ2BnKw4OH10vID5msODJfsZqr3pknRjxxjskmGreSeifsmOx369DZmj1yYrYNAWz11HH3wKJAg3J5yKgEpxh00WE4EOkc0'
)

export const CheckoutBox = ({ totalPrice, totalQty, cartProducts }) => {
	return (
		<>
			<div className='summary-box'>
				<h5>Cart Summary</h5>
				<div className='summaryBody'>
					<div className='leftSide'>
						<div>
							Total Products: <span>{totalQty}</span>
						</div>
						<div>
							Total Price: <span>€ {totalPrice}</span>
						</div>
					</div>
					<div className='rightSide'>
						<Elements stripe={stripePromise}>
							<CheckoutForm totalPrice={totalPrice} cartProducts={cartProducts} />
						</Elements>
					</div>
				</div>
			</div>
		</>
	)
}
