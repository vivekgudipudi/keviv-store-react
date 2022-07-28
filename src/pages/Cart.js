import { useState } from "react";
import { UseCart } from "../contexts/cart-context";
import "../App.css";

export const Cart = () => {
  const { cart, removeFromCart, incrementItem, decrementItem } = UseCart();
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className="wrapper flex-row justify-center">
      <section className="product-container cart-container flex-row justify-center">
        {cart.length !== 0 ? (
          cart.map((item) => (
            <div
              className="cart-card flex-row justify-center align-center"
              key={item.id}
            >
              <div className="cart-img">
                <img
                  src={item.image}
                  alt="phone"
                  className="cart-img img-responsive"
                />
              </div>
              <div className="cart-details flex-column justify-sb">
                <div className="cart-item t3 semi-bold">{item.brand}</div>
                <div className="cart-item semi-bold">
                  {item.title} <br />
                </div>
                <div className="cart-item flex-row justify-sb semi-bold">
                  Quantity :
                  <button
                    className="cart-item-count-btn"
                    onClick={() => {
                      item.qty !== 1
                        ? decrementItem(item)
                        : removeFromCart(item);
                    }}
                  >
                    -
                  </button>
                  {item.qty}
                  <button
                    className="cart-item-count-btn"
                    onClick={() => incrementItem(item)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item cart-item-price bold">
                  Rs. {item.price}
                </div>
                <button
                  className="btn btn-cart-remove"
                  onClick={() => removeFromCart(item)}
                >
                  REMOVE
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1>No items added</h1>
        )}
      </section>
      <aside className=" cart-sidebar flex-column">
        <div className="side-bar-heading bold t4">PRICE DETAILS</div>
        <div className="filter-heading filter-heading-top">
          {cart.map((a) => (
            <>
              <div>
                <br />
                {a.title} ({a.memory}) [ {a.qty} x Rs.{a.qty * a.price} ]
              </div>
            </>
          ))}
        </div>

        <div className="filter-heading filter-heading-top">
          Total Price : Rs.
          {cart.reduce((acc, curr) => {
            return acc + curr.regularPrice * curr.qty;
          }, 0)}
        </div>
        <div className="filter-heading">
          Discount : Rs.
          {cart.reduce((acc, curr) => {
            return acc + curr.regularPrice * curr.qty;
          }, 0) -
            cart.reduce((acc, curr) => {
              return acc + curr.price * curr.qty;
            }, 0)}
        </div>
        <div className="filter-heading">Shipping : Free</div>
        <div className="filter-heading filter-heading-top">
          Final Price [ {cart.length} ITEMS ] : Rs.
          {cart.reduce((acc, curr) => {
            return acc + curr.price * curr.qty;
          }, 0)}
        </div>

        <div className="clear-button-content">
          <button onClick={()=>{setShowOverlay(true)}} className="btn  btn-cart-remove btn-pay t4">
            PROCEED TO PAY
          </button>
        </div>
      </aside>

      {cart.length > 0 && showOverlay && (
        <>
          <div className="overlay" onClick={()=>setShowOverlay(false)}></div>
          <div className="success-modal">
                Order placed successfully!!
          </div>
        </>
      )}
    </div>
  );
};
