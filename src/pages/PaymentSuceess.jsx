import React, { useEffect } from 'react'
import { fs, auth } from '../config/Config'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar/Navbar'

export const PaymentSuccess = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const handleSuccessfulPayment = async () => {
			auth.onAuthStateChanged(async (user) => {
				if (user) {
					try {
						const cartCollectionName = 'Cart ' + user.uid

						// Fetch all documents in the cart collection
						const cartSnapshot = await fs.collection(cartCollectionName).get()
						console.log(cartSnapshot)

						if (!cartSnapshot.empty) {
							const cartDocs = cartSnapshot.docs
							console.log(cartDocs)

							// Create a new order document
							const orderId = fs.collection('Orders').doc().id // Generate a new ID for the order
							const orderRef = fs.collection('Orders').doc(orderId)

							// Prepare data for the order
							const orderData = {
								userId: user.uid,
								products: cartDocs.map((doc) => ({
									productId: doc.id,
									// Include other product details as needed
								})),
								// Include other order details as needed
								timestamp: new Date(),
							}

							// Set data in the order document
							await orderRef.set(orderData)

							// Delete each document in the cart collection
							cartDocs.forEach(async (doc) => {
								await fs.collection(cartCollectionName).doc(doc.id).delete()
							})

							// Add a delay of 3 seconds
							setTimeout(() => {
								navigate('/')
							}, 3000)
						} else {
							console.log('Cart collection is empty')
							navigate('/')
						}
					} catch (error) {
						console.error('Error handling successful payment:', error)
						navigate('/error')
					}
				}
			})
		}

		handleSuccessfulPayment()
	}, [navigate])

	return (
		<>
			<Navbar />
			<div className='container-fluid'>Your payment was successful</div>
		</>
	)
}
