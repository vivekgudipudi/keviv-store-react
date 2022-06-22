export const CartReducer = (state, action) => {
    switch(action.type){
            case "ADD_TO_CART":
            case "GET_CART":
            case "DELETE_FROM_CART":
            case "INCREMENT_ITEM":
            return {
                ...state,
                cart : action.payload,
            }
            default : return state;
    }
}


