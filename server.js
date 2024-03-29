const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')
const { async } = require('q')
const stripe = require('stripe')(
	'sk_test_51NzwJ2BnKw4OH10vR4PpTE8Gzzme7eI27qfWVPLKszpXIjJof4oCpTpOq3YDstncCLAIzh5r2BxJ93eCEfuT8b0J00foSbIkxg'
)

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
	res.send('Welcome')
})

app.post('/create-checkout-session', async (req, res) => {
	const { cart } = req.body
	const lineItems = cart.cartProducts.map((product) => ({
		price_data: {
			currency: 'eur',
			product_data: {
				name: product.title,
			},
			unit_amount: Math.round(product.price * 100),
		},
		quantity: product.qty,
	}))

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: lineItems,
		mode: 'payment',
		shipping_address_collection: {
			allowed_countries: ['FI'],
		},
		success_url: 'http://localhost:3000/success',
		cancel_url: 'http://localhost:3000/cart',
	})
	console.log(session)
	res.json({ sessionId: session.id })
})

app.listen(8080, () => {
	console.log('your app is running on port #8080')
})
