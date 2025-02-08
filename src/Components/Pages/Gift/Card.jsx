import React from 'react'
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';

function Card({ id, heading, desc, img, }) {

  const { addToCart } = useCart()

    const handleAddToCart = () => {
      addToCart({ id, title: heading, description: desc, img,})
    }

  return (
    <div className='max-w-sm px-2 mx-auto bg-[#f2f0eb] rounded-lg flex flex-col md:flex-row md:max-w-md items-center hover:scale-105 transition duration-300 ease-in shadow-[rgba(17,_17,_26,0.1)_0px_0px_16px]'>
          
        <img src={img} alt="" className='w-24 h-24 md:w-32 md:h-32 object-cover rounded' />      


        <div className='mt-4 md:mt-0 md:ml-4 py-3'>
          <h2 className='text-lg font-semibold text-gray-800'>{heading}</h2>
          <p className='text-gray-600 text-sm'>{desc}</p>
          <button onClick={handleAddToCart} className='mt-4 px-4 py-2 bg-green-600 text-white rounded-3xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1'>
            Add Item
          </button>
        </div>
    </div>
  )
}

export default Card
