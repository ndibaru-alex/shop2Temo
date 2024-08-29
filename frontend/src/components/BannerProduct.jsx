import React, { useEffect, useState } from 'react'
import desk1 from "../assets/banner/desk1.jpg"
import img2 from "../assets/banner/desks2.jpg"
import img3 from "../assets/banner/desk3.jpg"
import img4 from "../assets/banner/img4.jpg"
import img5 from "../assets/banner/desk5.jpg"

import img1Mobile from "../assets/banner/mob1.jpg"
import img2Mobile from "../assets/banner/img1_mobile.jpg"
import img5_mobile from "../assets/banner/mob3.jpg"

import { FaAnglesRight } from "react-icons/fa6"
import { FaAnglesLeft } from "react-icons/fa6"



const BannerProduct = () => {

  const desktopImages = [
   img2,desk1,img3,img4,img5
  ]

  const mobile =[img1Mobile,img2Mobile,img5_mobile]

  const [currentImage,setCurrentImage] = useState(0)

  const nextImage = () =>{
    
    if(desktopImages.length - 1 > currentImage){

       setCurrentImage( preve => preve+1)
    } 

  }

  const preveImage = () =>{
    if(currentImage !== 0){
        setCurrentImage(preve => preve-1)
    }
    
  }

  useEffect( () =>{

    const interval = setInterval( ()=>{
      if(desktopImages.length - 1 > currentImage ){
        nextImage()
      }else{
        setCurrentImage(0)
      }

    },5000)

    return () => clearInterval(interval)

  },[currentImage])

  return (
    <div className='container mx-auto px-4 rounded '>
      <div className='h-96 w-full bg-slate-200'>

        <div className='flex w-full h-full  relative overflow-hidden'>

          <div className='absolute z-20 h-full w-full md:flex hidden items-center'>
            <div className='flex justify-between w-full '>
              
              <button onClick={preveImage} className='text-3xl bg-white rounded-full p-1'><FaAnglesLeft/></button>
               <button onClick={nextImage} className='text-3xl bg-white rounded-full p-1'><FaAnglesRight/></button>
            </div>
          </div>         

        { 
          desktopImages.map( (images,index) =>{
            return(
              <div className='hidden md:flex w-full h-full min-w-full min-h-full' key={index}>

            <img src={images} alt=""  className='w-full h-full transition-all' style={{transform : `translateX(-${currentImage * 100}%)`}} />
       
             </div>

            )
          })
        }

        {/* mobile version */}

        
        { 
          mobile.map( (images,index) =>{
            return(
              <div className='w-full h-full min-w-full min-h-full md:hidden'  key={index}>

            <img src={images} alt=""   className='w-full h-full transition-all' style={{transform : `translateX(-${currentImage * 100}%)`}} />
       
             </div>

            )
          })
        }


       
        

        
        </div>
        
      </div>
    </div>
  )
}

export default BannerProduct
