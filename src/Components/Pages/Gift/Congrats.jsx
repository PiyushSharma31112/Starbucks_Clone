import React, { useState } from 'react'
import { congratsData } from "../../data/giftData.js"
import { Card } from "./index.js"

function Congrats() {

  const[data, setData] = useState(congratsData) 

  return (
    <div className='w-full h-auto p-3 bg-white'>
      <h1 className='font-semibold px-4 py-2 text-2xl text-black'>Congratulations</h1>
      <hr/>
      <div className='w-full p-5 grid sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 items-center gap-10 mt-5'>
        {
          data.map( ({ id, title, description, image }) => (
            <Card
              key={id}
              id={id}
              heading={title}
              desc={description}
              img={image}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Congrats
