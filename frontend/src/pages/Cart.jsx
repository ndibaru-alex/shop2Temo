import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import Currency  from '../helpers/Currency'
import { MdDelete } from "react-icons/md";


const Cart = () => {

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const context = useContext(Context)
    const loadingcart = new Array(context.cartCount).fill(null)

    const fetchCartItems = async () =>{
      setLoading(true)
        const response = await fetch(SummaryApi.viewCart.url,{
           method : SummaryApi.viewCart.method,
           credentials : 'include',
           headers : {
            'content-type' : 'application/json'
           }
        })
        setLoading(false)
        const dataApi = await response.json()

        if(dataApi.success){
          setData(dataApi.data)
        }        
 
    }

   
   
    useEffect( ()=>{
            fetchCartItems()
    },[])

     const increaseQty = async(id,qty) =>{

      const response = await fetch(SummaryApi.updateCartQuantity.url ,{
        method : SummaryApi.updateCartQuantity.method,
        credentials : 'include',
         headers: {
        'content-type': 'application/json'
       },
        body :JSON.stringify( 
        {
          _id : id ,
          quantity : qty + 1
        }
      )
      })

      const responseData = await response.json()

      if(responseData.success){

        fetchCartItems()
       

      }

    }

    const minusQuantity = async (id,qty) =>{
      if(qty >= 2){

         const response = await fetch(SummaryApi.updateCartQuantity.url,{
        method : SummaryApi.updateCartQuantity.method,
        credentials : 'include',
        headers : {
          'content-type' : 'application/json'
        },
        body : JSON.stringify({
          _id : id,
          quantity : qty - 1 
        })
      })

       const responseData = await response.json()

    if(responseData.success){
      fetchCartItems()
    }

    }  

      }

      const handleDelete = async(id) =>{

         const response = await fetch(SummaryApi.deleteCartItem.url,{
        method : SummaryApi.deleteCartItem.method,
        credentials : 'include',
        headers : {
          'content-type' : 'application/json'
        },
        body : JSON.stringify({
          _id : id,
         
        })
      })

       const responseData = await response.json()

    if(responseData.success){
      fetchCartItems()
       context.fetchUserCartCount()
    }

      }

      const totolQty = data.reduce((preve,currentValue) => preve + currentValue?.quantity,0)

      const totalPrice = data.reduce( (preve,currentValue) => preve +(currentValue.quantity * currentValue?.productId?.selling),0)
     

  return (
    <div className='container mx-auto'>
     <div className=' text-center text-lg my-3'>
      {
       data.length === 0 && !loading && (
          <p className='bg-white py-5'>No items in cart</p>
        )
      }
     </div>
     {/* view product */}
     <div className='flex flex-col lg:flex-row  gap-5 lg:justify-between mx-auto'>
     <div className='w-full max-w-3xl mt-5'>

      {
        loading ? (
          loadingcart.map((el,index )=>{
            return(
                <div key={index+'add to cart loading'} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse'>loading ...</div>
            )
          })
        
        ) : (
         
          <div>
            {
             
              data.map( (product,index) =>{
                return(
                  <div key={product?._id+index} className='w-full h-36 my-2 bg-white border rounded border-slate-300 grid grid-cols-[128px,1fr] '>
                    <div className='w-28 h-full bg-slate-200 '>
                    <img src={product?.productId?.productImage[0]} alt="" className='w-full h-28 object-scale-down mix-blend-multiply py-1'/>
                    </div>
                    <div className='px-4 py-2 relative'>
                      <div onClick={ () => handleDelete(product?._id)} className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white'><MdDelete/></div>
                       <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1 '>{product?.productId?.productName}</h2>
                       <p className='text-slate-400 capitalize '>{product?.productId?.category}</p>

                       <div className='flex items-center justify-between'>
                        <p className='font-semibold text-red-600'>{Currency(product?.productId?.selling)}</p> 
                        <p className='font-medium text-slate-600'>{Currency(product?.productId?.selling * product?.quantity)}</p> 
                       </div> 
                       
                        <div className='flex items-center gap-3 mt-2'>
                        
                        <button onClick={ ()=>increaseQty( product?._id , product?.quantity,)} className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center item-center rounded'>+</button>

                        <span>{product?.quantity}</span>

                        <button onClick={ ()=>minusQuantity( product?._id , product?.quantity,)} className='border border-red-600 text-red-600  hover:bg-red-600 hover:text-white  w-6 h-6 flex justify-center item-center rounded'>-</button>
                        
                        </div> 

                    </div>

                
                  </div>
                )

              })
            }
        
            </div>
        )
      }

     {/* total */}
     </div>

      <div className='lg:mt-5 mt-0 w-full max-w-sm'>

      {loading ? (
        <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse '>
         total ...
       </div>)
      :(
      <div className='h-36 bg-white  '>
      <h2 className='bg-red-600 text-white w-full flex justify-center font-semibold h-9 items-center'>Summary</h2>

      <div className='flex justify-between px-4 gap-2 font-medium text-lg text-slate-600 '>        
        <p>Quantity</p>
        <p className='px-2 '>{totolQty}</p>
        </div>
      
           
      <div className='flex justify-between px-4 my-4 gap-2 font-medium text-lg text-slate-600 '>
        <p>Total Amount</p>
       <p>{Currency(totalPrice)}</p>
      </div>

        <button className='w-full bg-blue-600 p-2 text-white capitalize font-bold'>Payment</button>

     </div>
      )}

      </div>
      

     </div>
     
    </div>
  )
}

export default Cart
