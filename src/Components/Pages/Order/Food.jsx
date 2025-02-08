import React, { useState } from 'react'
import Card from './Card'
import { foodData } from "../../data/foodData.js"

function Food() {

  const [data, setData] = useState(foodData)
  
  return (
    <div className = "w-full bg-white">
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">Sandwiches & Wraps</h2>
      <p className="text-gray-500">Signature breads made with fresh ingredients and in-house sauces.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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

export default Food
