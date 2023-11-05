import React, {useState}from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import '../styles/ProductDetails.css'
import { GetUserUid } from '../services/AuthServices'
import { addToCart } from '../services/ProductServices'

export const ProductDetails = (props) => {
  const { individualProduct } = props.location.state || {};
  const uid = GetUserUid();
  const [addToCartButton, setAddToCartButton] = useState('Add To Cart');


  const productImages = []
    for(let i in individualProduct.images) {
      productImages.push(individualProduct.images[i]);
    }

  const handleAddToCart = () => {
    console.log("addded to cart");
    addToCart(uid, individualProduct);
    setAddToCartButton('Added To Cart')
  }

  return (
    <div>
      <Navbar />
      {!individualProduct ? (
        <div>Loading...</div>
      ) : (
        <div className="productDetailsBox">
              <div className="productImage">
              {individualProduct.images.map((image, index) => (
                <img key={index} src={image} alt={`Product Image ${index}`} />
              ))}
            </div>
            <div className="productInfo">
              <span className="productTitle view-cards">{individualProduct.title}</span>
              <div className="productPrice card-price view-cards"> Price: € {individualProduct.price}</div>
              <div className="productDescription view-cards">{individualProduct.description}</div>
              <div className='productCardButton view-cards-btn' onClick={handleAddToCart}>{addToCartButton}</div>
            </div>
          </div>
      )}

      <Footer />
    </div>
  );
};
