import React from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { useState } from 'react';
import productCategory from '../helpers/productCategory'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import {toast} from 'react-toastify'



const uploadProduct = ({
  onClose,
fetchProducts
}) => {

   const [data,setData] = useState({
       productName : '',
       brandName : '',
       category : '',
       productImage : [],
       description : '',
       price : '',
       selling : ''
    })

    const [fullScreenImg,setFullScreenImg] = useState('')
    const [openFullImg,setOpenFullImg] = useState(false)

    const handleOnchange = (e) =>{
      const {name,value} =e.target

      setData( (preve) =>{
        return{
          ...preve,
          [name] : value
        }
      })

    }

    const handleUploadProduct = async (e) =>{

      const file = e.target.files[0]
      

      const uploadImageClodinary = await uploadImage(file)

      setData( (preve) =>{
        return{
          ...preve,
          productImage : [...preve.productImage, uploadImageClodinary.url ]
        }
      })    
    }

    const handelDeleteImg = async (index) =>{

      const newProductImage= [...data.productImage]

      newProductImage.splice(index, 1)

      setData( (preve) =>{
        return{
          ...preve,
          productImage : [...newProductImage]
        }
      })

    }

    const handleSubmit = async (e) =>{

      e.preventDefault()

      const uploadresponse = await fetch(SummaryApi.uploadProduct.url,{
        method : SummaryApi.uploadProduct.method,
        credentials : 'include',
        headers :{
          'content-type' : 'application/json'
        },
        body : JSON.stringify(data)
      })

      const response = await uploadresponse.json()

      if(response.success){

        toast.success(response.message)
        onClose()
        fetchProducts()

      }
      
      if(response.error){

        toast.error(response.message)

      }

      
    }

  return (
    <div className='fixed h-full w-full top-0 bottom-0 right-0 left-0 bg-slate-200 bg-opacity-50  flex justify-center items-center'>
     
     <div className='bg-white p-4 w-full max-w-2xl h-full max-h-[80%] rounded overflow-hidden'>

      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-lg'>Upload Product</h2>
       <button onClick={onClose} className='ml-auto text-lg hover:text-red-600 hover:cursor-pointer'><IoMdCloseCircle/></button>
      </div>

      <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name</label>
        <input type="text" 
         id="productName"
         value={data.productName} 
         name='productName'
         placeholder=' enter product name'
         onChange={handleOnchange}
         required
         className='p-2 bg-slate-100 border rounded '
         />

          <label htmlFor="brandName">Brand Name</label>
        <input type="text" 
         id="brandName"
         value={data.brandName} 
         name='brandName'
         placeholder=' enter brand'
         required
         onChange={handleOnchange}
         className='p-2 bg-slate-100 border rounded '
         />

          <label htmlFor="category" className='mt-3 '> Category</label>
          <select 
          name="category" 
          id="category"
          required
          value={data.category}          
          onChange={handleOnchange}
           className='p-2 bg-slate-100 border rounded '>
            <option value="">Select Category</option>
            {
              productCategory.map( (el,index) =>{
                return(
                  <option  value={el.value} key={el.value+index}>{el.lebel}</option>
                )
              })
            }

          </select>

          <label htmlFor="productImage" className='mt-3 '> Product Image</label>

         <label htmlFor="uploadImageInput">
          <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>           
            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
               <span className='text-4xl '>
                <FaCloudUploadAlt/>
                </span>
                <p className='text-sm '>Upload product image</p>
                <input id='uploadImageInput' type="file"  className='hidden' onChange={handleUploadProduct}/>              
            </div>          
          </div>
         </label>

          <div className=''>
            {
              data?.productImage[0] ? (

                <div className='flex items-center gap-2'>

                  {
                     data.productImage.map((el,index)=>{
                  return(

                    <div className='relative'>
                       <img src={el} alt='el' width={80} height={80} className='bg-slate-100 cursor-pointer' onClick={() =>{
                      setOpenFullImg(true)
                      setFullScreenImg(el)
                    }}/>

                    <div onClick={ () => {
                      handelDeleteImg(index)
                    }} className='absolute bottom-0 right-0 p-1 bg-red-600 text-white rounded-full cursor-pointer'>
                        <MdDelete/>
                    </div>
                    </div>                   
                   
                  )
                })
                  }
                </div>
              
              )
              :
             (
              <p className='text-red-600 text-xs'>upload images</p>
             )
            }
           
          </div>

        <label htmlFor="price">Price</label>
        <input type="number" 
         id="price"
         value={data.price} 
         name='price'
         required
         placeholder=' enter price'
         onChange={handleOnchange}
         className='p-2 bg-slate-100 border rounded '
         />

          <label htmlFor="selling">Selling Price</label>
        <input type="number" 
         id="selling"
         value={data.selling} 
         name='selling'
         required
         placeholder=' selling price'
         onChange={handleOnchange}
         className='p-2 bg-slate-100 border rounded '
         />

         <label htmlFor="description">Description</label>
         <textarea 
         id="description"
         required
         name='description' value={data.description}
         className='h-28 bg-slate-100 border resize-none p-1'
         placeholder='enter product description'
         onChange={handleOnchange}
         >          
         </textarea>      

      <button className='px-3 py-2 bg-red-600 text-white hover:bg-red-700'>Upload Product </button> 

      </form>
     
      
      
     </div> 
     {
       openFullImg && (
         <DisplayImage
     imgUrl={fullScreenImg}
     onClose={ () =>{
      setOpenFullImg(false)
     }}
     />

       )
     }
    

    </div>
  )
}

export default uploadProduct
