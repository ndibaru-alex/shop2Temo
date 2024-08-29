import React, { useState } from 'react'
import Role from '../common/role'
import { IoMdCloseCircle } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify'; 

const changeUserRole =( {
  name,
  email,
  role,
  userId,
  onClose,
  callFunc
}) => {
    
const [userRole, setUserRole] = useState(role)
 
 function handdeOnchangeSelect(e){

    setUserRole(e.target.value)

   
 }

 const upDateUserRole = async () =>{

    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
        method : SummaryApi.updateUser.method,
        credentials : 'include',
        headers : {
            'content-type' : 'application/json'
        },
        body : JSON.stringify({
            userId : userId,
            role : userRole
        })
    })

    const dataApi = await fetchResponse.json()
    if(dataApi.success){
        toast.success(dataApi.message)
        onClose()
        callFunc()


    }

    console.log(dataApi)

    



 }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 h-full w-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
       
      <div className=' mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
         <div>
            <button className='block ml-auto' onClick={onClose}>
                 <IoMdCloseCircle/>
            </button>
           
        </div>
        <h1 className='pb-4 text-lg font-medium'> Change User Role</h1>

        <p>Name : {name}</p>
        <p>Email : {email}</p>

        <div className='flex items-center justify-between my-3'>
        <p>Role</p>
        <select className='border px-4 py-2' value={userRole} onChange={handdeOnchangeSelect} >
            {
                Object.values(Role).map(el =>{
                    return(
                        <option value={el} key={el}>{el}</option>
                    )
                    
                    
                })
            }
        </select>
        </div>

        <button className='w-fit mx-auto block border py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={upDateUserRole}>Change role</button>
        
      </div>
    </div>
  )
}

export default changeUserRole
