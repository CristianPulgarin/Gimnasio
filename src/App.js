import React from "react";
import "./css/main.css";
import { Routes, Route } from "react-router";

import firebase, { FirebaseContext } from "./firebase";

import 'bootstrap/dist/css/bootstrap.min.css';


//importación de componentes
import Sidebar from "./ui/Sidebar";
import Navbar from "./ui/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Training from "./components/Training";
import Assign from "./components/Assign";
import Admin from "./components/Admin";
import Pagar from "./components/Pagar";
import AssignDieta from "./components/AssignDieta";
import Dieta from "./components/Dieta";
import IniciarSesion from "./components/IniciarSesion";

function App() {
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <div className="min-h-screen lg:grid lg:grid-cols-6">
        <div className="col-span-1 lg:col-span-2">
          <div >
            <Sidebar />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-5">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/iniciarSesion" element={<IniciarSesion />} />
            <Route path="/register" element={<Register />} />
            <Route path="/training" element={<Training />} />
            <Route path="/assign" element={<Assign />} />
            <Route path="/dieta" element={<Dieta/>}/>
            <Route path="/assignDieta" element={<AssignDieta />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/pagar" element={<Pagar/>} />
          </Routes>
        </div>
      </div>
    </FirebaseContext.Provider>
  );
}

export default App;
