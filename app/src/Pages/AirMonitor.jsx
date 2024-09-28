import React from 'react'
import MapPart from '../Components/MapPart'

const AirMonitor = () => {
  return (
    <section>
      <div className=''>
        <div className='px-3'>
          Current Location: Kathmandu, Nepal
        </div>
        <MapPart/>  

      </div>
    </section>
  )
}

export default AirMonitor