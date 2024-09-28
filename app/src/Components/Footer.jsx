import React from 'react'
import { footerLinks } from '../Data'

const Footer = () => {
  return (
    <footer className=' p-6 flex justify-center items-center'>
        <div className='flex gap-[3.75rem]'>
            {footerLinks.map((value,index)=>(
                <p key={index} className='text-xl'>{value}</p>
            ))}
        </div>
    </footer>
  )
}

export default Footer