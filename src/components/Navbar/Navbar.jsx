import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/Logo.svg'
import { Icon } from 'react-icons-kit'
import { shoppingCart } from 'react-icons-kit/feather/shoppingCart'
import { GetCurrentUser } from '../../services/AuthServices'
import { useCart } from '../../context/CartContext'
import { DropoutMenu } from './DropoutMenu'
import { useState, useRef } from 'react'
import './Navbar.css'

export const Navbar = () => {
	const totalProducts = useCart()
	const user = GetCurrentUser()

	const [isDropOutVisible, setDropOutVisible] = useState(false)

	const handleMouseEnter = () => {
		setDropOutVisible(true)
	}

	const handleMouseLeave = () => {
		setDropOutVisible(false)
	}

	const navRef = useRef()

	const toggleBurger = () => {
		navRef.current.classList.toggle('responsive-navBar')
	}

	return (
		<>
			<div className='navbar' ref={navRef}>
				<div className='logo'>
					<Link to='/'>
						<img src={logo} alt='logo' />
					</Link>
				</div>
				<div className='navigationMenu'>
					<div className='leftside'>
						<div>
							<Link className='navigationlink' to='/'>
								HOME
							</Link>
						</div>
						<div className='menu' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
							<Link className='navigationlink' to='/products'>
								Products
							</Link>
							{/* {isDropOutVisible && <DropoutMenu />} */}
						</div>
					</div>

					<div className='rightside'>
						{!user && (
							<>
								<div>
									<Link className='navigationlink' to='/signup'>
										SIGN UP
									</Link>
								</div>
								<div>
									<Link className='navigationlink' to='/login'>
										LOGIN
									</Link>
								</div>
								<div>
									<div className='cart-menu-btn'>
										<Link className='navigationlink' to='/cart'>
											Cart
											<Icon icon={shoppingCart} size={20} />
										</Link>
										<span className='cart-indicator'>{totalProducts}</span>
									</div>
								</div>
							</>
						)}

						{user && (
							<>
								<div>
									<Link className='navigationlink' to='/profile'>
										{user}
									</Link>
								</div>
								<div className='cart-menu-btn'>
									<Link className='navigationlink' to='/cart'>
										Cart
										<Icon icon={shoppingCart} size={20} />
										<span className='cart-indicator'>{totalProducts}</span>
									</Link>
								</div>
								<button onClick={toggleBurger} className='burgerButton'>
									close
								</button>
							</>
						)}
					</div>
				</div>
			</div>
			<button onClick={toggleBurger} className='burgerButton, burgerMenuOpener'>
				open
			</button>
		</>
	)
}
