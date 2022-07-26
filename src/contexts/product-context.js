import { createContext, useContext, useState, useEffect, useReducer } from "react";
import axios from 'axios';
import { ProductReducer } from '../reducers/product-reducer';

const ProductContext = createContext([]);

const ProductProvider = ({children}) => {
    const [searchText, setSearchText] = useState("")

    const [{ sortBy, toggleBrand,toggleRating },dispatch] = useReducer(ProductReducer, {
        sortBy: null,
        toggleBrand : [],
        toggleRating : 5
      });


    const ProductData = ()=> {
        const [data,setData] = useState([]);
        const fetchData = async () => {
            try{
                const getData = await axios.get('/api/products');
                setData(getData.data.products);
            }
            catch(error){
                
            }
        }
        useEffect(() => {
            fetchData();
          }, []);
        return data;
    }
    const data = ProductData();

    const getSortedData = (data, sortBy) => {
        if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
          return data.sort((a, b) => b["price"] - a["price"]);
        }
    
        if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
          return data.sort((a, b) => a["price"] - b["price"]);
        }
        return data;
      };

      const getFilteredData = (data,{toggleBrand}) => { console.log(toggleBrand)
        let newFiltered = [];
        let brandFilter;
        if(toggleBrand.length !== 0 ){
          toggleBrand.map((brand)=>{
            brandFilter= data.filter(
              (item)=>item.brand.toLowerCase() === brand.toLowerCase()
            );
            newFiltered = [...newFiltered,...brandFilter];
          });
          return newFiltered;
        }
        return data
        
      };

      const getRatedData = (data,{toggleRating})=>{
        if(toggleRating === '4_ABOVE'){
            return data.filter((a)=>a.rating >= 4)
          }
          if(toggleRating === '3_ABOVE'){
            return data.filter((a)=>a.rating >= 3)
          }
          if(toggleRating === '2_ABOVE'){
            return data.filter((a)=>a.rating >= 2)
          }
          if(toggleRating === '1_ABOVE'){
            return data.filter((a)=>a.rating >= 1)
          }

          return data

      }

      const sortedData = getSortedData(data, sortBy);
      const filteredData = getFilteredData(sortedData, {toggleBrand});
      const ratedData = getRatedData(filteredData,{toggleRating});


    return(
        <ProductContext.Provider value = {{data,dispatch,sortBy,toggleBrand,toggleRating,ratedData,setSearchText,searchText}}>
            {children}
        </ProductContext.Provider>
    )
    
}

const useProductContext = ()=> useContext(ProductContext);

export {ProductProvider, useProductContext}