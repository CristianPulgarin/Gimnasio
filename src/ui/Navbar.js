import React from "react";
import './Navbar.css'


function Navbar() {
  return (
    <div className="contn" >
      
      <div className="col-span-5">
        <header className="flex flex-col md:flex-row gap-4  p-4 md:px-8 lg:px-12 w-full">
          <div className="w-full md:[60%] lg:w-[70%] flex items-center ">
            <h6 className="titnav">Bienvenido a <strong>TONIFIT</strong>,  Animate y entrena con nosotros </h6> 
          </div>
        </header>
      </div>
    </div>
  );
}

export default Navbar;
