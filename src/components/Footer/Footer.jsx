import React from 'react'
import { Icon } from 'react-icons-kit'
import { instagram } from 'react-icons-kit/feather/instagram'
import { mail } from 'react-icons-kit/ikons/mail'
import { phone } from 'react-icons-kit/feather/phone'
import { home } from 'react-icons-kit/feather/home'
import { user } from 'react-icons-kit/feather/user'
import { shoppingCart } from 'react-icons-kit/feather/shoppingCart'
import { gift } from 'react-icons-kit/feather/gift'
import { info } from 'react-icons-kit/feather/info'
import { Link } from 'react-router-dom'
import './Footer.css'

export const Footer = () => {
	return (
		<>
			<hr />
			<div className='footerBox'>
				<div className='infobox'>
					<div>Contact us</div>
					<div>
						<a href=''>
							<Icon icon={instagram} size={20}></Icon> instagram
						</a>
					</div>
					<div>
						<a href=''>
							<Icon icon={mail} size={20}></Icon> e-mail
						</a>
					</div>
					<div>
						<a href=''>
							<Icon icon={phone} size={20}></Icon> call{' '}
						</a>
					</div>
				</div>
				<div className='infobox'>
					<div>Navigation</div>
					<div>
						<Link to='/'>
							<Icon icon={home} size={20}></Icon> Home
						</Link>
					</div>
					<div>
						<Link to='profile'>
							<Icon icon={user} size={20}></Icon> Profile
						</Link>
					</div>
					<div>
						<Link to='cart'>
							<Icon icon={shoppingCart} size={20}></Icon> Cart{' '}
						</Link>
					</div>
					<div>
						<Link to='products'>
							<Icon icon={gift} size={20}></Icon> Products
						</Link>
					</div>
					<div>
						<Link to='faq'>
							<Icon icon={info} size={20}></Icon> FAQ
						</Link>
					</div>
				</div>
				<div className='infobox'>
					<div>About US</div>
					<p>
						Nord Craft: Your gateway to Finnish craftsmanship. Discover exquisite handcrafted treasures that blend
						tradition with innovation, in knitwear and leather goods. Elevate your lifestyle with timeless Nordic
						designs
					</p>
				</div>
			</div>
			{/* <hr className='cut-line' /> */}
			{/* <div className='creators'>created by Iroda And Valentin</div> */}
		</>
	)
}
