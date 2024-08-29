import React, { useEffect, useState, useContext } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import Currency from '../helpers/Currency'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'

import Context from '../context'

const HorizontalCardProduct = ({category,heading}) => {
    const [data,setData] = useState([])
    const [loadind,setLoading]= useState(false)
    const loadingList = new Array(6).fill(null)


     const {fetchUserCartCount} =  useContext(Context)

      const handleAddTocart = async (e,id) =>{
           await addToCart(e,id)
          await  fetchUserCartCount()

      }


    const fetchData = async () =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoryProduct.data)
    }


   useEffect( () =>{
    fetchData()

   },[])

  return (
    <div className='container mx-auto py-4 px-4 my-6 '>

        <h2 className='text-2xl font-semibold py-2'>{heading}</h2>


        <div className=' flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none '>

        {
            loadind ? (
            loadingList.map((product,index)=>{
                return(
                   
         <div className='w-full  min-w-[280px] md:min-w-[370px] max-w-[280px] md:max-w-[370px] h-40 bg-white rounded-sm shadow flex animate-pulse'  key={'nddddg'+index}>
           <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] '>
            <img src={''} className='h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply' alt="" />
            
           </div>
           <div className='p-4 grid'>
                
                <h2 className='font-semibold text-ellipsis line-clamp-1'>{''}</h2>
                <p className='capitalise text-slate-600'>{' '}</p>
                <div className='flex gap-3 text-sm'>
                     <p className='text-slate-600  line-through'></p>
                    <p className='text-red-600 font-medium'></p>                  
                   
                </div>
                 <button className='bg-red-600 text-white hover:bg-red-700 px-2 py-1 rounded-full '></button> 

            </div>
        </div>               
                )
            })
            ):
          

           ( data.map((product,index)=>{
                return(   
          <Link to={'/product/'+product?._id}>           
              
         <div className='w-full  min-w-[370px] md:min-w-[370px] max-w-[280px] md:max-w-[370px] h-40 bg-white rounded-sm shadow flex'  key={index}>
           <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] '>
            <img src={product.productImage[0]} className='h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply' alt="" />
            
           </div>
           <div className='p-4 grid '>
                
                <h2 className='font-semibold text-ellipsis line-clamp-1'>{product?.productName}</h2>
                <p className='capitalise text-slate-600'>{product?.category}</p>
                <div className='flex gap-3 text-sm'>
                     <p className='text-slate-600  line-through'>{Currency(product?.price)}</p>
                    <p className='text-red-600 font-medium'>{Currency(product?.selling)}</p>                  
                   
                </div>
                 <button className='bg-yellow-500 text-white hover:bg-yellow-600 px-2 py-1 rounded-full ' onClick={ (e) =>{handleAddTocart(e,product?._id)}}>Add to Cart</button> 

            </div>
        </div> 
        </Link>               
                )
            }))
        }
        </div>

       

      
    </div>
  )
}

export default HorizontalCardProduct
