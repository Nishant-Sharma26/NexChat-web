import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requestSlice';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store)=>store.requests);
    const fetchRequests = async()=>{
        try{
            const res = await axios.get(BASE_URL+"/user/requests/received",{
                withCredentials:true,
            });
            dispatch(addRequests(res.data.data));
            console.log(res.data.data);
        }catch(err){
            res.status(400).send(err.message);
        }
    }
    useEffect(()=>{
        fetchRequests();
    },[])
    console.log(requests);
    if(!requests||requests.length===0) return <h1>No Request Found</h1>
  return (
    <div className='text-center my-4'>
      <h1 className='text-3xl font-semibold'>Connection Requests</h1>
      {
        requests.map((request)=>{
         const {_id,firstName,lastName,photoURL,about,age,gender} = request.fromUserId;
         return (
            <div key ={_id} className='flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
                <div>  <img alt="photo" className='w-20 h-20 rounded-full'src={photoURL}/>
                </div>
                <div className='text-left mx-6'>
                <h2 className='font-medium text-xl'>{firstName+" "+lastName}</h2>
               {age&&gender&&<p>{age+", "+gender}</p> }
                <p>{about}</p>
                </div>
              
            </div>
         );
        })
      }
    </div>
  )
}

export default Requests
