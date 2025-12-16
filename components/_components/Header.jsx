
import React from 'react'
import Image from 'next/image'
import { Button } from "./button"
function Header  () {
const Menu =[
    {
        id:1,
        name:"Home",
        path:"/"
    },
    {
        id:1,
        name:"Explore",
        path:"/"
    },
    {
        id:1,
        name:"Contact us",
        path:"/"
    }
]



  return (
    <div className='flex items-center justify-between p-3 shadow-sm'>
    <div className='flex items-center gap-10' >
        <Image
  src="/assets/img/logo.png"
  alt="Appointment App Logo"
  width={100}
  height={100}
/>

      <ul className='md:flex gap-8 hidden'>
        {Menu.map((item, index) => (
  <li
    key={index}
    className="hover:text-lime-600 cursor-pointer hover:scale-105 transition-all"
  >
    {item.name}
  </li>
))}

      </ul>
    </div>
    <Button>Get Sterted</Button>


    </div>
  )
}

export default Header

