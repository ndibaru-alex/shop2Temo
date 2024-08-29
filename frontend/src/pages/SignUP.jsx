import React, { useState } from 'react'
import loginIcon from '../assets/assets/signin.gif'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';



const SignUP = () => {
  const [showPassword, setShowPassword] =useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);

  const [data,setData] = useState(
    {
      name:'',
      email:'',
      password:'',
      confirmpassword:'',
      profilePic:''

      
    }
  );

  const navigate = useNavigate()

   const handlechange = (e) => {

    const {name, value} = e.target;

    setData( (preve) =>{

      return{
        ...preve,
        [name]:value,
      }

    })

   }

   const handleSubmit = async (e) =>{

    e.preventDefault();

    if(data.password === data.confirmpassword){

      const dataResponse = await fetch(SummaryApi.signUp.url,{
       method : SummaryApi.signUp.method,
       headers: {
        'content-type': 'application/json'
       },
       body : JSON.stringify(data)
    })

    const datas = await dataResponse.json()

    if(datas.success){
       toast.success(datas.message)
       navigate('/login')

    }
    if(datas.error){
      toast.error(datas.message)

    }

      

    }
    else{
      toast.error("Password do naot match")
    }


    

    

    

   }
   const handleUploadPic = async(e) =>{

    const file = e.target.files[0];
    const imagePic= await imageTobase64(file);

    setData( (preve)=>{
       
      return{
        ...preve,
        profilePic: imagePic
      }

    })

   }

  return (
    <section id='signup'>

    <div className="mx-auto container p-4 mt-20  ">

        <div className="bg-white w-full p-2 py-5 max-w-sm mx-auto rounded">
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full '>
           <div>
             <img src={data.profilePic || loginIcon} alt="login icon" />
           </div>
           <form >
            
            <label>
              
              <div className='cursor-pointer text-xs bg-opacity-80 pb-4 pt-2 bg-slate-200 py-4 text-center absolute bottom-0 w-full'>
                Upload Photo
             </div>
             <input type="file" className='hidden' onChange={handleUploadPic} />          
            </label>              
           </form>
           
          </div>
          <form className='pt-6 flex flex-col gap-3' onSubmit={handleSubmit}>

             <div className='grid'>
              <label htmlFor="">Name :</label>
              <div className="bg-slate-100 p-2">
                <input
                type="text" 
                placeholder='enter your name' 
                value={data.name}
                name='name'
                required
                onChange={handlechange}
                className='w-full h-full outline-none bg-transparent ' />    
               </div>         
            </div>

            <div className='grid'>
              <label htmlFor="">Email :</label>
              <div className="bg-slate-100 p-2">
                <input
                type="Email" 
                placeholder='enter email' 
                value={data.email}
                name='email'
                required
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
                required
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
              
            </div>
             <div>
              <label htmlFor="">Confirm Password</label>
              <div className="bg-slate-100 p-2 flex">
                <input type={showConfirmPassword ? 'text' : 'password'} 
                placeholder='enter password' 
                onChange={handlechange}
                value={data.confirmpassword}
                name='confirmpassword'
                required
                className='w-full h-full outline-none bg-transparent'/> 
                <div className='cursor-pointer' onClick={ () => setShowConfirmPassword( (preve) => !preve)}>
                  <span>
                    {
                     showConfirmPassword ? (
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
              
            </div>

            <div>
              <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded hover:scale-110 transition-all mx-auto block mt-4'>Signup</button>
            </div>

          </form>
         
         
          <p className='my-5'>Already have an account ? <Link to={"/login"} className='text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>
        </div>
        <div className='already'> 

        </div>
     
    </div>


   </section>
  )
}

export default SignUP
