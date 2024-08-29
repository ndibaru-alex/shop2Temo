
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context/index'
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {

  const dispatch = useDispatch()

  const [cartCount,setCartCount]= useState(0)

  const fetchUserDetails = async () => {

    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method : SummaryApi.current_user.method,
      credentials : "include"
    })

    const dataApi  = await dataResponse.json()

    if(dataApi.success){
       dispatch(setUserDetails(dataApi?.data))

    }    
   

  }

  const fetchUserCartCount = async () =>{
    
    const response = await fetch(SummaryApi.cartCount.url,{
      method : SummaryApi.cartCount.method,
      credentials : 'include'
    })

    const dataResponse = await response.json()

   setCartCount(dataResponse?.data?.count)

  }

  useEffect( () =>{
    fetchUserDetails(),
    fetchUserCartCount()

  },[])
  

  return (
    <>
    
    <Context.Provider value={{
      fetchUserDetails, //fetch user details
      cartCount,          // fetch cart count
      fetchUserCartCount
    }}>
   <Header/>
   <ToastContainer/>
   <main className='min-h-[calc(100vh-120px)] mt-16'>
   <Outlet/>
   </main>
  
   <Footer/>
   </Context.Provider>

     
    </>
  )
}

export default App
