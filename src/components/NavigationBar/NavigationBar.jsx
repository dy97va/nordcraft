import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { GetCurrentUser } from '../../services/AuthServices'
import logo from '../../assets/Logo.svg'
import './NavigationBar.css'
import { Icon } from 'react-icons-kit'
import { shoppingCart } from 'react-icons-kit/feather/shoppingCart'
import { Login } from '../Authentification/Login'
import { Signup } from '../Authentification/Signup'

export const NavigationBar = () => {
	const totalProducts = useCart()
	const user = GetCurrentUser()

	const [burgerMenuOpen, setBurgerMenuOpen] = useState(false)
	const [loginFormOpen, setLoginFormOpen] = useState(false)
	const [signUpFormOpen, setSignUpFormOpen] = useState(false)

	const profileLink = (
		<>
			{user ? (
				<>
					<li>
						<NavLink to='/profile'>Profile</NavLink>
					</li>
				</>
			) : (
				<>
					<li>
						<a onClick={() => setLoginFormOpen(true)}>Login/SignUp</a>
						{loginFormOpen && (
							<Login
								onClose={() => setLoginFormOpen(false)}
								showSignupForm={() => {
									setLoginFormOpen(false)
									setSignUpFormOpen(true)
								}}
							/>
						)}
						{signUpFormOpen && (
							<Signup
								onClose={() => setSignUpFormOpen(false)}
								showLoginForm={() => {
									setLoginFormOpen(true)
									setSignUpFormOpen(false)
								}}
							/>
						)}
					</li>
				</>
			)}
		</>
	)

	return (
		<nav>
			<Link to='/'>
				<img src={logo} alt='logo' className='navLogo' />
			</Link>
			<div className='burgerMenu' onClick={() => setBurgerMenuOpen(!burgerMenuOpen)}>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<ul className={burgerMenuOpen ? 'open' : ''}>
				<li>
					<NavLink to='/'>Home</NavLink>
				</li>
				<li>
					<NavLink to='/products'>Products</NavLink>
				</li>
				{profileLink}
				<li className='cartLink'>
					<NavLink to='/cart'>
						{/* <Icon icon={shoppingCart} size={20} /> */}
						Cart {'(' + totalProducts + ')'}
						{/* <div className='cart-indicator'>{totalProducts}</div> */}
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}
