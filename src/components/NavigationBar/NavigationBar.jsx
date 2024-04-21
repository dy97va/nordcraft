import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { GetCurrentUser } from '../../services/AuthServices'
import logo from '../../assets/Logo.svg'
import './NavigationBar.css'
import { Icon } from 'react-icons-kit'
import { shoppingCart } from 'react-icons-kit/feather/shoppingCart'

export const NavigationBar = () => {
	const [burgerMenuOpen, setBurgerMenuOpen] = useState(false)
	const totalProducts = useCart()
	const user = GetCurrentUser()

	return (
		<nav>
			<Link to='/'>
				<img src={logo} alt='logo' className='navLogo' />
			</Link>
			{!user && (
				<>
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
						<li>
							<NavLink to='/login'>Login/SignUp</NavLink>
						</li>
						<li className='cartIcon'>
							<NavLink to='/cart'>
								Cart
								<Icon icon={shoppingCart} size={20} />
								{/* <div className='cart-indicator'>{totalProducts}</div> */}
							</NavLink>
						</li>
					</ul>
				</>
			)}

			{user && (
				<>
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
						<li>
							<NavLink to='/profile'>Profile</NavLink>
						</li>
						<li className='cartIcon'>
							<NavLink to='/cart'>
								Cart
								<Icon icon={shoppingCart} size={20} />
								{/* <div className='cart-indicator'>{totalProducts}</div> */}
							</NavLink>
						</li>
					</ul>
				</>
			)}
		</nav>
	)
}
