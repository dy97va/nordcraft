import React from 'react'
import { IndividualCartProduct } from './IndividualCartProduct'

export const CartProductList = ({ cartProducts, cartProductIncrease, cartProductDecrease }) => {
	return cartProducts.map((cartProduct) => (
		<IndividualCartProduct
			key={cartProduct.ID}
			cartProduct={cartProduct}
			cartProductIncrease={cartProductIncrease}
			cartProductDecrease={cartProductDecrease}
		/>
	))
}
