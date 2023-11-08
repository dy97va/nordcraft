import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { fs, auth } from '../config/Config';
import { CartProductList } from '../components/CartProductList';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/Cart.css';
import { Footer } from '../components/Footer';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection('Cart ' + user.uid).onSnapshot((snapshot) => {
          const newCartProduct = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }));
          setCartProducts(newCartProduct);
        });
      } else {
        console.log('user is not signed in to retrieve cart');
      }
    });
  }, []);

  const qty = cartProducts.map((cartProduct) => {
    return cartProduct.qty;
  });

  const reducerOfQty = (accumulator, currentValue) => accumulator + currentValue;

  const totalQty = qty.reduce(reducerOfQty, 0);

  const price = cartProducts.map((cartProduct) => {
    return cartProduct.TotalProductPrice;
  });

  const reducerOfPrice = (accumulator, currentValue) => accumulator + currentValue;

  const totalPrice = price.reduce(reducerOfPrice, 0);

  let Product;

  const cartProductIncrease = (cartProduct) => {
    Product = cartProduct;
    Product.qty = Product.qty + 1;
    Product.TotalProductPrice = Product.qty * Product.price;

    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection('Cart ' + user.uid)
          .doc(cartProduct.ID)
          .update(Product)
          .then(() => {
            console.log('increment successful');
          });
      } else {
        console.log('You are not logged in');
      }
    });
  };

  const cartProductDecrease = (cartProduct) => {
    Product = cartProduct;
    Product.qty = Product.qty - 1;
    Product.TotalProductPrice = Product.qty * Product.price;

    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection('Cart ' + user.uid)
          .doc(cartProduct.ID)
          .update(Product)
          .then(() => {
            console.log('increment successful');
          });
      } else {
        console.log('You are not logged in');
      }
    });
  };

  const handleToken = async (token) => {
    const cart = { name: 'All Products', totalPrice };
    const response = await axios.post('http://localhost:8080/checkout', {
      token,
      cart,
    });
    console.log(response);
    let { status } = response.data;
    console.log(status);
    if (status === 'success') {
      navigate('/');
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
      for (var snap of carts.docs) {
        fs.collection('Cart ' + uid)
          .doc(snap.id)
          .delete();
      }
    } else {
      alert('Something went wrong in checkout');
    }
  };

  return (
    <>
      <Navbar />
      {cartProducts.length > 0 && (
        <div className='container-fluid'>
          <h1 className='text-center'>Cart</h1>
          <div className='products-box'>
            <CartProductList
              cartProducts={cartProducts}
              cartProductIncrease={cartProductIncrease}
              cartProductDecrease={cartProductDecrease}
            />
          </div>
          <div className='summary-box'>
            <h5>Cart Summary</h5>
            <br></br>
            <div>
              Total No of Products: <span>{totalQty}</span>
            </div>
            <div>
              Total Price to Pay: <span>€ {totalPrice}</span>
            </div>
            <br />
            <StripeCheckout
              stripeKey='pk_test_51NzwJ2BnKw4OH10vID5msODJfsZqr3pknRjxxjskmGreSeifsmOx369DZmj1yYrYNAWz11HH3wKJAg3J5yKgEpxh00WE4EOkc0'
              token={handleToken}
              billingAddress
              shippingAddress
              name='All Products'
              amount={totalPrice * 100}></StripeCheckout>
          </div>
        </div>
      )}

      {cartProducts.length < 1 && <div className='container-fluid'>No Products In Cart Yet</div>}
      <Footer />
    </>
  );
};
