import React from 'react'
import { content_cloud } from '../Images'

const ContentSection = () => {
  return (
    <section className='bg-[#71BCE1] py-[3.75rem] px-[10.6rem]'>
        <div className='flex gap-16' >
          <div>
            <img src={content_cloud} alt="cloud" height={180} width={180} />
          </div>
          <div className='flex flex-col gap-6 items-startem'>
            <h1 className='font-bold text-4xl text-white'>Learn About Air Quality</h1>
            <p className='font-normal '>Educate yourself on various air pollutants and their impact.</p>
            <button className='w-28 px-6 py-4 rounded-lg bg-[#342753E6] text-white font-medium'>Explore</button>
          </div>
        </div>
    </section>
  )
}

export default ContentSection