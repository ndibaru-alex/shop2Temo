import React from 'react'
import { IoMdCloseCircle } from "react-icons/io";

const DisplayImage = ({imgUrl,onClose}) => {
  return (
    <div className='fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center'>

      <div className='bg-white shadow-lg rounded max-w-7xl mx-auto'>
        <button  onClick={onClose} className='flex ml-auto hover:text-red-600 '>
        <IoMdCloseCircle />
        </button>        
        <div className=' flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
         <img src={imgUrl} alt="zoom" className='w-full h-full' />
        </div>
       
      </div>
        
      
    </div>
  )
}

export default DisplayImage
