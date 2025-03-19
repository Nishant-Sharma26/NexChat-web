
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants"
import axios from "axios"
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./userCard";
const Feed = () => {
  const feed = useSelector((store)=>store.feed)
 
  const dispatch = useDispatch();
  const getFeed = async() =>{
    try{
    if(feed) return;
    const res = await axios.get(BASE_URL+"/feed",{withCredentials: true});
    dispatch(addFeed(res.data));
  }
  catch(err){
      console.log(err);
  }
}

  useEffect(()=>{
    getFeed();
  },[]);
  return (
  feed && (<div className="flex justify-center my-10">
    <UserCard user={feed[0]}/>
  </div>)
  );
  
};

export default Feed
