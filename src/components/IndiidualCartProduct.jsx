import React from 'react';
import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/feather/plus';
import { minus } from 'react-icons-kit/feather/minus';
import { auth, fs } from '../config/Config';
import '../styles/CartProductCard.css';

export const IndividualCartProduct = ({
  cartProduct,
  cartProductIncrease,
  cartProductDecrease,
}) => {
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
    <div className='productCard'>
      <div className='productImg'>
        <img src={cartProduct.images[0]} alt='product-img' />
      </div>
      <div className='productTitle'>{cartProduct.title}</div>
      <div className='productPrice'>€ {cartProduct.price}</div>
      <span>Quantity</span>
      <div className='quantityBox'>
        <div className='buttonMinus' onClick={handleCartProductDecrease}>
          <Icon icon={minus} size={20} />
        </div>
        <div>{cartProduct.qty}</div>
        <div className='buttonPlus' onClick={handleCartProductIncrease}>
          <Icon icon={plus} size={20} />
        </div>
      </div>
      <div className='producText'>€ {cartProduct.TotalProductPrice}</div>
      <div className='productButton' onClick={handleDeleteProduct}>
        DELETE
      </div>
    </div>
  );
};
