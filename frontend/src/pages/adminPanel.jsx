import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux';
import { FaRegUserCircle } from "react-icons/fa";
import {Link, Outlet,useNavigate} from 'react-router-dom'
import ROLE from '../common/role';




const adminPanel = () => {


  const user = useSelector( state => state?.user?.user)
  const navigate = useNavigate()

  useEffect( ()=>{
      if(user?.role !== ROLE.ADMIN){
        navigate('/')
      }
  },[user])
  
  return (
    <div className='min-h-[calc(100vh-120px)] mt-1 md:flex hidden'>

      <aside className='bg-white min-h-full w-full max-w-60 customShadow'>


        <div className='h-32 bg-orange-100 flex justify-center items-center flex-col'> 

          

          <div className='text-5xl cursor-pointer relative flex justify-center ' >
           
          {
            user?.profilePic ? (

              <img src={ user?.profilePic} className='w-14 h-14 rounded-full' alt={user?.name} />
            ) :(
                <FaRegUserCircle/>
            )
          }
        
          </div>
          <p className='capitalise text-lg font-semibold'>{user?.name}</p>
          <p className='text-sm'>{user?.role}</p>
          </div>

          <div>
            <nav className='grid p-4 '>
            <Link to={'all-users'} className='px-2 py-2 my-1 hover:bg-slate-200 bx-shodow'> All users</Link>
            <Link  to={'products'}  className='px-2 py-2 my-1 hover:bg-slate-200 bx-shodow'>Products</Link>
            </nav>
          </div>

      </aside>
      <main className='w-full h-full p-4'>
     <Outlet/>
      </main>
      
    </div>
  )
}

export default adminPanel
