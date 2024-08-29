import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalSearchCard from '../components/VerticalSearchCard'

function SearchProduct() {
    const query = useLocation()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    
    const fetchProduct = async()=>{
        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url+query.search,{
            method : SummaryApi.searchProduct.method
        })

        
        const responseData = await response.json()
        setLoading(false)
        setData(responseData.data)  
        console.log(data)  

    }
     

    useEffect( ()=>{
        fetchProduct()
    },[query

    ])
  return (
    <div className='container mx-auto p-4'>
        {
            loading && (
                <p className='text-lg text-center'>Loading ...</p>
            )
        }

      <p className='text-lg text-center p-4 font-semibold'>{data.length} Search result </p>
      {
        data.length === 0 && !loading && (
            <p className='bg-white text-center p-4'>No data Found</p>
        )
      }
      {
        data.length !==0 && !loading && (
           <VerticalSearchCard loading={loading} data={data} />  
        )
      }
    </div>
  )
}

export default SearchProduct
