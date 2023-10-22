import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/Logo.svg'
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import '../styles/Navbar.css'
import { GetCurrentUser } from '../services/AuthServices'
import { useCart } from '../context/CartContext'

export const Navbar = () => {

    const totalProducts = useCart();
    const user = GetCurrentUser();
    
    return (
        <div className='navbar'>
            <div className='leftside'>
                <div className='logo'>
                    <Link to='/'> <img src={logo} alt="logo"/> </Link>
                </div>
                <div><Link className='navigationlink' to="/">HOME</Link></div>
            </div>

            <div className='rightside'>
                {!user&&<>
                    <div><Link className='navigationlink' to="/signup">SIGN UP</Link></div>
                    <div><Link className='navigationlink' to="/login">LOGIN</Link></div>
                    <div><Link className='navigationlink' to="/products">Products</Link></div>
                </>}

                {user&&<>
                    <div><Link className='navigationlink' to="/products">Products</Link></div>
                    <div><Link className='navigationlink' to="/profile">{user}</Link></div>
                    <div className='cart-menu-btn'>
                        <Link className='navigationlink' to="/cart">
                            Cart <Icon icon={shoppingCart} size={20}/>
                        </Link>
                        <span className='cart-indicator'>{totalProducts}</span>
                    </div>
                </>}                                      
            </div>
        </div>
    )
}