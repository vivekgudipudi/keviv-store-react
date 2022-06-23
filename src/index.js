import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { ProductProvider } from "./contexts/product-context";
import { AuthProvider } from "./contexts/auth-context"
import { WishListProvider } from "./contexts/wishlist-context";
import { CartProvider } from "./contexts/cart-context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ProductProvider>
          <WishListProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </WishListProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
