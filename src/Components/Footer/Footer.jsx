import React from 'react'
import starbucksLogo from "../../assets/starbucksLogo.png"
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full bg-starbucks-green text-white">
      <div className="container mx-auto w-[90%] max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
          {/* Column 1: Starbucks Logo and Information */}
        
          <div className="flex flex-col">
            <img
              src={starbucksLogo}
              alt="Starbucks Logo"
              className="w-12 mx-auto sm:mx-0"
            />
          </div>

          {/* Column 2: About Us */}

          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-lg text-center sm:text-left">About Us</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm sm:text-sm hover:text-gray-500">Our Heritage</a></li>
              <li><a href="#" className="text-sm sm:text-sm hover:text-gray-500">Coffeehouse</a></li>
              <li><a href="#" className="text-sm sm:text-sm hover:text-gray-500">Our Company</a></li>
            </ul>
          </div>

          {/* Column 3: Responsibility */}

          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-lg text-center sm:text-left">Responsibility</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm sm:text-sm hover:text-gray-500">Diversity</a></li>
              <li><a href="#" className="text-sm sm:text-sm hover:text-gray-500">Community</a></li>
              <li><a href="#" className="text-sm sm:text-sm hover:text-gray-500">Ethical Sourcing</a></li>
              <li><a href="#" className="text-sm sm:text-sm hover:text-gray-500">Environmental Stewardship</a></li>
              <li><a href="#" className="text-sm sm:text-sm hover:text-gray-500">Learn More</a></li>

            </ul>
          </div>

          {/* Column 4: Quick Links */}
          
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-lg text-center sm:text-left">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm sm:text-sm hover:text-gray-500">Privacy Policy</a></li>
              <li><a href="#" className="text-sm sm:text-sm hover:text-gray-500">FAQs</a></li>
              <li><a href="#" className="text-sm sm:text-sm hover:text-gray-500">Starbucks India Mobile App Terms of Use</a></li>
              <li><a href="#" className="text-sm sm:text-sm hover:text-gray-500">Customer Service</a></li>
              <li><a href="#" className="text-sm sm:text-sm hover:text-gray-500">Delivery</a></li>
              <li><a href="#" className="text-sm sm:text-sm hover:text-gray-500">Season's Gifting</a></li>
              <li><a href="#" className="text-sm sm:text-sm hover:text-gray-500">Loyalty Program Terms and Conditions</a></li>
              <li><a href="#" className="text-sm sm:text-sm hover:text-gray-500">Classics Combo Offer</a></li>
              <li><a href="#" className="text-sm sm:text-sm hover:text-gray-500">Holiday Cheers! - 2024</a></li>
              <li><a href="#" className="text-sm sm:text-sm hover:text-gray-500">Beverage Subscription</a></li>
            </ul>
          </div>
        

          {/* column 5: social media  */}

          <div className="flex flex-col justify-center sm:justify-start">
              <h3 className="font-semibold text-lg text-center sm:text-left">Social Media</h3>
              <div className='flex gap-4 items-center py-2'>
                <FaFacebookF size="25px" />
                <FaInstagram size="25px"/>
                <FaTwitter size="25px" />
              </div>
            </div>

          {/* Column 6:  */}

          <div>
            <img src="https://www.starbucks.in/assets/images/appstoreiOS.png" alt="" />
            <img src="https://www.starbucks.in/assets/images/appstoreAndroid.png" alt="" />
          </div>

        </div>
        
        {/* Bottom Area */}

        
        <div className="text-center mt-10 text-sm sm:text-sm">
          <p>&copy; 2025 Starbucks Coffee Company. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
