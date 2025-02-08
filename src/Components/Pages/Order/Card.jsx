import React from 'react'
import { useCart } from '../../context/CartContext'

function Card({ id, name, description, image, price, size}) {

  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({ id, name, description, image, price, size  })
  }

  return (
    <div className="max-w-sm p-4 bg-white rounded-2xl hover:scale-105 transition duration-300 ease-in shadow-[rgba(17,_17,_26,0.1)_0px_0px_16px]">
      <div className="relative w-full flex gap-3 rounded-xl overflow-hidden">
        <img
          src={image}
          alt="Caffe Americano"
          className="md:w-auto w-[100px] h-[100px] object-cover rounded-full p-2"
        />
        <div className="">
          <h3 className="text-md font-semibold">{name}</h3>
          <p className="text-xs text-gray-500">{size}</p>
          <p className="text-xs text-gray-600 mt-2">
            {description}
          </p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-semibold">₹{price}</span>
        <button
          className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-full cursor-pointer"
          onClick={handleAddToCart}
        >
          Add Item
        </button>
      </div>
    </div>
);
};

export default Card
