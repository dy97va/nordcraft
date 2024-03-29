import React from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { OrderHistory } from '../../components/OrderHistory/Orders'
import { Footer } from '../../components/Footer/Footer'
import { auth } from '../../config/Config'
import { useNavigate } from 'react-router-dom'
import { GetCurrentUser } from '../../services/AuthServices'
import { Icon } from 'react-icons-kit'
import { mail } from 'react-icons-kit/ikons/mail'
import { phone } from 'react-icons-kit/feather/phone'
import { user } from 'react-icons-kit/feather/user'
import { Link } from 'react-router-dom'
import emptyUser from '../../assets/emptyUSer.png'
import './Profile.css'

const usericon = user

export const Profile = (props) => {
	const user = GetCurrentUser()
	const navigate = useNavigate()
	const emailToDisplay = auth.currentUser ? auth.currentUser.email : ''

	const handleLogout = () => {
		auth.signOut().then(() => {
			navigate('/login')
		})
	}

	return (
		<>
			<Navbar />
			{!user && (
				<>
					<div>
						To View Your Account info. Please login
						<Link to='login'> Here </Link>
					</div>
				</>
			)}
			{user && (
				<div className='profileInfo'>
					<div className='profileInfoBox'>
						<div className='profileInformationandpicture'>
							<div className='profilePicture'>
								<img src={emptyUser} alt={auth.currentUser.ProfilePic} className='profileImage' />
							</div>
							<div className='profileDescr'>
								<div className='userName'>
									<Icon icon={usericon}></Icon>
									{user}
								</div>
								<div className='email'>
									<Icon icon={mail}></Icon>
									{emailToDisplay}
								</div>
								<div className='phoneNumber'>
									<Icon icon={phone}></Icon>+358 46 5798609
								</div>
							</div>
						</div>
						<div className='navbarButton' onClick={handleLogout}>
							LOGOUT
						</div>
					</div>
					{/* <div className='myOrdersBox'>Ooops no orders yet...</div> */}
					<OrderHistory />
				</div>
			)}
			<Footer />
		</>
	)
}
