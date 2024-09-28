import React from 'react'
import { KeyFeaturesPart } from '../Data'

const KeyFeatures = () => {
  return (
    <section>
        <header>
            <h1 className='text-[#71BCE1] font-bold text-4xl text-center my-10'>Key Features</h1>
        </header>
        <hr />
        <div className='py-4 px-8 flex justify-between '>
            {KeyFeaturesPart.map((value,index)=>(
                <div className=' p-4  w-96  flex flex-col' key={index}>
                    <div className='flex justify-center items-center'>
                        <img src={value.image} alt="image" width={240} />
                        
                    </div>
                        <h1 className='mt-7 text-center font-bold text-2xl'>{value.title}</h1>
                        <p className='p-3 text-center mt-10 font-medium'>{value.text}</p>
                    
                </div>
            ))}
        </div>
    </section>
  )
}

export default KeyFeatures