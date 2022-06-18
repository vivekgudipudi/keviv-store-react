import { NavBar } from '../components/NavBar';
import { useProductContext } from '../contexts/product-context';


export const ProductListing = ()=> {

    const { dispatch,sortBy,toggleBrand,toggleRating,ratedData } = useProductContext()
    
    return (
        <>
        <NavBar />
        <hr/>
        <div class="wrapper flex-row">
        <aside class="side-bar-container flex-column">
            <div class="side-bar-heading bold t4">FILTERS</div>
            <div class="filter-heading filter-heading-top">
                Price
            </div>
            
            
            <div class="filter-content">
                <div class="filter-radio">
                    <input type="radio" onChange={() =>
              dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
            } checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}/>
                    <label for="oneplus">Price - High to Low</label>
                </div>
                <div class="filter-radio">
                    <input type="radio" onChange={() =>
              dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
            } checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}/>
                    <label for="oneplus">Price - Low to High</label>
                </div>
            </div>
            <div class="filter-heading">
                Category
            </div>
            <div class="filter-content">
                <div class="filter-check-box">
                    <input type="checkbox" onChange={() => dispatch({ type: "TOGGLE_CATEGORY",payload : 'APPLE' })} checked={toggleBrand === "APPLE"}/>
                    <label for="apple">Apple</label>
                </div>
                <div class="filter-check-box">
                    <input type="checkbox"onChange={() => dispatch({ type: "TOGGLE_CATEGORY",payload : 'GOOGLE' })} checked={toggleBrand === "GOOGLE"}/>
                    <label for="google">Google</label>
                </div>
                <div class="filter-check-box">
                    <input type="checkbox" onChange={() => dispatch({ type: "TOGGLE_CATEGORY",payload : 'NOTHING' })} checked={toggleBrand === "NOTHING"}/>
                    <label for="huawei">Nothing</label>
                </div>
                <div class="filter-check-box">
                    <input type="checkbox" onChange={() => dispatch({ type: "TOGGLE_CATEGORY",payload : 'ONEPLUS' })} checked={toggleBrand === "ONEPLUS"}/>
                    <label for="oneplus">Oneplus</label>
                </div>
                <div class="filter-check-box">
                    <input type="checkbox" id="" onChange={() => dispatch({ type: "TOGGLE_CATEGORY",payload : 'SAMSUNG' })} checked={toggleBrand === "SAMSUNG"}/>
                    <label for="SAMSUNG">Samsung</label>
                </div >
            </div>
            <div class="filter-heading">
                Rating
            </div>
            <div class="filter-content">
                <div class="filter-radio">
                    <input type="radio" checked = {toggleRating==="4_ABOVE"} id="" onChange={() => dispatch({ type: "TOGGLE_RATING",payload : '4_ABOVE' })}/>
                    <label for="apple">4★ & above</label>
                </div>
                <div class="filter-radio">
                    <input type="radio" checked = {toggleRating==="3_ABOVE"} id="" onChange={() => dispatch({ type: "TOGGLE_RATING",payload : '3_ABOVE' })}/>
                    <label for="google">3★ & above</label>
                </div>
                <div class="filter-radio">
                    <input type="radio" checked = {toggleRating==="2_ABOVE"} id="" onChange={() => dispatch({ type: "TOGGLE_RATING",payload : '2_ABOVE' })}/>
                    <label for="huawei">2★ & above</label>
                </div>
                <div class="filter-radio">
                    <input type="radio" checked = {toggleRating==="1_ABOVE"} id="" onChange={() => dispatch({ type: "TOGGLE_RATING",payload : '1_ABOVE' })}/>
                    <label for="oneplus">1★ & above</label>
                </div>
            </div>
            <div class="clear-button-content">
                <button class="btn clear-button t4" onClick={()=> dispatch({type: "CLEAR_ALL"})}>Clear All</button>
            </div>
        </aside>
        <section class="product-container flex-row justify-center">
            {ratedData.map((product)=>(<div class="card-ecom card">
                <img src={product.image} alt="iPhone" class="card-img card-img-ecom"/>
                <div class="card-ecom-badge">{product.badge}</div>
                <div class="card-ecom-like-icon"><i class="fas fa-heart wishlist-icon"></i></div>
                <div class="card-header">
                    <div class="card-sub-title">{product.brand}</div>
                    <div class="card-title">{product.title}</div>
                    <div class="card-sub-title card-ecom-memory">[ {product.memory}] <span>{product.rating}★</span></div>
                    <div class="card-ecom-price">
                        <span class="card-ecom-price-current">Rs.{product.price}  </span>
                        <span class="card-ecom-price-old">{product.regularPrice} </span>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="card-btn-box">
                        <button class="btn default-primary">ADD TO CART</button>
                    </div>
                </div>
            </div>))}
        </section>
    </div>
        </>
    )
}