
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUserFeed } from "../utils/feedSlice";


const UserCard = ({user}) => {
     const {_id,firstName,lastName,photoURL,age,gender,about} = user;
     const dispatch = useDispatch();
     const handleSendRequest = async(status,_id)=>{
      try{
        const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,{},{
          withCredentials:true
        });
          dispatch(removeUserFeed(_id));
      }
      catch(err){
         
      }
     };
      return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
  <figure >
    <img className="w-72"
      src={photoURL}
      alt="userImage" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {age && gender &&<p>{age+" "+gender}</p>}
    <p>{about}</p>
    <div className="card-actions my-6 justify-start">
      <button className="btn btn-outline btn-primary " onClick={()=>handleSendRequest("ignored",_id)}>ignore</button>
      <button className="btn btn-outline btn-secondary mx-18"onClick={()=>handleSendRequest("interested",_id)}>interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard;
