import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from "react-router-dom" 
import { Home, Pay, Order, Store, Gift, Register, Cart } from "./Components/Pages/index.js"
import { CartProvider } from './Components/context/CartContext.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path= '/' element= {<App />}>
      <Route path='' element={<Home />} />
      <Route path='gift' element={<Gift />} />
      <Route path='order' element={<Order />} />
      <Route path='pay' element={<Pay />} />
      <Route path='register' element={<Register />} />
      <Route path='store' element={<Store />} />
      <Route path='cart' element={<Cart />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
)
