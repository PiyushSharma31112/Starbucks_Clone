import React, { useState } from 'react'
import { coffeeData } from "../../data/coffeeData.js"
import starbucksPanelImg from "../../../assets/starbucksPanelImg.png"
import { NavLink } from "react-router-dom"

function Barista() {

    const [data, setData] = useState(coffeeData)

    const title = "Starbucks"
    const heading = "Beverage Suscription"
    const para = "Starbucks Suscription is Back! Sip for your favourites for less. Tap for details. T&C Apply."

  return (
    <div className='w-full h-auto flex items-center flex-col mt-7 justify-center'>
        
        <div className='w-full h-auto flex  items-center justify-center'>
            <div className='w-[80%] panel h-auto flex justify-center gap-4 items-center rounded-md mb-5 py-1 px-3'>
                <div className=''>
                    <img src={starbucksPanelImg} alt="" className='h-[200px]' />
                </div>
                <div className='w-[70%] panel-text flex flex-col gap-7'>
                    <h3 className='text-white font-medium'>{title}</h3>
                    <h1 className='text-white font-semibold'>{heading}</h1>
                    <p className='text-white font-light '>{para}</p>
                </div>

                <div className='relative w-auto py-4'>
                    <NavLink to = "/order" className='bg-white text-black w-auto py-2 px-4 rounded-3xl'>
                        Know more
                    </NavLink>
                </div>
            </div>
        </div>
        
        
        {/* Handcrafted Curations */}


        <div className='w-[90%] h-auto font-bold'>
            <h1 className='text-starbucks-green text-2xl md:text-3xl text-center md:text-left font-bold'>Handcrafted Curations</h1>

            <div className='w-full flex justify-evenly flex-wrap items-center gap-4 py-6 '>
                {
                    data.map(({id, name, image}) => (
                        <NavLink to = "/order" key={id} className='flex flex-col justify-evenly items-center gap-2'>
                            <img src={image} alt="" className='rounded-full handcraft w-28 hover:border-starbucks-green cursor-pointer' />
                            <p className='font-medium text-starbucks-green'>{name}</p>
                        </NavLink>
                    ))
                }
            </div>
        
        </div>
    </div>
  )
}

export default Barista
