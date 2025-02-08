import React, { useState } from 'react'
import Card from './Card'
import { drinksData } from "../../data/DrinksData.js"

function Drinks() {

  const [data, setData] = useState(drinksData)

  return (
    <div className = "w-full bg-white">
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">Espresso</h2>
      <p className="text-gray-500">Our smooth signature Espresso Roast with rich flavor and caramelly sweetness is at the very heart of everything we do.</p>
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

export default Drinks
