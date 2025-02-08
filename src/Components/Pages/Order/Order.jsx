import React from 'react'
import { Navbar } from "./index.js"

function Order() {
  return (
    <div className='w-full h-auto'>
      <div className='w-full h-[150px] bg-[#1e3932] py-4 px-2'>
        <div className='flex w-full justify-center p-5 h-auto items-center'>
            <div className='w-[50%] flex justify-center items-center gap-3'>
              <img src="https://www.starbucks.in/assets/icon/Location%20icon%203.svg" alt="" className='sm:ml-0 ml-10' />
              <input type="text" placeholder='No Store Selected' className='bg-transparent border-b-2 text-white outline-none w-[200px]' />
            </div>
            <div className="w-[50%] p-2 flex justify-center items-center">
              
            </div>
        </div>
      </div>

        <Navbar />
        
    </div>
  )
}

export default Order
