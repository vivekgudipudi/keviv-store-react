import '../App.css';
import {NavLink } from "react-router-dom";
import { useProductContext } from '../contexts/product-context';
import { useNavigate } from 'react-router-dom';


export const NavBar = ()=> {

    const navigate = useNavigate()

    const { setSearchText } = useProductContext()
   

    return(
        <nav className="nav-container flex-row align-center justify-sa">
        <div className="nav-brand t2 bold"><NavLink style = {{color : '#1f2937'}} to = '/' >Keviv</NavLink></div>
        <input type="text" className="nav-search" placeholder="Search for products,brands and more"
        onChange={(e)=>{setSearchText(e.target.value); navigate("/products")}}  />
        <div className="nav-shop-items">
            <ul className="nav-categories-list flex-row semi-bold">
                <li className="nav-category-pill"><NavLink to ='/wishlist' >Wishlist</NavLink></li>
                <li className="nav-category-pill"><NavLink to = '/cart' >Cart</NavLink></li>
                <li className="nav-category-pill"><NavLink to = '/' style = {{color : '#1f2937'}} >Profile</NavLink></li>
                <li className="nav-category-pill"><NavLink to = '/login'>Login</NavLink></li>
            </ul>
        </div>
    </nav>
    )
}

