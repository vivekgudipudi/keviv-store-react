import { useProductContext } from '../contexts/product-context';
import { UseWishList } from '../contexts/wishlist-context';
import { UseCart } from '../contexts/cart-context';



export const ProductListing = ()=> {

    const { dispatch,sortBy,toggleBrand,toggleRating,ratedData } = useProductContext();
    const { wishlist, addToWishList, removeFromWishList } = UseWishList();
    const { cart, addToCart, removeFromCart } = UseCart()
    
    return (
        <>
        
        <div className="wrapper flex-row">
        <aside className="side-bar-container flex-column">
            <div className="side-bar-heading bold t4">FILTERS</div>
            <div className="filter-heading filter-heading-top">
                Price
            </div>
            
            
            <div className="filter-content">
                <div className="filter-radio">
                    <input type="radio" onChange={() =>
              dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
            } checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}/>
                    <label >Price - High to Low</label>
                </div>
                <div className="filter-radio">
                    <input type="radio" onChange={() =>
              dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
            } checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}/>
                    <label>Price - Low to High</label>
                </div>
            </div>
            <div className="filter-heading">
                Category
            </div>
            <div className="filter-content">
                <div className="filter-check-box">
                    <input type="checkbox" onChange={() => dispatch({ type: "TOGGLE_CATEGORY",payload : 'APPLE' })} checked={toggleBrand.includes("APPLE")}/>
                    <label>Apple</label>
                </div>
                <div className="filter-check-box">
                    <input type="checkbox"onChange={() => dispatch({ type: "TOGGLE_CATEGORY",payload : 'GOOGLE' })} checked={toggleBrand.includes("GOOGLE")}/>
                    <label>Google</label>
                </div>
                <div className="filter-check-box">
                    <input type="checkbox" onChange={() => dispatch({ type: "TOGGLE_CATEGORY",payload : 'NOTHING' })} checked={toggleBrand.includes("NOTHING")}/>
                    <label>Nothing</label>
                </div>
                <div className="filter-check-box">
                    <input type="checkbox" onChange={() => dispatch({ type: "TOGGLE_CATEGORY",payload : 'ONEPLUS' })} checked={toggleBrand.includes("ONEPLUS")}/>
                    <label>Oneplus</label>
                </div>
                <div className="filter-check-box">
                    <input type="checkbox" id="" onChange={() => dispatch({ type: "TOGGLE_CATEGORY",payload : 'SAMSUNG' })} checked={toggleBrand.includes("SAMSUNG")}/>
                    <label>Samsung</label>
                </div >
            </div>
            <div className="filter-heading">
                Rating
            </div>
            <div className="filter-content">
                <div className="filter-radio">
                    <input type="radio" checked = {toggleRating==="4_ABOVE"} id="" onChange={() => dispatch({ type: "TOGGLE_RATING",payload : '4_ABOVE' })}/>
                    <label>4★ & above</label>
                </div>
                <div className="filter-radio">
                    <input type="radio" checked = {toggleRating==="3_ABOVE"} id="" onChange={() => dispatch({ type: "TOGGLE_RATING",payload : '3_ABOVE' })}/>
                    <label>3★ & above</label>
                </div>
                <div className="filter-radio">
                    <input type="radio" checked = {toggleRating==="2_ABOVE"} id="" onChange={() => dispatch({ type: "TOGGLE_RATING",payload : '2_ABOVE' })}/>
                    <label>2★ & above</label>
                </div>
                <div className="filter-radio">
                    <input type="radio" checked = {toggleRating==="1_ABOVE"} id="" onChange={() => dispatch({ type: "TOGGLE_RATING",payload : '1_ABOVE' })}/>
                    <label>1★ & above</label>
                </div>
            </div>
            <div className="clear-button-content">
                <button className="btn clear-button t4" onClick={()=> dispatch({type: "CLEAR_ALL"})}>Clear All</button>
            </div>
        </aside>
        <section className="product-container flex-row justify-center">
            {ratedData.map((product)=>(<div className="card-ecom card" key={product.id}>
                <img src={product.image} alt="iPhone" className="card-img card-img-ecom"/>
                {product.badge !== null ? <div className="card-ecom-badge">{product.badge}</div> : null}
                
            
                { wishlist.find((item)=>item._id === product._id) 
                ? <div className="card-ecom-like-icon">
                <i className="fas fa-heart wishlist-icon-selected" onClick={()=>removeFromWishList(product)}></i>
               
                </div>
                : 
                <div className="card-ecom-like-icon">
                    <i className="fas fa-heart wishlist-icon" onClick={()=>addToWishList(product)}></i>
                </div>
               }
                
                
                <div className="card-header">
                    <div className="card-sub-title">{product.brand}</div>
                    <div className="card-title">{product.title}</div>
                    <div className="card-sub-title card-ecom-memory">[ {product.memory}] <span>{product.rating}★</span></div>
                    <div className="card-ecom-price">
                        <span className="card-ecom-price-current">Rs.{product.price}  </span>
                        <span className="card-ecom-price-old">{product.regularPrice} </span>
                    </div>
                </div>
                <div className="card-footer">
                { cart.find((item)=>item._id === product._id) 
                ? 
                    <div className="card-btn-box">
                        <button className="btn default-primary" onClick={()=>removeFromCart(product)}>REMOVE FROM CART</button>
                    </div>
                : 
                <div className="card-btn-box">
                        <button className="btn default-primary" onClick={()=>addToCart(product)}>ADD TO CART</button>
                    </div>
               }
                    
                </div>
            </div>))}
        </section>
    </div>
        </>
    )
}