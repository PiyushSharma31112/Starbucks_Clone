import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import starbucksLogo from "../../assets/starbucksLogo.png"
import { CiSearch } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { CiMenuBurger, CiShoppingCart } from "react-icons/ci";
import  Pay  from "../Pages/Pay";

function Header() {

  // Search bar functionality

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchQuery) {
      // Redirect to search page
      console.log('search for: ', searchQuery)
    }

  }

  // Hamburger 

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen)
  }


  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav className="w-full flex sm:p-[5px] justify-between items-center shadow-md">
        <div className="w-full flex items-center p-[10px] justify-between mx-auto">
          {/* Logo */}
          <div className="w-[10%] sm:w-[15%] text-center flex justify-center items-center">
            <img src={starbucksLogo} alt="Starbucks Logo" className="w-[50px]" />
          </div>

          {/* Navigation Links (Desktop View) */}
          <div className="hidden sm:flex items-center justify-evenly w-[50%] space-x-8">
            <NavLink
              to=""
              className={({ isActive }) =>
                `font-light text-lg hover:text-stabucks ${
                  isActive ? "text-starbucks-green underline" : "text-gray-500"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/gift"
              className={({ isActive }) =>
                `font-light text-lg hover:text-stabucks ${
                  isActive ? "text-starbucks-green underline" : "text-gray-500"
                }`
              }
            >
              Gift
            </NavLink>
            <NavLink
              to="/order"
              className={({ isActive }) =>
                `font-light text-lg hover:text-stabucks ${
                  isActive ? "text-starbucks-green underline" : "text-gray-500"
                }`
              }
            >
              Order
            </NavLink>
            <button //onClick={toggleClose}
              className="font-light text-lg text-gray-500 py-2 hover:text-stabucks">
              <Pay />
            </button>
            <NavLink
              to="/store"
              className={({ isActive }) =>
                `font-light text-lg hover:text-stabucks ${
                  isActive ? "text-starbucks-green underline" : "text-gray-500"
                }`
              }
            >
              Store
            </NavLink>

          </div>
            
          {/* Search Bar (Mobile and Desktop) */}

          <div className="flex items-center w-[50%] sm:w-1/3 md:w-1/4">
            <form className="w-full" onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Looking for something specific?"
                  className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-200 text-black focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black"
                >
                  <CiSearch />
                </button>
              </div>
            </form>
          </div>
            
          {/* User Icon */}
          
          <div className="relative ml-5 cursor-pointer w-[10%] text-center flex justify-center items-center ">
            <FaUserCircle size="25px" />
          </div>
          
          <div className='relative ml-5 cursor-pointer w-[10%] text-center flex justify-center items-center '>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `font-light text-lg hover:text-stabucks ${
                  isActive ? "text-starbucks-green underline" : "text-gray-500"
                }`
              }
            >
              <CiShoppingCart size="25px" />
            </NavLink>
          </div>

          {/* Hamburger Menu for Mobile */}

          <div className="sm:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="text-black">
              <CiMenuBurger size="30px" />
            </button>
          </div>
        </div>
      </nav>
          

      {/* Mobile Navigation (Hamburger Menu) */}
 

      {isMobileMenuOpen && (
        <div className="sm:hidden w-full bg-white shadow-md absolute top-0 left-0 z-50">
          <div className="flex flex-col items-center py-4">
 
            {/* Close Button */}

            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 text-black text-2xl"
            >
              &times; {/* This is the close (X) symbol */}
            </button>

            {/* Mobile Nav Links */}

            <NavLink onClick={toggleMobileMenu}
              to=""
              className={({ isActive }) =>
                `font-light text-lg text-gray-500 py-2 hover:text-stabucks ${
                  isActive ? "text-starbucks-green underline" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink onClick={toggleMobileMenu}
              to="/gift"
              className={({ isActive }) =>
                `font-light text-lg text-gray-500 py-2 hover:text-stabucks ${
                  isActive ? "text-starbucks-green underline" : ""
                }`
              }
            >
              Gift
            </NavLink>
            <NavLink onClick={toggleMobileMenu}
              to="/order"
              className={({ isActive }) =>
                `font-light text-lg text-gray-500 py-2 hover:text-stabucks ${
                  isActive ? "text-starbucks-green underline" : ""
                }`
              }
            >
              Order
            </NavLink>
              <Pay />
            <NavLink onClick={toggleMobileMenu}
              to="/store"
              className={({ isActive }) =>
                `font-light text-lg text-gray-500 py-2 hover:text-stabucks ${
                  isActive ? "text-starbucks-green underline" : ""
                }`
              }
            >
              Store
            </NavLink>
          </div>
        </div>
      )}
    </header>

  )
}

export default Header
