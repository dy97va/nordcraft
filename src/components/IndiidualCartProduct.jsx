import React from 'react';
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/feather/plus';
import { minus } from 'react-icons-kit/feather/minus';
import { auth, fs } from '../config/Config';
import '../styles/individualCartProduct.css';

export const IndividualCartProduct = ({ cartProduct, cartProductIncrease, cartProductDecrease }) => {
  const handleCartProductIncrease = () => {
    cartProductIncrease(cartProduct);
  };

  const handleCartProductDecrease = () => {
    cartProductDecrease(cartProduct);
  };

  const handleDeleteProduct = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection('Cart ' + user.uid)
          .doc(cartProduct.ID)
          .delete()
          .then(() => {
            console.log('delete successful');
          });
      } else {
        console.log('delete unsuccesful, login first');
      }
    });
  };

  return (
    <div className='individualCartCard'>
      <div className='productImg'>
        <img
          src={cartProduct.images[0]}
          alt='product-img'
        />
      </div>
      <div className="cartCardDescr">
        <div className='cartCardTitle'>{cartProduct.title}</div>
        <div className='cartCardPrice'>€ {cartProduct.price}</div>
        <span>Quantity</span>
        <div className='quantityBox'>
          <div
            className='buttonMinus'
            onClick={handleCartProductDecrease}>
            <Icon
              icon={minus}
              size={20}
            />
          </div>
          <div>{cartProduct.qty}</div>
          <div
            className='buttonPlus'
            onClick={handleCartProductIncrease}>
            <Icon
              icon={plus}
              size={20}
            />
          </div>
        </div>
        <div className='cardTotalPrice'>€ {cartProduct.TotalProductPrice}</div>
        <div
          className='productButton'
          onClick={handleDeleteProduct}>
          DELETE
        </div>
      </div>
    </div>
  );
};
