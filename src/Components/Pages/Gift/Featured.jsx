import React, { useState } from 'react'
import { featuredData } from "../../data/featuredData.js"
import { Card, Congrats } from "./index.js"

function Featured() {

  const [data, setData] = useState(featuredData);

  return (
    <div className='w-full h-auto p-3 bg-white'>
      <h1 className='font-semibold px-4 py-2 text-2xl text-black'>Featured</h1>
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

      <Congrats />

    </div>
  )
}

export default Featured
