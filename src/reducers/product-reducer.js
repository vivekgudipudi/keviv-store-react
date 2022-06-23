
export const ProductReducer = (state, action) => {
    switch (action.type) {
      case "SORT": {
        return {
          ...state,
          sortBy: action.payload
        };
        }
      case "TOGGLE_CATEGORY" : {
        return{
            ...state,
            toggleBrand : action.payload
        }

      }
      case "TOGGLE_RATING" :{
        return{
            ...state,
            toggleRating : action.payload

        }
      }
      case "CLEAR_ALL" : {
        return{
            ...state,
            sortBy: null,
    toggleBrand : "",
    toggleRating : 5
        }
      }
      default : return state
 
    }
  };






