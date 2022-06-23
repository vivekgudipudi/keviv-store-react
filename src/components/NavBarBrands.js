import '../App.css';
import { NavLink } from "react-router-dom";
import { useProductContext } from '../contexts/product-context';




export const NavBarBrands = ()=> {

    const { dispatch } = useProductContext();

    
    return(
        <div className="nav-categories-container">
            <ul className="nav-categories-list flex-row justify-center">
            <li className="nav-category-pill"><NavLink to ='/products' onClick={() => dispatch({ type: "TOGGLE_CATEGORY",payload : 'APPLE' })}>Apple</NavLink></li>
            <li className="nav-category-pill"><NavLink to ='/products' onClick={() => dispatch({ type: "TOGGLE_CATEGORY",payload : 'GOOGLE' })}>Google</NavLink></li>
            <li className="nav-category-pill"><NavLink to ='/products' onClick={() => dispatch({ type: "TOGGLE_CATEGORY",payload : 'NOTHING' })}>Nothing</NavLink></li>
            <li className="nav-category-pill"><NavLink to ='/products' onClick={() => dispatch({ type: "TOGGLE_CATEGORY",payload : 'ONEPLUS' })}>Oneplus</NavLink></li>
            <li className="nav-category-pill"><NavLink to ='/products' onClick={() => dispatch({ type: "TOGGLE_CATEGORY",payload : 'SAMSUNG' })}>Samsung</NavLink></li>
            </ul>
        </div>
    )
}