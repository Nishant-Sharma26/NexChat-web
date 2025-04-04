/* eslint-disable no-unused-vars */
import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { BASE_URL } from "../utils/constants"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user);
  const fetchUser = async()=>{
     
    try{
      if(user){
        return;
      }
     const res = await axios.get(BASE_URL+"/profile/view",{
      withCredentials: true,
     });
     dispatch(addUser(res.data));
     //console.log(res.data);
    }
    catch(err){
       if(err.status===400)
       navigate("/login");
       //console.log(err);
    }
  };
   useEffect(()=>{
     fetchUser();
   },[])
  return (
    <div>
      <NavBar/>
      <Outlet/>
     <Footer/>
    </div>
  )
}

export default Body
