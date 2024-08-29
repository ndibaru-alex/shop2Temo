import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const categoryList = () => {

    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading,setLoading] = useState(false)

    const categoryLoading = new Array(13).fill(null)


    const fetchProductCategory = async () =>{
          setLoading(true)

         const ProductCategory = await fetch(SummaryApi.categoryProduct.url,{
          method : SummaryApi.categoryProduct.method
    })

  

    const productBycategory = await  ProductCategory.json()
    setLoading(false)
    setCategoryProduct(productBycategory?.data)

    }  
   

    useEffect( ()=>{
    fetchProductCategory()
    },[])

  return (
    <div className='container mx-auto p-4 '>

            <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
        {
            loading ?
            (
                
                   categoryLoading.map( (el,index)=>{
                    return (
                <div className='h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden bg-slate-200' key={'categoryLoading'+index}>

                </div>
                    )
                   })                 
                
            ) 
            :
            (
                 categoryProduct.map((product,index)=>{

                return(
                    <Link to={'/product-category/'+product?.category} className='cursor-pointer' key={product?.category+index}>
                    <div className='p-2 md:h-20 md:w-20 h-16 w-16 rounded-full overflow-hidden bg-slate-200 items-center justify-center'>
                        <img src={product.productImage[0]} alt={product.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                    </div>
                    <p className='text-center font-semibold text-sm md:text-base capitalize'>{product?.category}</p>
                    </Link>
                )
            })
            )
          
        }

        </div>        
      
    </div>
  )
}

export default categoryList
