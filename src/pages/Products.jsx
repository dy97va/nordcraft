import React,{useState, useEffect} from 'react'
import { Navbar } from '../components/Navbar'
import { ProductList } from '../components/ProductList'
import { GetUserUid } from '../services/AuthServices'
import { addToCart, getProducts } from '../services/ProductServices'
import '../styles/Products.css'
import { Footer } from '../components/Footer'

export const Products = (props) => {

    const uid = GetUserUid();
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts().then((products) => {
            setProducts(products);
        });
    },[]);
    
    const handleAddToCart = (product) => {
        if(uid !== null) { 
            addToCart(uid, product);
        } else {
            props.history.push('/login');
        }
    }

    return (
        <>
            <Navbar/>
            <br></br>
            {products.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Products</h1>
                    <div className='productsBox'>
                         <ProductList products={products} addToCart={handleAddToCart}/>
                    </div>
                </div>
            )}
            {products.length < 1 && (
                <div className='container-fluid'>Please wait....</div>
            )}
            <Footer/>
        </>
    )
}