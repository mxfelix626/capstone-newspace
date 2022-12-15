import React from "react";
import { useState } from "react";
import LoginForm from "./forms/LoginForm";
import { Navigate } from 'react-router';

const Login = ({user, setUser}) => {
  const [data, setData] = useState('');
  const [err, setErr] = useState('');

  if (!user) {
    return (
      <div>
        <LoginForm setData={setData} setErr={setErr} setUser={setUser} />
        {err.message}
      </div>
    )
  }
  return <Navigate push to="/" />
}

export default Login;
