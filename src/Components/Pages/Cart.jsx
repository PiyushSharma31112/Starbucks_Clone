import React, { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { toast } from "react-toastify"
import { motion, AnimatePresence } from "framer-motion"

function Cart() {
  
  const { cart, removeFromCart, clearCart } = useCart();
  
  // Handle removing an items with a toast notification

  const handleRemoveFromCart = (id, title) => {
    removeFromCart(id);
    toast.info(`item has been removed from your cart.`)
  };

  return (
    <div className="p-6 bg-gray-100 h-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>
      
      { cart.length === 0 ? (
         <p className="text-lg text-gray-600">Your cart is empty. Start adding some items!</p>
      ) : (
        <div>
          <ul className='space-y-4'>
            <AnimatePresence>
             {cart.map((item) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between bg-white shadow-md rounded-lg p-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.img || item.image || item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{item.title || item.name}</h2>
                      <p className="text-sm text-gray-600">{item.description || item.Quantity}</p>
                      <p className="font-bold text-gray-800 mt-1">₹{item.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item.id, item.title)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                </motion.li>
              ))}

            </AnimatePresence>
          </ul>
          
          <div className="mt-6 flex justify-between items-center">
              <button onClick={() => {
                clearCart()
                toast.warn("Your Cart has been cleared.")
              }}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              > 
                Clear Cart
              </button>
              <p className='text-xl font-bold text-gray-800'>
                Total: {cart.reduce((total, item) => {
                  const price = parseFloat(item.price || 0);
                  // console.log('Price for item:', item.title, price);
                  return total + price;
                }, 0).toFixed(2)}
              </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
