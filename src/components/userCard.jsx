/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const UserCard = ({user}) => {
     const {firstName,lastName,photoURL,age,gender,Skills,about} = user
      return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
  <figure >
    <img className="w-76"
      src={photoURL}
      alt="userImage" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {age && gender &&<p>{age+" "+gender}</p>}
    <p>{about}</p>
    <div className="card-actions my-6 justify-start">
      <button className="btn btn-primary ">ignore</button>
      <button className="btn btn-secondary mx-18">interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard;
