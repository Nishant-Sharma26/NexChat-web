import {  useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserCard from "./userCard";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({user}) => {
  const [firstName,setFirstName] = useState(user.firstName);
  const [lastName,setLastName] = useState(user.lastName);
  const [gender,setGender] = useState(user.gender);
  const [age,setAge] = useState(user.age);
  const [about,setAbout] = useState(user.about);
  const [photoURL,setPhotoURL] = useState(user.photoURL);
  const [showToast,setShowToast] = useState(false);

  const [error, setError] = useState(""); // Error state
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const saveProfile = async()=>{
    try{
        setError("");
        const res = await axios.patch(BASE_URL+"/profile/edit",{
          firstName,lastName,gender,age,photoURL,about,
        },{
          withCredentials:true
        });
        dispatch(addUser(res?.data?.data));
        setShowToast(true);
        setTimeout(()=>{
          setShowToast(false);
        },3000)
    }
    catch(err){
      console.log(err?.response?.data);
      setError(err?.response?.data);
    }
  }
  
  return (
    <div>
    <div className="flex justify-center my-8">
  <div className="flex justify-center mx-10">
<fieldset className="fieldset w-92 bg-base-300 border border-base-300 p-4 rounded-box">
<label className="text-xl flex justify-center mb-4">Edit Profile</label>
  <label className="fieldset-label">first Name</label>
  <input type="text" value={firstName} className="input" onChange={(e)=>setFirstName(e.target.value)} />
  <label className="fieldset-label">last Name</label>
  <input type="text" value={lastName} className="input" onChange={(e)=>setLastName(e.target.value)} />
  <label className="fieldset-label">age</label>
  <input type="number" value={age} className="input" onChange={(e)=>setAge(e.target.value)}/>
  <label className="fieldset-label">gender</label>
  <input type="text" value={gender} className="input" onChange={(e)=>setGender(e.target.value)} />
  <label className="fieldset-label">about</label>
  <input type="text" value={about} className="input" onChange={(e)=>setAbout(e.target.value)} />
  <label className="fieldset-label">photoURL</label>
  <input type="text" value={photoURL} className="input" onChange={(e)=>setPhotoURL(e.target.value)} />
  <p className="text-red-800 text-lg">{error}</p>
  <button className="btn btn-neutral mt-8" onClick={saveProfile}>Save Profile</button>
</fieldset>
      </div>
      <UserCard user={{firstName,lastName,gender,age,photoURL,about}}/>
      </div>
     {showToast && <div className="toast toast-center toast-top">
    <div className="alert alert-success">
    <span>Profile Saved successfully.</span>
  </div>   
</div>
}
      </div>
  );
}

export default EditProfile
