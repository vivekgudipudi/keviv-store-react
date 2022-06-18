import { Routes, Route } from "react-router-dom";
import { Cart } from '../pages/Cart';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login'
import { ProductListing } from '../pages/ProductListing';
import { Signup } from '../pages/Signup';
import { WishList } from '../pages/WishList';
import { RequiresAuth } from "../require-auth";


const EndPoints = ()=> {
    return(
    <Routes>
      <Route path="/cart" element={
      <RequiresAuth>
      <Cart />
      </RequiresAuth>} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/wishlist" element={
      <RequiresAuth>
      <WishList />
      </RequiresAuth>} />
    </Routes>
    )
}

export { EndPoints as Routes}

