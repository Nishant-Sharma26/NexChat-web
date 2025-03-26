/* eslint-disable no-unused-vars */
import { useRef, useState } from "react"
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const emailId = useRef(null);
    const password= useRef(null);
    const firstName = useRef(null);
    const lastName = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [istoggleForm,setIstoggleForm] = useState(false);
    const [Error,setError] = useState("");
    const handleLogin = async() =>{
          try{
           
            const res = await axios.post(BASE_URL+"/login",{
                emailId: emailId.current.value,
                password: password.current.value
            },{withCredentials: true});
           
             dispatch(addUser(res.data.user));
             
             return navigate("/");
          }
          catch(err){
             setError(err?.response?.data||"something went wrong");
          }
    }
    const handleSignup = async() =>{
      try{
       
        const res = await axios.post(BASE_URL+"/signup",{
            firstName:firstName.current.value,
            lastName:lastName.current.value,
            emailId: emailId.current.value,
            password: password.current.value
        },{withCredentials: true});
       
         dispatch(addUser(res.data.user));
         
         return navigate("/profile");
      }
      catch(err){
         setError(err?.response?.data||"something went wrong");
      }
}
  return (
      <div className="flex justify-center mt-16">
<fieldset className="fieldset w-92 bg-base-300 border border-base-300 p-4 rounded-box">
<label className="text-xl flex justify-center mb-4">{!istoggleForm ?"Login":"Sign Up"}</label>
{istoggleForm&&<div className="">
<label className="fieldset-label">firstName</label>
  <input type="text" ref={firstName} className="input mt-2" placeholder="firstName" />
  <label className="fieldset-label mt-2">lastName</label>
  <input type="text" ref={lastName} className="input mt-2" placeholder="lastName" />
  </div>}

  <label className="fieldset-label">Email</label>
  <input type="email" ref={emailId} className="input" placeholder="Email" />
  
  <label className="fieldset-label mt-2">Password</label>
  <input type="password"ref={password} className="input" placeholder="Password" />
  <p className="text-red-800 text-lg">{Error}</p>
  <button className="btn btn-neutral mt-4" onClick={!istoggleForm?handleLogin:handleSignup}>{!istoggleForm ?"Login":"Sign Up"}</button>
  <p className="text-green-700 textarea-md  m-auto cursor-pointer py-2" onClick={()=>setIstoggleForm(!istoggleForm)}>{!istoggleForm ?"New User? Sign Up Here":"Existing User? Login Here"}</p>
</fieldset>
      </div>
  )
}

export default Login
