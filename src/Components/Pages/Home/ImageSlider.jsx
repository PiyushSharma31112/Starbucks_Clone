import React, { useEffect, useState } from 'react'
import { imageSliderData } from '../../data/imageSliderData.js';
import { toast } from "react-toastify"
import { useCart } from '../../context/CartContext.jsx';

function ImageSlider() {

  const [data, setdata] = useState(imageSliderData)
  const [currentIndex, setCurrentIndex] = useState(0)

  const { addToCart }  = useCart()
 
  const handleNext = () => {

    // console.log("next button is clicked")
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  // cart component

    const handleAddToCart = (item) => {
        addToCart(item)
    }


  return (
    <div className="bg-gray-100 py-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl text-center md:text-left font-bold text-gray-800 mb-4">
          Barista Recommends
        </h2>
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 z-10"
          >
            <svg
              className="w-6 h-6 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Slider Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {data.map(({ id, name, Quantity, image, price, button }) => (
                <div
                  key={id}
                  className="min-w-full bg-white rounded-lg shadow-lg p-4 flex flex-col items-center"
                >
                  <img
                    src={image}
                    alt={price}
                    className="rounded-md mb-4 slider-img w-[400px] h-[400px] object-cover"
                  />
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <p className="text-sm text-gray-500">₹{price}</p>
                  <p className="text-sm text-gray-500">{Quantity}</p>
                  <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700" onClick={() => handleAddToCart({ id, name, price, image, Quantity })}>
                    { button }
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 z-10"
          >
            <svg
              className="w-6 h-6 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};


export default ImageSlider;