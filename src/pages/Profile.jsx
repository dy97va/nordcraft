import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { auth } from '../config/Config';
import { useNavigate } from 'react-router-dom';
import { GetCurrentUser } from '../services/AuthServices';
import { Icon } from 'react-icons-kit';
import { mail } from 'react-icons-kit/ikons/mail';
import { phone } from 'react-icons-kit/feather/phone';
import { user } from 'react-icons-kit/feather/user';
import { Link } from 'react-router-dom';
import emptyUser from '../assets/emptyUSer.png';
import '../styles/Profile.css';

const usericon = user;

export const Profile = (props) => {
  const user = GetCurrentUser();
  const navigate = useNavigate();
  const emailToDisplay = auth.currentUser.email;

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login');
    });
  };

  return (
    <div>
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
        <>
          <div className='profileInfoBox'>
            <div className='profilePicture'>
              <img src={emptyUser} alt={auth.currentUser.ProfilePic} />
            </div>
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
          <div className='myOrdersBox'>My orders No orders yet</div>
          <div className='navbarButton' onClick={handleLogout}>
            LOGOUT
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};
