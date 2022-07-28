import { createContext, useContext, useReducer } from "react";
import { CartReducer } from "../reducers/cart-reducer";
import axios from "axios";
import { useAuth } from "./auth-context";
import { useNavigate } from "react-router-dom";


const CartContext = createContext([])

const CartProvider = ({children})=>{
    const [{cart},dispatch] = useReducer(CartReducer,{
        cart:[]
    })
    const token = localStorage.getItem("token");

    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    


    (async () => {
        try{
            const response = await axios.get('/api/user/cart',
            {
                headers: { authorization: token }
            });
            if(response.data.status === 200){
                dispatch({
                    type : "GET_CART",
                    payload : response.data.cart
                })
            }
        }
        catch(error){
            console.log(error)
        }
    })()

    const addToCart = async (product)=>{
        if(isLoggedIn){
            try{
                const response = await axios.post("/api/user/cart",
                {product},
                {
                    headers: { authorization: token }
                }
                )
                if (response.status === 201) {
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: response.data.cart
                    })
                    
                  }
            }
            catch(error){
                console.log(error)
            }

        }
        else{
            navigate("/login")
        }
        
    }

    const removeFromCart = async(product)=>{
        try {
            const response = await axios.delete(`/api/user/cart/${product._id}`,
            {
                headers: { authorization: token }
            })
            if(response.status === 200) {
                dispatch({
                  type: "DELETE_FROM_CART",
                  payload: response.data.cart,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }


    const incrementItem = async(product) => {

        try {console.log("reached")
            const response = await axios.post(`/api/user/cart/${product._id}`,
            {
                action: {
                  type: "increment",
                }
              },
            {
                headers: { authorization: token }
            }
            )
            if(response.status === 200){
                dispatch({type:"INCREMENT_ITEM",payload : response.data.cart})
            }
        } catch (error) {
            console.log(error.response.data)
        }

    }

    const decrementItem = async(product) => {

        try {
            const response = await axios.post(`/api/user/cart/${product._id}`,
            {
                action: {
                  type: "decrement",
                }
              },
            {
                headers: { authorization: token }
            }
            )
            if(response.status === 200){
                dispatch({type:"INCREMENT_ITEM",payload : response.data.cart})
            }
        } catch (error) {
            console.log(error.response.data)
        }

    }

    


    return(
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementItem, decrementItem}}>
            {children}
        </CartContext.Provider>
    )
}

const UseCart = ()=> useContext(CartContext)

export { UseCart,CartProvider }