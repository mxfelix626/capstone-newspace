import React from "react";
import { useState } from "react";
import { Navigate } from 'react-router';
import CreatePostForm from "./forms/CreatePostForm"


const CreatePost = () => {
  const [data, setData] = useState('');

  
  if (!data) {
    return (
      <div>
        <CreatePostForm setData={setData} />

      </div>
    );
  }
  return <Navigate push to="/" />
}

export default CreatePost;
