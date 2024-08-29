import React, { useCallback, useEffect, useState,useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa"
import Currency from '../helpers/Currency'
import addToCart from '../helpers/addToCart'
import CategoryWiseProduct from './CategoryWiseProduct'
import Context from '../context'

const ProductDetails = () => {

  
  const params = useParams()
  const [data,setData] = useState({
       productName : "",
       brandName : "",
       category : '',
       productImage : [],
       description : "",
       price : "",
       selling :"",
       
  })  

  const [loading,setLoading] = useState(false)
  const productLoading = new Array(4).fill(null)
  const [activeImage,setActiveImage] = useState("")
  const [zoom,setZoom] = useState(false)
  const [zoomCoordinate,setZoomCoordinates] = useState({
    x : 0,
    y : 0
  })

   const {fetchUserCartCount} =  useContext(Context)
   const navigate = useNavigate()

     


  const fetchProductDetails = async () =>{
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url,{
      method : SummaryApi.productDetails.method,
      headers :{
      "content-type" : "application/json"
      },
      body : JSON.stringify({
          productId : params?.id
      })
    })

   
    const dataResponse = await response.json()
    setLoading(false)
    setData(dataResponse?.productData)
    setActiveImage(dataResponse?.productData.productImage[0])  
    
  }
   

  const handleHoverimage = (imageUrl) =>{
   
    setActiveImage(imageUrl) 


  }

 

  const handleZoomImage = useCallback((e)=>{
    setZoom(true)
    const {left,top,width,height} = e.target.getBoundingClientRect()

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomCoordinates({x,y})    
   
  },[zoomCoordinate])

    const handleZoomOut = () =>{
    setZoom(false)
  }
  
 

  useEffect( ()=>{
        fetchProductDetails()
    },[params])

  const handleAddTocart = async (e,id) =>{
           await addToCart(e,id)
           await  fetchUserCartCount()
          
      }

      
   const handleBuyProduct = async(e,id)=>{
     await addToCart(e,id)
     await  fetchUserCartCount()
       navigate('/cart')

  }
      

    
  return (
    <div className='container mx-auto p-4'>

      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4 '>

      <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
        {/* product image */}

        

        <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 mt-3 relative '>
          <img src={activeImage} className='object-scale-down h-full w-full' alt={data?.productName} onMouseMove={ handleZoomImage} onMouseLeave={ handleZoomOut}  />
          {/* product zoom  */}
           {
            zoom && (
              <div className='hidden lg:block absolute min-w-[500px] min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>

          <div className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-125 overflow-hidden transition-all           
            ' style={{
              backgroundImage : `url(${activeImage})`,
              backgroundRepeat : 'no-repeat',
              backgroundPosition : ` ${zoomCoordinate.x * 100}% ${zoomCoordinate.y * 100}%`
            }}>           
            </div>
          </div> 
            )
          }
         
        </div>


        <div className='h-full'>
    {
      
      loading ? (
       <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none'>
        {

        productLoading.map(el =>{
        return(
          <div className='h-20 w-20 bg-slate-200 rounded'>{el}</div>
        )})
        }

      </div>   )

      : 
      ( 
         <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none'>
        {

      data.productImage.map( (imgurl,index) =>{
        return(

          <div className='h-24 w-24 bg-slate-200 rounded' key={index}>
           <img onMouseEnter={ ()=>{handleHoverimage(imgurl)}} src={imgurl} className='object-scale-down w-full h-full p-1 mix-blend-multiply' alt="" />
            </div>

        )
      })
        }</div> 
      )
    
    }
        </div>

       
     </div> 

     {
      loading ? (
         <div className='flex flex-col gap-2 mt-10 ml-14'>
         <p className='bg-slate-200 h-4 w-full rounded-full inline-block px-2'></p>
         <h2 className='text-xl h-4 w-full font-semibold'></h2>
         <p className='capitalize text-slate-400 h-4 w-full'></p>
         
         <div className='flex text-yellow-500 gap-1'>
          <FaStar/>
          <FaStar/>
          <FaStar/>
          <FaStar/>
          <FaStar/>       
         </div>
         <div className='flex gap-2 h-4 w-full text-2xl my-1'>
          <p className='line-through'></p>
          <p className='font-semibold text-red-500'></p>
         </div>

         <div className='flex gap-3 items-center my-4 '>
          <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[100px] font-semibold text-red-600 hover:bg-white' onClick={(e)=>{handleAddTocart(e,data?._id)}}>Buy</button>
          <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[100px] font-semibold hover:bg-red-600 hover:text-white' onClick={(e)=>{handleAddTocart(e,data?._id)}}>Add to cart</button>
         </div>

         <div>
          <h2 className='font-semibold h-4 w-full'>Description</h2>
          <p className='text-2xl h-4 w-full'></p>
         </div>
      </div>
      )
        : 
        (
           <div className='flex flex-col gap-2 mt-10 ml-14'>
         <p className='bg-red-200 rounded-full text-red-600 px-2'>{data.brandName}</p>
         <h2 className='text-xl font-semibold'>{data.productName}</h2>
         <p className='capitalize text-slate-400'>{data.category}</p>
         
         <div className='flex text-yellow-500 gap-1'>
          <FaStar/>
          <FaStar/>
          <FaStar/>
          <FaStar/>
          <FaStar/>       
         </div>
         <div className='flex gap-2 text-2xl my-1'>
          <p className='line-through'>{Currency( data?.price)}</p>
          <p className='font-semibold text-red-500'>{Currency(data?.selling)}</p>
         </div>

         <div className='flex gap-3 items-center my-4 '>
          <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[100px] font-semibold text-red-600 hover:bg-white' onClick={(e)=>{handleBuyProduct(e,data?._id)}}>Buy</button>
          <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[100px] font-semibold hover:bg-red-600 hover:text-white' onClick={(e)=>{handleAddTocart(e,data?._id)}}>Add to cart</button>
         </div>

         <div>
          <h2 className='font-semibold'>Description</h2>
          <p className='text-2xl'>{data.description}</p>
         </div>
      </div>
        )
     }

      </div>

      {
        data.category &&(
        
           <CategoryWiseProduct category={data?.category} heading={"Recommended product"}/>
          
        )
      }

   

    </div>
  )
}

export default ProductDetails
