import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { NotFound } from './pages/NotFound'
import { AddProducts } from './pages/AddProducts'
import { Cart } from './pages/Cart'
import { Products } from './pages/Products'
import { Profile } from './pages/Profile'
import { CartContextProvider } from './context/CartContext'
import { ProductDetails } from './pages/ProductDetails'
import { PaymentSuccess } from './pages/PaymentSuceess'

export const App = () => {
	return (
		<CartContextProvider>
			<BrowserRouter>
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route path='/profile' element={<Profile />} />
					<Route exact path='/products' element={<Products />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/login' element={<Login />} />
					<Route path='/add-products' element={<AddProducts />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/product/:productId' element={<ProductDetails />} />
					<Route path='/success' element={<PaymentSuccess />} />
					<Route component={NotFound} />
				</Routes>
			</BrowserRouter>
		</CartContextProvider>
	)
}

export default App
