import React, { useState } from "react";
import { Link } from "react-router-dom";
import ToniFit from '../img/ToniFit.png'
import {
 
  RiMenu3Fill,
  RiCloseLine,

} from "react-icons/ri";

import './Sidebar.css'

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);


  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    < >
      <div
        className={`fixed lg:static w-[80%] md:w-[40%] lg:w-full top-0 z-50 bg-black transition-all ${sidebar ? "left-0" : "-left-full"} h-full overflow-y-auto col-span-1 p-8 border-r`}
      >
        <div className="cont">
          <Link to="/"><h1 className="uppercase w-[100px] h-[60px]  font-bold tracking-[4px]">
            <img className="logo" src={ToniFit} alt="logo Tonifit" />
          </h1></Link>
        
        </div>
        <div className="navi">
          <nav>
            <ul>
              <li>
                <Link
                  to="/"
                  className="bar flex items-center gap-4 hover:bg-red-600 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold"
                >
                  Principal
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold"
                >
              Registrar Usuario
                </Link>
              </li>
              <li>
                <Link
                  to="/training"
                  className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold"
                >
                  Registrar rutinas
                </Link>
              </li>
              <li>
                <Link
                  to="/Dieta"
                  className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold"
                >
                  Registrar dietas
                </Link>
              </li>
              <li>
                <Link
                  to="/assign"
                  className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold"
                >
                Asignar rutina
                </Link>
              </li>
              
              <li>
                <Link
                  to="/assignDieta"
                  className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold"
                >
                Asignar dietas
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold"
                >
                   Bloquear
                </Link>
              </li>
              <li>
                <Link
                  to="/pagar"
                  className="flex items-center gap-4 hover:bg-red-600 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold"
                >
                   Pagar
                </Link>
              </li>
              
            </ul>
          </nav>
         
        </div>
      </div>
      <button
        onClick={handleSidebar}
        className="block lg:hidden fixed bottom-4 right-4 hover:bg-red-600 p-2 text-white rounded-full text-2xl z-40"
      >
        {sidebar ? <RiCloseLine /> : <RiMenu3Fill />}
      </button>
      
    </>
  );
}

export default Sidebar;
