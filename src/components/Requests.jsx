import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequests } from '../utils/requestSlice';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const reviewRequests = async(status,_id)=>{
        try{
        const res = axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{
            withCredentials:true,
        });
        dispatch(removeRequests(_id));
    }catch(err){

    }
    }
    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true,
            });
            dispatch(addRequests(res.data.data));
            console.log(res.data.data);
        } catch (err) {
            res.status(400).send(err.message);
        }
    };
    useEffect(() => {
        fetchRequests();
    }, []);
    console.log(requests);
    if (!requests || requests.length === 0) return <h1 className='flex justify-center my-10'>No Request Found</h1>;
    return (
        <div className="text-center my-6 px-4">
            <h1 className="text-3xl font-semibold mb-6">Connection Requests</h1>
            {requests.map((request) => {
                const { _id, firstName, lastName, photoURL, about, age, gender } = request.fromUserId;
                return (
                    <div
                        key={_id}
                        className="flex items-center justify-between m-4 p-6 rounded-lg bg-base-300 w-full max-w-4xl mx-auto"
                    >
                        <div className="flex items-center space-x-4">
                            <img
                                alt="photo"
                                className="w-20 h-20 rounded-full"
                                src={photoURL}
                            />
                            <div className="text-left">
                                <h2 className="font-medium text-xl">{firstName + " " + lastName}</h2>
                                {age && gender && <p>{age + ", " + gender}</p>}
                                <p>{about}</p>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button className="btn btn-primary px-4 py-2" onClick={()=>reviewRequests("rejected",request._id)}>Reject</button>
                            <button className="btn btn-secondary px-4 py-2"  onClick={()=>reviewRequests("accepted",request._id)}>Accept</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Requests;