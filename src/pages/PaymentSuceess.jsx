import React, { useEffect } from 'react'
import { fs, auth } from '../config/Config'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export const PaymentSuccess = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const handleSuccessfulPayment = async () => {
			console.log('hello there')
			auth.onAuthStateChanged(async (user) => {
				if (user) {
					console.log('hello')
					try {
						const cartCollectionName = 'Cart ' + user.uid
						console.log(cartCollectionName)

						const cartSnapshot = await fs.collection(cartCollectionName).get()

						if (!cartSnapshot.empty) {
							const cartDocs = cartSnapshot.docs

							cartDocs.forEach(async (doc) => {
								await fs.collection(cartCollectionName).doc(doc.id).delete()
							})
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
