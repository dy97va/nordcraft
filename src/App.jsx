import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { NotFound } from './pages/NotFound'
import { AddProducts } from './pages/AddProducts'
import { Cart } from './pages/Cart'
import { Products } from './pages/Products'
import { Profile } from './pages/Profile'
import { CartContextProvider } from './context/CartContext'
import { ProductDetails } from './pages/ProductDetails'

export const App = () => {

  return (
    <CartContextProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component = {Home}/>
        <Route path="/profile" component={Profile}/>
        <Route exact path="/products" component={Products}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
        <Route path="/add-products" component={AddProducts}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/product/:productId" component= {ProductDetails}/>
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
    </CartContextProvider>
  )
}

export default App