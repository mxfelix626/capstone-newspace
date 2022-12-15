import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import './App.css';
import SearchForm from "./forms/SearchForm";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile"
import Logout from "./Logout";
import CreatePost from "./CreatePost";
import EditProfile from "./EditProfile";


const App = () => {
  const [user, setUser] = useState('');


  return (
    <div className="App">
      <BrowserRouter>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home user={user} />}>
          </Route>
          <Route path="/search" element={<SearchForm />}>
          </Route>
          <Route path="/login" element={<Login user={user} setUser={setUser} />}>
          </Route>
          <Route path="/logout" element={<Logout user={user} setUser={setUser} />}>
          </Route>
          <Route path="/register" element={<Register user={user} setUser={setUser} />}>
          </Route>
          <Route path="/profile" element={<Profile user={user} />}>
          </Route>
          <Route path="/posts/new" element={<CreatePost user={user} />}>
          </Route>
          <Route path="/users/edit" element={<EditProfile user={user} />}>
          </Route>
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
