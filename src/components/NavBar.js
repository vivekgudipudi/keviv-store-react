import '../App.css';
import {NavLink } from "react-router-dom";
import { useProductContext } from '../contexts/product-context';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';
import { UseWishList } from '../contexts/wishlist-context';
import { UseCart } from '../contexts/cart-context';


export const NavBar = ()=> {
    const { wishlist } = UseWishList();
    const { cart } = UseCart()
    const { isLoggedIn,setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    const { setSearchText } = useProductContext();
    const loginClickHandler = () => { if(isLoggedIn){
        window.location.reload(false);
        setIsLoggedIn(!isLoggedIn);
        
    }
    // else{
    //     // localStorage.clear()
    // }
    }

    return(
        <nav className="nav-container flex-row align-center justify-sa">
        <div className="nav-brand t2 bold"><NavLink style = {{color : '#1f2937'}} to = '/' >Keviv</NavLink></div>
        <input type="text" className="nav-search" placeholder="Search for products,brands and more"
        onChange={(e)=>{setSearchText(e.target.value); navigate("/products")}}  />
        <div className="nav-shop-items">
            <ul className="nav-categories-list flex-row semi-bold">
                <li className="nav-category-pill"><NavLink to ='/wishlist' >Wishlist {isLoggedIn && `[ ${wishlist.length} ]`}</NavLink></li>
                <li className="nav-category-pill"><NavLink to = '/cart' >Cart {isLoggedIn && `[ ${cart.length} ]`}</NavLink></li>
                {/* <li className="nav-category-pill"><NavLink to = '/' style = {{color : '#1f2937'}} >Profile</NavLink></li> */}
                <li className="nav-category-pill">
                    <NavLink to = '/login' onClick={ loginClickHandler } >{isLoggedIn ? "Logout" : "Login"}</NavLink>
                </li>
            </ul>
        </div>
    </nav>
    )
}

