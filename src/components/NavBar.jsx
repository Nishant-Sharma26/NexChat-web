import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout =  async()=>{
    try{
      axios.post(BASE_URL+"/logout",{},{withCredentials:true});
      dispatch(removeUser());
      navigate("/login");
    }
    catch(err){
      // redirect to navigate page
      console.log(err);
    }
  }
    
  return (
 <div className="navbar bg-base-200 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="text-2xl">NexChaT</Link>
  </div>
  <div className="flex gap-2">
  {user&&<div className="form-control">Welcome {user?.firstName+ " "+ user?.lastName} </div>}
    {user&&<div className="dropdown dropdown-end mx-5">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src= {user?.photoURL} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to ="/profile"className="justify-between">
          profile
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>}
  </div>
</div>
   
  )
}

export default NavBar
