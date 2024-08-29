import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import Currency from '../helpers/Currency';

const AdminProCard = ({data,fetchdata}) => {

    const [editProduct,setEditProduc] =useState(false)
    
  return (
    
    <div className='bg-white p-4  rounded relative '>
      <div className='w-40'>
        <div className='w-32 h-32 flex justify-center items-center'>
        <img src={data.productImage[0]} alt=""  className='object-fill mx-auto h-full' />  
        </div>
    
     <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
     <div>
       <p className='font-semibold '>
        {
        Currency(data?.selling)
        }
        </p>
     </div>
     <div onClick={() =>{
        setEditProduc(true)
     }}  className='w-fit ml-auto absolute p-2 top-0 left-0 right-0 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer'>
        <MdEdit/>
     </div>
     </div>
      
     {
        editProduct && (
            <AdminEditProduct productData={data} onClose={()=>{
                setEditProduc(false)              
            }} fetchdata={fetchdata}
            />

        )
     }
     
      </div>
  )
}

export default AdminProCard
