import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import {Link,useLocation,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import Role from '../common/role'
import Context from '../context'





const Header = () => {
const user = useSelector( state => state?.user?.user)
const dispatch = useDispatch()
const searchInput = useLocation()
const [search,setSearch] = useState(searchInput?.search?.split('=')[1])


const [menuDispaly , setMenuDisplay] = useState(false)

const context = useContext(Context)





const navigate = useNavigate()

 const handleLogout = async () =>{

  const fetchData = await fetch(SummaryApi.logout_user.url,{
    method : SummaryApi.logout_user.method,
    credentials : 'include'
  })


  const data= await fetchData.json()

   if(data.success){
     toast.success(data.message)
     dispatch(setUserDetails(null))
     navigate('/')


   }
   if(data.error){
     toast.error(data.message)
   }


 }

 const handleSearch = (e) =>{

  const { value} = e.target 

  setSearch(value)

  if(value){
    navigate(`/search?q=${value}`)
  }

 }



  return (
    <header className='h-16 shadow-md bg-white fixed top-0  z-40 w-full'>
      
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
       
       <div>
         <Link to={"/"}>
         <Logo w={90} h={50}/>
         </Link>
       </div>
       
         <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full pl-2'>

        <input  className='w-full outline-none ' type="text"  placeholder='search by category ..' onChange={handleSearch} value={search}/>

        <div className='text-lg min-w-[50px] h-8 flex items-center bg-yellow-600 justify-center rounded-r-full animate-pulse'><FaSearch/></div>
        
         </div>
     
      <div className='flex items-center gap-6'>
        <div className='relative  flex justify-center'>

          {
            user?._id && 
            ( <div className='text-3xl cursor-pointer' onClick={ () => setMenuDisplay( preve => !preve)}>
          {
            user?.profilePic ? (

              <img src={ user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
            ) :(
                <FaRegUserCircle/>
            )
          }
        
          </div>)
          }

          
          {
            menuDispaly && (
 
              <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded   '>
            <nav>
              {
                user?.role === Role.ADMIN && (
                  <Link to={'admin-panel/products'} className='whitespace-nowrap hover:bg-slate-200 p-2 md:block hidden'>Admin panel</Link>

                )
              }
             
            </nav>
           
          </div>
            )
          }
          
        </div>

        {
          user?._id && (
          <Link to={'/cart'}> 
        <div className='text-2xl relative'>        
        <span><FaShoppingCart/></span>
        <div className='bg-yellow-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
          <p className='text-xs'>{context.cartCount}</p>
        </div>
        </div>
        </Link>
          )
        }
       
      
      </div>

      <div>

      { user?._id ? (
        <button onClick={handleLogout} className='px-2 py-1 bg-yellow-600 hover:bg-yellow-700 rounded-full text-white'>Logout</button>
      ): (
       <Link to ={'login'}> <button className='px-2 py-1 bg-yellow-600 hover:bg-yellow-700 rounded-full text-white'>Login</button></Link>
        
      ) 

      
      }

       
      </div>
     
      
      </div>
     
    </header>
  )
}

export default Header
