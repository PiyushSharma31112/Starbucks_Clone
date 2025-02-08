import React, { useState } from 'react'
import {coffeeData} from "../../data/coffeeData.js"
import { Bestseller, ReadytoEat, Food, Merchandise, Drinks, CoffeeAtHome } from "./index.js"
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'


function Navbar() {
    
    const [data, setData] = useState(coffeeData)

  return (
    <div className="w-full p-2 bg-[#f2f0eb]">
        <Tabs className="w-full">
            <TabList className="w-full flex flex-wrap justify-between md:justify-start items-center">
                {data.map(({ id, name }) => (
                    <Tab
                        key={id}
                        className={({ selected }) =>
                            `w-auto p-4 border-b-2 p-3${
                                selected
                                    ? "text-green-500 underline"
                                    : "text-stabucks border-transparent hover:underline"
                            }`
                        }
                    >
                        <button className="text-[17px] uppercase font-light px-5 py-2 hover:text-stabucks hover:underline">
                            {name}
                        </button>
                    </Tab>
                ))}
            </TabList>

            <TabPanel>
                <Bestseller />
            </TabPanel>

            <TabPanel>
                <Drinks />
            </TabPanel>

            <TabPanel>
                <Food />
            </TabPanel>

            <TabPanel>
                <Merchandise />
            </TabPanel>

            <TabPanel>
                <CoffeeAtHome />
            </TabPanel>

            <TabPanel>
                <ReadytoEat />
            </TabPanel>
        </Tabs>
    </div>

  )
}

export default Navbar
