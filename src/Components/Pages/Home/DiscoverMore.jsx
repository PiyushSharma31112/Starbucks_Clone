import React from 'react'
import Discover from "../../../assets/Discover.jpg"
import { NavLink } from "react-router-dom"

function DiscoverMore() {
  return (
    <div className="bg-gray-100 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-8 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-green-900 text-center md:text-left">
          Learn more about the world of coffee!
        </h2>
        <NavLink
          to="/order"
          className="text-green-700 font-medium hover:underline mt-4 md:mt-0"
        >
          Discover More
        </NavLink>
      </div>

      {/* Main Section */}
      <div className="relative cursor-pointer main-section bg-white max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden">
        {/* Image */}
        <img
          src={Discover}
          alt="Coffee Art"
          className="w-full h-64 md:h-80 object-cover"
        />

        {/* Tag */}
        <div className="absolute top-4 left-4 bg-green-100 text-green-700 px-3 py-1 text-sm font-medium rounded-full shadow">
          Coffee Culture
        </div>

        {/* Content */}
        <div className="p-6 bg-white">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Art & Science Of Coffee Brewing
          </h3>
          <p className="text-gray-600 mb-4">
            Master the perfect brew with Starbucks! Learn the art and science
            of coffee brewing.
          </p>
          <NavLink to='/order' className="px-6 py-2 bg-green-700 text-white text-sm font-medium rounded-md shadow hover:bg-green-800">
            Learn More
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default DiscoverMore
