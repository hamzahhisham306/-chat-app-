import "./App.css";
import { useState } from "react";
import Chat from "./Chat";
import { Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Room from "./components/Room";
import SingUp from "./components/SingUp";

function App() {
  const [isSign, setSign]= useState(false);
  const handlerSign=(boll)=>{
    setSign(boll);
        
  };

  return (
       <Routes>
        <Route path="/room" element={<Room/>}/>
        <Route path="/" element={<Signin isSign={isSign} handlerSign={handlerSign}/>}/>
        <Route path="/SingUp" element={<SingUp/>}/>
        <Route path="/chat" element={<Chat/>}/>
       </Routes>

  );
}

export default App;