import React from "react";
//import logo from './logo.svg';
import './App.css';

import Header from "./pages/header/Header";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import NoMatch from "./pages/Dashboard/noMatch/noMatch";
import PostUser from "./pages/Dashboard/employee/PostUser";
import UpdateUser from "./pages/Dashboard/employee/UpdateUser";
//$env:NODE_OPTIONS="--openssl-legacy-provider"



function App() {
  return (
    //<h1 className="text-center">Hello world</h1>
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='*' element={<NoMatch/>}/>
      <Route path='employee' element={<PostUser/>}/>
     
      <Route path='employee/:id' element={<UpdateUser />} />
    </Routes>
    </>
  );
}

export default App;
