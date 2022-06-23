import { createContext, useContext, useReducer } from "react";
import axios from 'axios';
import {  WishListReducer } from "../reducers/wishlist-reducer";
import { useNavigate } from "react-router-dom"
import { useAuth } from "./auth-context";


const WishListContext = createContext([]);

const WishListProvider = ({children}) =>{

    const [{wishlist},dispatch] = useReducer(WishListReducer, {
        wishlist : []
    })

    const token = localStorage.getItem("token");
    const navigate = useNavigate()
    const { isLoggedIn } = useAuth();

    (async () => {
        try{
            const response = await axios.get('/api/user/wishlist',
            {
                headers: { authorization: token }
            });
            if(response.data.status === 200){
                dispatch({
                    type : "GET_WISHLIST",
                    payload : response.data.wishlist
                })
            }
        }
        catch(error){
            console.log(error)
        }
    })()


    const addToWishList = async(product) => {
        if(isLoggedIn){
            try{
                const response = await axios.post("/api/user/wishlist",
                {product},
                {
                    headers: { authorization: token }
                }
                )
                if (response.status === 201) {
                    dispatch({
                      type: "ADD_TO_WISHLIST",
                      payload: response.data.wishlist
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

    const removeFromWishList = async(product) => {
        try{
            const response = await axios.delete(`/api/user/wishlist/${product._id}`,
            {
                headers: { authorization: token }
            })
            if(response.status === 200) {
                dispatch({
                  type: "DELETE_FROM_WISHLIST",
                  payload: response.data.wishlist,
                })
            }

        }
        catch(error){console.log(error)}
    }

    







    return(
        <WishListContext.Provider value={{wishlist, addToWishList, removeFromWishList}}>
            {children}
        </WishListContext.Provider>
    )
}

const UseWishList = ()=> useContext(WishListContext)

export { WishListProvider,UseWishList  }