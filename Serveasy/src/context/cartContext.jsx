/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";
const CartContext = createContext();
const getLocalCartData = () => {
  let localCartData = localStorage.getItem("localCart");
  if (localCartData == []) {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};
const initialState = {
  // cart: [],
  cart: getLocalCartData(),
  totalItem: "",
  totalAmount: "",
  deliveryFee: 50,
  cartShow: false,
};
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addToCart = (
    FoodID,
    TranslatedRecipeName,
    imageurl,
    price,
    amount,
    singleProduct
  ) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        FoodID,
        TranslatedRecipeName,
        imageurl,
        price,
        amount,
        singleProduct,
      },
    });
  };
  const removeItem = (order_id) => {
    dispatch({ type: "REMOVE_ITEM", payload: order_id });
  };

  // const showCart = () => {
  //   dispatch({ type: "SHOW_CART", cartShow: !state.cartShow });
  // };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const setDecrease = (order_id) => {
    dispatch({ type: "SET_DECREMENT", payload: order_id });
  };
  const setIncrease = (order_id) => {
    dispatch({ type: "SET_INCREMENT", payload: order_id });
  };

  // add data to local storage
  // get vs set
  useEffect(() => {
    dispatch({ type: "CART_TOTAL_ITEM" });
    dispatch({ type: "CART_TOTAL_PRICE" });
    localStorage.setItem("localCart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        // showCart,
        setDecrease,
        setIncrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
