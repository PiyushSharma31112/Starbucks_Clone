import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// Create the Cart Context
const CartContext = createContext();

// Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);


  // Add to Cart function 

  const addToCart = (item) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((cartItem) => cartItem.id === item.id);
      if (itemExists) {
        console.log('Item already in cart:', item.title);
        toast.warning("Your Item is already in cart ")
        return prevCart;
      } else {
        console.log('Adding new item:', item.title);
        toast.success(`Item has been added to your cart!`)
        return [...prevCart, item];
      }
    });
  };
  
  // Remove from cart function

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };
  
  // Clear cart function

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart'); // Optionally clear the local storage
  };

    // 1. Load Cart from localStorage when the component mounts 

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            setCart(savedCart)
        }
    }, [setCart]) // Runs only on component mount

    // 2. Whenever the cart changes, save it to localStorage

    useEffect(() => {
        if (cart.length>0) {
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }, [cart]) // Runs every time the cart state changes

    console.log('Cart items:', cart);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook
export const useCart = () => useContext(CartContext);
