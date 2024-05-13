import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Login } from './components/Authentification/Login'
import { Signup } from './components/Authentification/Signup'
import { NotFound } from './pages/NotFound'
import { AddProducts } from './pages/AddProducts/AddProducts'
import { Cart } from './pages/Cart/Cart'
import { Products } from './pages/Products/Products'
import { Profile } from './pages/Profile/Profile'
import { ProductDetails } from './pages/ProductDetails/ProductDetails'
import { PaymentSuccess } from './pages/PaymentSuceess'
import { CartContextProvider } from './context/CartContext'
// import { Navbar } from './components/Navbar/Navbar'
import { NavigationBar } from './components/NavigationBar/NavigationBar'

export const App = () => {
	return (
		<CartContextProvider>
			<BrowserRouter>
				<NavigationBar />
				{/* <Navbar /> */}
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route path='/profile' element={<Profile />} />
					<Route exact path='/products' element={<Products />} />
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
