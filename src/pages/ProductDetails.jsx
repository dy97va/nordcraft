import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import '../styles/ProductDetails.css'

export const ProductDetails = (props) => {
  const { individualProduct } = props.location.state || {};

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
          <div>{individualProduct.price}</div>
          <div>{individualProduct.description}</div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};
