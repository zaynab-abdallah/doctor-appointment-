import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "./button"
function CategorySearch  ()  {
  return (
    <div className='mb-10 items-center flex flex-col'>
      <h2 className='font-bold text-4xl mb-7'><span className='text-lime-600'>Search</span> Category</h2>
      <div className='flex w-full max-w-sm items-center gap-3'>
        <Input type='text' placeholder='search' />
        <Button type='submit'>Subscribe</Button>

      </div>
    </div>
    
  )
}

export default CategorySearch