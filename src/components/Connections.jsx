import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch,useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store)=>store.connections);
    const fetchConnections = async ()=>{
        try{
            const res = await axios.get(BASE_URL+"/user/requests/connections",{
                withCredentials:true
            })
            dispatch(addConnections(res.data.data));
        }
        catch(err){
            console.log(err);
            res.status(400).send(err.message);
        }
    }
    useEffect(()=>{
        fetchConnections();
    },[])

    

    if(!connections||connections.length===0) return <h1>No Connection Found</h1>
  return (
    <div className='text-center my-4'>
      <h1 className='text-3xl font-semibold'>Connections</h1>
      {
        connections.map((connection)=>{
         const {_id,firstName,lastName,photoURL,about,age,gender} = connection;
         return (
            <div key={_id}className='flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
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

export default Connections
