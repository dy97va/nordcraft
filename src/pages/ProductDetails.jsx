import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import '../styles/ProductDetails.css'
import { GetUserUid } from '../services/AuthServices'
import { addToCart } from '../services/ProductServices'

export const ProductDetails = (props) => {
  const { individualProduct } = props.location.state || {};
  const uid = GetUserUid();

  const handleAddToCart = () => {
    console.log("addded to cart");
    addToCart(uid, individualProduct);
  }

  return (
    <div>
      <Navbar />
      {!individualProduct ? (
        <div>Loading...</div>
      ) : (
        <div className="productDetailsBox">
          <div className="productImage">
            <img src={individualProduct.url} alt="product-img"/>
          </div>
          <div className="productInfo">
          <div className="productTitle">{individualProduct.title}</div>
          <div className="productPrice"> Price: € {individualProduct.price}</div>
          <div className="productDescription">{individualProduct.description}</div>
          <div className='productCardButton' onClick={handleAddToCart}>ADD TO CART</div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};
