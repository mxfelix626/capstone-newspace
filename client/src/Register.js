import React from "react";
import { useState } from "react";
import RegistrationForm from "./forms/RegistrationForm";
import { Navigate } from 'react-router';


const Register = ({setUser}) => {
  const [data, setData] = useState('');

  if (!data) {
    return (
      <div>
        <RegistrationForm setData={setData} setUser={setUser} />
      </div>
    )
  }

  return <Navigate push to="/" />
}

export default Register;
