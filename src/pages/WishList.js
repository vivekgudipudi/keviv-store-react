import { NavBarBrands } from '../components/NavBarBrands';
import { UseWishList } from '../contexts/wishlist-context';
import { UseCart } from '../contexts/cart-context';
import { useNavigate } from 'react-router-dom';


export const WishList = ()=> {
    const navigate = useNavigate()

    const { wishlist,removeFromWishList } = UseWishList();
    const { addToCart, cart } = UseCart();

    const isCarted = (cartArr, id) => {
        let res = cartArr.some(item=> item._id === id )
        return res;
      };


   
    return (
        <>
        <NavBarBrands/>

        <div className="wrapper flex-row justify-center">
        <section className="product-container flex-row justify-center wishlist-container">
            {wishlist.length !== 0 && wishlist.map((item)=>{
                console.log(item);
                return (
                    <div className="card-ecom card" key={item.id}>
                <img src={item.image} alt="iPhone" className="card-img card-img-ecom"/>
                <div className="card-ecom-badge">{item.badge}</div>
                <div className="card-ecom-like-icon">
                <i className="fas fa-heart wishlist-icon-selected" onClick={()=>removeFromWishList(item)}></i>
                </div>
                <div className="card-header">
                    <div className="card-sub-title">{item.brand}</div>
                    <div className="card-title">{item.title}</div>
                    <div className="card-sub-title card-ecom-memory">[ {item.memory}] <span>{item.rating}★</span></div>
                    <div className="card-ecom-price">
                        <span className="card-ecom-price-current">Rs. {item.price}</span>
                        <span className="card-ecom-price-old">{item.regularPrice}</span>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="card-btn-box"> {
                        isCarted(cart,item._id) ? <button className="btn default-primary"  onClick={
                            ()=>{ navigate("/cart");
                            removeFromWishList(item)}
                            } >GO TO CART</button> : <button className="btn default-primary"  onClick={
                                ()=>{
                                    addToCart(item);
                                    removeFromWishList(item)}
                                } >MOVE TO CART</button>
                    }
                        
                    </div>
                </div>
            </div>
                )

            }
                )}

            {
                wishlist.length === 0 && <h1> No products wishlishted </h1>
            }
            
          
        </section>
    </div>
        </>
    )
}