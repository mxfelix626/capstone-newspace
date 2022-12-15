import React from "react";
import { useState } from "react";
import EditProfileForm from "./forms/EditProfileForm"


function EditProfile({user}) {
  const [data, setData] = useState('');

  if (!data) return <EditProfileForm setData={setData} user={user} />


  return (
    <div>
      <p> Welcome {data.username}! </p>
    </div>
  );
}

export default EditProfile;
