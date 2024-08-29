import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BannerProduct from '../components/BannerProduct'
import CategoryList from '../components/categoryList'
import VerticalProduct from '../components/VerticalCardProduct'
import CategoryWiseProduct from '../components/CategoryWiseProduct'


const CategoryProduct = () => {
    const params = useParams()

    
    

  return (
    <div className='container mx-auto p-2'>
       <CategoryList/>
      
     
       <CategoryWiseProduct category={params.categoryName} heading={params.categoryName}/>
     
    </div>
  )
}

export default CategoryProduct
