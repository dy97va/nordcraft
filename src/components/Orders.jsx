import React, { useState, useEffect } from 'react'
import { fs, auth } from '../config/Config'

export const OrderHistory = () => {
	const [orders, setOrders] = useState([])

	useEffect(() => {
		const fetchOrderHistory = async () => {
			auth.onAuthStateChanged(async (user) => {
				if (user) {
					try {
						// Query the 'Orders' collection for orders by the user
						const querySnapshot = await fs.collection('Orders').where('userId', '==', user.uid).get()

						const userOrders = []
						querySnapshot.forEach((doc) => {
							// Include other order details as needed
							const orderData = {
								orderId: doc.id,
								timestamp: doc.data().timestamp.toDate(),
								products: doc.data().products,
								// Include other order details as needed
							}
							userOrders.push(orderData)
						})

						setOrders(userOrders)
					} catch (error) {
						console.error('Error fetching order history:', error)
					}
				}
			})
		}

		// Fetch order history when the component mounts
		fetchOrderHistory()
	}, [])

	return (
		<div>
			<h2>Order History</h2>
			<ul>
				{orders.map((order) => (
					<li key={order.orderId}>
						<p>Order ID: {order.orderId}</p>
						<p>Timestamp: {order.timestamp.toString()}</p>
						<ul>
							{order.products.map((product) => (
								<li key={product.productId}>
									<p>Product ID: {product.productId}</p>
									{/* Include other product details as needed */}
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</div>
	)
}
