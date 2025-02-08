import React from 'react'
import Barista from './Barista'
import ImageSlider from './ImageSlider'
import DiscoverMore from "./DiscoverMore"
import { NavLink } from 'react-router-dom'
import Pay from '../Pay'

function Home() {

  return (
    <div className='w-full h-auto'>

      <div className='w-full h-auto bg-[#1e3932] py-4 px-2'>
        <div className='w-[90%] h-[50px] p-2 flex items-center justify-end'>
          <NavLink to="/order" className='text-white w-auto border know-more text-center px-3 py-1 rounded-2xl'>
            Know more
          </NavLink>
        </div>
      </div>  
      
      <Barista />
      <ImageSlider />
      <DiscoverMore />
    </div>
  )
}

export default Home
