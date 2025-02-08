import React, { useState, useEffect } from 'react';
import storeImage from "../../assets/storeImage.svg";
import { storeData } from "../data/StoreData.js";

function Store() {
  const [data, setData] = useState(storeData);
  const [showPopup, setShowPopup] = useState(false);
  const [location, setLocation] = useState(null); // Change false to null (object expected)
  const [errorMessage, setErrorMessage] = useState("");
  const [nearbyStores, setNearbyStores] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Calculate distance between two coordinates
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Enable Location Functionality
  const enableLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setLocation({ latitude, longitude }); // Correctly set state
          setShowPopup(false);
          setErrorMessage("");

          // Filter stores based on distance (within 10km)
          const nearby = data.filter((store) => {
            const distance = getDistance(latitude, longitude, store.lat, store.lng);
            return distance <= 10;
          });

          setNearbyStores(nearby);
        },
        (error) => {
          setErrorMessage("Unable to find your location. Please try again.");
          setShowPopup(false);
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by your browser.");
      setShowPopup(true);
    }
  };

  const handleSearch = () => {
    if (!location) {
      setErrorMessage("Please enable location to search nearby stores.");
      return;
    }

    const filteredStores = data.filter((store) =>
      store.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    setNearbyStores(filteredStores);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center w-full h-screen bg-gray-100">
      
      {/* Left Section */}
      <div className="lg:w-1/2 p-4 ">
        {/* Search Box */}
        <div className="flex items-center w-full max-w-lg bg-white shadow rounded-md">
          <input
            type="text"
            placeholder="Find a store near you"
            value={searchInput} // Correct state handling
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full px-4 py-2 rounded-l-md focus:outline-none text-gray-700"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-green-800 text-white rounded-r-md hover:bg-green-700"
          >
            🔍
          </button>
        </div>     

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <h3 className="font-semibold text-lg">Error</h3>
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}

        {/* Nearby Stores */}
        <div className='mt-4'>
          {nearbyStores.length > 0 ? (
            <ul>
              {nearbyStores.map((store) => (
                <li key={store.id} className='p-4 bg-white shadow rounded-md mb-2'>
                  <h4 className='text-lg font-semibold text-gray-800'>{store.name}</h4>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-gray-600'>{location ? "No stores found nearby" : ""}</p>
          )}
        </div>

        {/* Right Section */}
        <div className='flex flex-col items-center lg:w-1/2 p-4 text-center'>
          <img src={storeImage} alt="Location Icon" className='w-48 h-48 mb-4' />
          <h2 className='text-2xl font-semibold text-gray-800'>Sorry! We can't seem to spot you</h2>
          <p className='text-gray-600 mt-2'>Please enable your location to find the nearest Starbucks.</p>
          <button onClick={enableLocation} className='mt-4 px-6 py-2 bg-green-800 text-white rounded-md hover:bg-green-700'>
              Enable Location
          </button>
        </div>

        {/* Popup Modal */}
        {showPopup && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-[#f2f0eb] rounded-md shadow-lg h-64 w-96 relative'>
              <img src="https://www.starbucks.in/assets/icon/Group%20566.svg" alt="" />
              <h3 className="text-lg px-5 py-3 font-medium text-black">
                Please turn on Location Service from Browser settings to allow "Starbucks" to determine your location.
              </h3>
              <div className="flex justify-center gap-2 p-5">
                <button onClick={() => setShowPopup(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                  Cancel
                </button>
                <button onClick={enableLocation} className="ml-2 px-4 py-2 bg-black text-white rounded-md hover:bg-[#212121]">
                  Allow
                </button>
              </div>
              <img src="https://www.starbucks.in/assets/icon/Group45.svg" alt="" className='absolute right-0 bottom-0' />
            </div>
          </div>
        )}
      </div>      
    </div>
  );
};

export default Store;