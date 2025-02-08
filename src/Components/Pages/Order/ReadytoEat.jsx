import React, { useState } from 'react'
import { readytoEat } from "../../data/readyToEat.js"
import Card from './Card.jsx';

function ReadytoEat() {

  const [data, setData] = useState(readytoEat);

  return (
    <div className='w-full bg-white'>
      <div className='max-w-6xl mx-auto p-6'>
        <h2 className='text-2xl font-semibold'>Festive Indulgence</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {data.map(({ name, description, id, image, price, size }) => (
            <Card 
              key = {id}
              id = {id}
              name = {name}
              description={description}
              image={image}
              price={price}
              size={size}
             />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReadytoEat
