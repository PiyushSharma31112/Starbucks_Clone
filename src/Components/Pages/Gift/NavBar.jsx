import React from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
// import 'react-tabs/style/react-tabs.css'; // Or your custom styles
import { Congrats, AnyTime, ThankYou, Featured } from "./index"

function NavBar() {

    const links = [
        {
            id: 1,
            name: "featured"
        },
        {
            id: 2,
            name: "anytime"
        },
        {
            id: 3,
            name: "congratulations"
        },
        {
            id: 4,
            name: "thank you"
        },

    ]

  return (
    <div className="w-full p-2 bg-[#f2f0eb]">
        <Tabs className="w-full">
            <TabList className="w-full flex flex-wrap justify-between md:justify-start items-center">
                {links.map(({ id, name }) => (
                    <Tab
                        key={id}
                        className={({ selected }) =>
                            `w-auto p-4 border-b-2 ${
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
                <Featured />
            </TabPanel>

            <TabPanel>
                <AnyTime />
            </TabPanel>

            <TabPanel>
                <Congrats />
            </TabPanel>

            <TabPanel>
                <ThankYou />
            </TabPanel>
        </Tabs>
    </div>

  )
}

export default NavBar
