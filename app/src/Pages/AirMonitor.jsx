import React from 'react'
import MapPart from '../Components/MapPart'

const AirMonitor = () => {
  return (
    <section>
      <div className=''>
        <div className='px-3 text-xl'>
          Current Location: <span className='font-semibold'>
            Kathmandu, Nepal
            </span>
        </div>
        <MapPart/>  

      </div>
    </section>
  )
}

export default AirMonitor