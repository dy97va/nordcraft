import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/IndividualCartProduct.css'
import Icon from 'react-icons-kit'
import { plus } from 'react-icons-kit/feather/plus'
import { minus } from 'react-icons-kit/feather/minus'
import { auth, fs } from '../config/Config'
import { trash2 } from 'react-icons-kit/feather/trash2'

export const IndividualCartProduct = ({ cartProduct, cartProductIncrease, cartProductDecrease }) => {
	const handleCartProductIncrease = () => {
		cartProductIncrease(cartProduct)
	}

	const handleCartProductDecrease = () => {
		cartProductDecrease(cartProduct)
	}

	const handleDeleteProduct = () => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				fs.collection('Cart ' + user.uid)
					.doc(cartProduct.ID)
					.delete()
					.then(() => {
						console.log('delete successful')
					})
			} else {
				console.log('delete unsuccesful, login first')
			}
		})
	}

	return (
		<div className='catrProductCard'>
			<div className='cartProductImg'>
				<Link to={{ pathname: `/product/${cartProduct.ID}` }}>
					<img src={cartProduct.images[0]} alt='product-img' />{' '}
				</Link>
			</div>

			<div className='cartProductInfoBox'>
				<div className='cartProductInfoRow1'>
					<div className='cartProductTitle'>{cartProduct.title}</div>
					<div className='cartDeleteButton' onClick={handleDeleteProduct}>
						<Icon icon={trash2} size={30} />
					</div>
				</div>
				<div className='cartProductInfoRow2'>
					<div className='cartProductPrice'>Price: € {cartProduct.price}</div>
					<div className='quantityBox'>
						<div className='cartProductQantityController'>
							<div className='minusButton' onClick={handleCartProductDecrease}>
								{/* <Icon icon={minus} size={20} /> */} -
							</div>
							<div>{cartProduct.qty}</div>
							<div className='plusButton' onClick={handleCartProductIncrease}>
								{/* <Icon icon={plus} size={20} /> */} +
							</div>
						</div>
						<div className='cartProductTotalPrice'> Total: € {cartProduct.TotalProductPrice}</div>
					</div>
				</div>
			</div>
		</div>
	)
}
