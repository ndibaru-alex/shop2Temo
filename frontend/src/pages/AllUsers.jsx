import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import { toast } from 'react-toastify'; 
import moment from 'moment'
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../components/changeUserRole';


const AllUsers = () => {

    const [allusers, setAllUsers] = useState([]);

    const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const [updateUserDetails,setUpdateUserDetails] = useState({
      email : '',
      name : "",
      role : "",
      _id : ""
    })

    const fetchAllUsers = async () =>{

        const fetchData = await fetch(SummaryApi.allUser.url,{
            method : SummaryApi.allUser.method,
            credentials : 'include'
        })

        const dataResponse = await fetchData.json()

        if(dataResponse.success){
          setAllUsers(dataResponse.data)
        }
        if(dataResponse.error)(
          toast.error(dataResponse.message)
        )
       
    }

    useEffect( ()=>{
        fetchAllUsers()
    },[])

  return (
    <div className='bg-white pb-4' >
      <table className='w-full userTable '>
        <thead>
          <tr className='bg-black text-white'>
          <th>Sr.</th>
          <th>Avartor</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created Data</th>
          <th>Action</th>
          </tr>
         
        </thead>
        <tbody className='pb-4'>
          {
            allusers.map((el,index) =>{
              return(
                <tr>
                  <td>{index + 1 }</td>
                  <td><img className='h-10 w-10 rounded-full mx-auto' src={el?. profilePic} alt="N/A" /></td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format('ll')}</td>
                  <td className=''>
                    <button className='bg-green-200 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' onClick={ () =>
                      {
                       setUpdateUserDetails(el) 
                      setOpenUpdateRole(true)
                     }
                      } 
                      >
                      <MdEdit/>
                    </button>
                    </td>
                </tr>
              )
            })

          }
        </tbody>
      </table>

      {

          openUpdateRole && (
             <ChangeUserRole onClose={ () => setOpenUpdateRole(false)}
             name={updateUserDetails.name}
             email={updateUserDetails.email}
             role={updateUserDetails.role}
             userId={updateUserDetails._id}
             callFunc={fetchAllUsers}

             />
          )
      }

     
     
    </div>
  )
}

export default AllUsers
