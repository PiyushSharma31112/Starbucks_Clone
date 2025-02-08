import React, { useState } from 'react'
import Card from './Card'
import { merchandiseData } from "../../data/Merchandise.js"

function Merchandise() {

  const [data, setData] = useState(merchandiseData);

  return (
    <div className='w-full bg-white'>
      <div className='max-w-6xl mx-auto p-6'>
        <h2 className='text-2xl font-semibold'>Anamika Khanna</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
          {data.map(({ name, description, id, image, price}) => (
            <Card 
            key = {id}
            id = {id}
            name = {name}
            description={description}
            image={image}
            price={price}
            // size={size}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Merchandise
