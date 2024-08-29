import React, { useContext, useState } from 'react'
import loginIcon from '../assets/assets/signin.gif'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context/index'

const Login = () => {

  const [showPassword, setShowPassword] =useState(false);

  const [data,setData] = useState(
    {
      email:'',
      password:''
    }
  )

  const navigate = useNavigate()
  const {fetchUserDetails,fetchUserCartCount} =  useContext(Context)

  

   const handlechange = (e) => {

    const {name, value} = e.target;

    setData( (preve) =>{

      return{
        ...preve,
        [name]:value
      }

    })

   }

   const handleSubmit = async (e) =>{

    e.preventDefault();

    const  dataResponse = await fetch( SummaryApi.signIn.url, {
      method : SummaryApi.signIn.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)

    })
    

    const  dataApi = await dataResponse.json()

    if(dataApi.success){

      toast.success(dataApi.message)     
      navigate('/')       
      fetchUserDetails()
      fetchUserCartCount()

      

    }
    if(dataApi.error){
      toast.error(dataApi.message)
    }

   }

  

  return (
   <section id='login '>

    <div className="mx-auto container p-4 mt-20  ">

        <div className="bg-white w-full p-2 py-5 max-w-sm mx-auto rounded">
          <div className='w-20 h-20 mx-auto '>
            <img src={loginIcon} alt="login icon" />
          </div>
          <form action="" className='pt-6 flex flex-col gap-3' onSubmit={handleSubmit}>

            <div className='grid'>
              <label htmlFor="">Email :</label>
              <div className="bg-slate-100 p-2">
                <input
                type="Email" 
                placeholder='enter email' 
                value={data.email}
                name='email'
                onChange={handlechange}
                className='w-full h-full outline-none bg-transparent ' />    
               </div>         
            </div>

            <div>
              <label htmlFor="">Password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input type={showPassword ? 'text' : 'password'} 
                placeholder='enter password' 
                onChange={handlechange}
                value={data.password}
                name='password'
                className='w-full h-full outline-none bg-transparent'/> 
                <div className='cursor-pointer' onClick={ () => setShowPassword( (preve) => !preve)}>
                  <span>
                    {
                     showPassword ? (
                     <FaEyeSlash/>
                     ) 
                     : 
                     (
                      <FaEye/>
                     )
                    }
                   
                  </span>
                  </div>   
                </div> 
             <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600 '>
             forgot password ?</Link>    
            </div>

            <div>
              <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded hover:scale-110 transition-all mx-auto block mt-4'>Login</button>
            </div>

          </form>
         
         
          <p className='my-5'>Don't have an account ? <Link to={"/sign-up"} className='text-red-600 hover:text-red-700 hover:underline'>Sign Up</Link></p>
        </div>
     
    </div>


   </section>
  )
}

export default Login

