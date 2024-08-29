import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/uploadProduct'
import SummaryApi from '../common'
import AdminProCard from '../components/AdminProCard'

const Products = () => {

    const [openUpload, setOpenUpload] = useState(false)
    const [allProduct, setallProduct] = useState([])


    const fetchAllProducts = async () => {

      const fetchResponse = await fetch(SummaryApi.getProduct.url,{
        method : SummaryApi.getProduct.method
      })

      const response =  await fetchResponse.json()

      setallProduct(response.data )

      

      

    }

    useEffect( () =>{
      fetchAllProducts()

    }, [])
   

  return (
   
    <div>
        <div className='bg-white flex justify-between py-2 px-4'>
            <h2 className='text-bold px-2 py-3 font-bold text-lg'>All products</h2>
            <button onClick={ () => setOpenUpload(true)} className='px-3 py-1 border-2 border-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all'> Upload Product</button>
        </div>

        <div className='flex items-center flex-wrap gap-4 py-4 overflow-y-scroll'>
        {
          allProduct.map( (product,index)=>{
            return(

              <AdminProCard data={product} key={index + 'allProduct'}
               fetchdata={fetchAllProducts}
             
              />
                          

            
            )
          })
        }
        </div>

      

        {openUpload && 
        (<UploadProduct onClose={ () => setOpenUpload(false)} fetchProducts={fetchAllProducts}/>)}

        
    </div>
  )
}

export default Products

