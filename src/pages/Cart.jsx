import React, { useState, useEffect} from 'react'
import { Navbar } from '../components/Navbar'
import { fs, auth } from '../config/Config'
import { CartProductList } from "../components/CartProductList";
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {toast} from 'react-toastify';
import '../styles/Cart.css'
import { Footer } from '../components/Footer'
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

const getTotalQty = (cartProducts) => {
  return cartProducts.reduce((total, cartProduct) => total + cartProduct.qty, 0);
}

const getTotalPrice = (cartProducts) => {
  console.log('Hello there')
  return cartProducts.reduce((total, cartProduct) => total + cartProduct.TotalProductPrice, 0);

}

const updateCartProduct = async (user, cartProduct) => {
  const Product = { ...cartProduct };
  Product.qty = Product.qty - 1;
  Product.TotalProductPrice = Product.qty * Product.price;

  if (user) {
    await fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product);
  }
}

export const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const cartRef = fs.collection('Cart ' + user.uid);
        const unsubscribeCart = cartRef.onSnapshot((snapshot) => {
          const newCartProducts = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }));
          setCartProducts(newCartProducts);
        });

        return () => {
          unsubscribeCart();
        };
      }
    });
  }, []);

  const history = useHistory();

  const handleToken = async (token) => {
    const cart = { name: 'All Products', totalPrice: getTotalPrice(cartProducts) };
    const response = await axios.post('http://localhost:8080/checkout', {
      token,
      cart,
    });
    const { status } = response.data;

    if (status === 'success') {
      history.push('/');
      toast.success('Your order has been placed successfully', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });

      const uid = auth.currentUser.uid;
      const carts = await fs.collection('Cart ' + uid).get();

      for (const snap of carts.docs) {
        fs.collection('Cart ' + uid).doc(snap.id).delete();
      }
    } else {
      alert('Something went wrong at checkout');
    }
  }

  return (
    <>
      <Navbar />
      {cartProducts.length > 0 && (
        <div className='container-fluid'>
          <h1 className='text-center'>Cart</h1>
          <div className='products-box'>
            <CartProductList
              cartProducts={cartProducts}
              cartProductIncrease={updateCartProduct}
              cartProductDecrease={updateCartProduct}
            />
          </div>
          <div className='summary-box'>
            <h5>Cart Summary</h5>
            <br />
            <div>
              Total No of Products: <span>{getTotalQty(cartProducts)}</span>
            </div>
            <div>
              Total Price to Pay: <span>€ {getTotalPrice(cartProducts)}</span>
            </div>
            <br />
            <StripeCheckout
              stripeKey='pk_test_51NzwJ2BnKw4OH10vID5msODJfsZqr3pknRjxxjskmGreSeifsmOx369DZmj1yYrYNAWz11HH3wKJAg3J5yKgEpxh00WE4EOkc0'
              token={handleToken}
              billingAddress
              shippingAddress
              name='All Products'
              amount={getTotalPrice(cartProducts) * 100}
            ></StripeCheckout>
          </div>
        </div>
      )}

      {cartProducts.length < 1 && (
        <div className='container-fluid'>No Products In Cart Yet</div>
      )}
      <Footer/>
    </>
  )
}
