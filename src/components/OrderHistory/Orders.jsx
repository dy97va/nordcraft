import React, { useState, useEffect } from 'react'
import { fs, auth } from '../../config/Config'
import { getProduct } from '../../services/ProductServices'
import './Order.css'

export const OrderHistory = () => {
	const [orders, setOrders] = useState([])
	const [prod, setProd] = useState([])

	useEffect(() => {
		const fetchOrderHistory = async () => {
			auth.onAuthStateChanged(async (user) => {
				if (user) {
					try {
						const querySnapshot = await fs.collection('Orders').where('userId', '==', user.uid).get()

						const userOrders = []
						querySnapshot.forEach((doc) => {
							const orderData = {
								orderId: doc.id,
								timestamp: doc.data().timestamp.toDate(),
								products: doc.data().products,
							}
							userOrders.push(orderData)
						})

						setOrders(userOrders)

						const productPromises = userOrders.map((order) =>
							Promise.all(order.products.map((product) => getProduct(product.productId)))
						)
						const productResults = await Promise.all(productPromises)
						setProd(productResults)
					} catch (error) {
						console.error('Error fetching order history:', error)
					}
				}
			})
		}

		fetchOrderHistory()
	}, [])

	return (
		<div>
			{/* <h2>Order History</h2> */}
			<div className='ordersBox'>
				{orders.map((order, orderIndex) => (
					<div className='orderBox' key={order.orderId}>
						<div className='orderId'>order number: {order.orderId}</div>
						<div className='orderDate'>Time: {order.timestamp.toDateString()}</div>
						<div className='orderProductsBox'>
							{order.products.map((product, productIndex) => (
								<div className='orderProductBox' key={product.productId}>
									{prod[orderIndex] && prod[orderIndex][productIndex] && (
										<div className='orderProductTitle'>Product: {prod[orderIndex][productIndex].title}</div>
									)}
									{prod[orderIndex] && prod[orderIndex][productIndex] && (
										<div className='orderProductPrice'>Product price: {prod[orderIndex][productIndex].price}</div>
									)}
									{prod[orderIndex] && prod[orderIndex][productIndex] && (
										<div className='orderProductImage'>
											<img src={prod[orderIndex][productIndex].images[0]} alt='' />
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
