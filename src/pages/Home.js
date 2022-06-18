import '../App.css';
import { NavBar } from '../components/NavBar';
import { NavBarBrands } from '../components/NavBarBrands';
import carousel from '../Assets/carousel.jpg';
import {NavLink } from "react-router-dom";
import { useProductContext } from '../contexts/product-context';




export const Home = ()=>{

    const { dispatch } = useProductContext();

    
    return(
    <>
        <NavBar />
        <hr/>
        <NavBarBrands/>
        
        <main>
            <div className="hero-container">
                <div className="img-carousel">
                    <img src = { carousel }
                    alt="mobile" className="img-responsive" />
                    <div className="img-overlay-text t2">
                        Light.<br/> Bright.<br/>Full of might.<br/>
                        <NavLink to='/products' className="image-overlay-link" onClick={()=> dispatch({type: "CLEAR_ALL"})}>Shop now..</NavLink>
                    </div>
                </div>
            </div>
        </main>
    </>
    )
}

