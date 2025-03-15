/* eslint-disable no-unused-vars */
import { useRef } from "react"
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const emailId = useRef(null);
    const password= useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async() =>{
          try{
           
            const res = await axios.post(BASE_URL+"/login",{
                emailId: emailId.current.value,
                password: password.current.value
            },{withCredentials: true});
             dispatch(addUser(res.data));
             return navigate("/");
          }
          catch(err){
             console.log(err);
          }
    }
  return (
      <div className="flex justify-center mt-16">
<fieldset className="fieldset w-92 bg-base-300 border border-base-300 p-4 rounded-box">
<label className="text-xl flex justify-center mb-4">Login</label>
  <label className="fieldset-label">Email</label>
  <input type="email" ref={emailId} className="input" placeholder="Email" />
  
  <label className="fieldset-label mt-2">Password</label>
  <input type="password"ref={password} className="input" placeholder="Password" />
  
  <button className="btn btn-neutral mt-8" onClick={handleLogin}>Login</button>
</fieldset>
      </div>
  )
}

export default Login
