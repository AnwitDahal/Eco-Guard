import React from 'react'
import { logoEco } from '../Images'

const Header = () => {
  return (
    <header className='mt-8'>
      <img src={logoEco} alt="" height={170} width={170} className='pl-7' />
    </header>
  )
}

export default Header