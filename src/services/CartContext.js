import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload.id);

    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const { userId } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (userId) {
      const savedCart =
        JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      setCart(savedCart);
    }
  }, [userId]); // Runs only when userId changes

  const dispatch = (action) => {
    setCart((prevCart) => {
      const newCart = cartReducer(prevCart, action);
      if (userId) {
        localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart));
      }
      return newCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
