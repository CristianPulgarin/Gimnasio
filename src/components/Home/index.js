
import React from "react";

import './Home.css'
import { Link } from "react-router-dom";
// import Collapse from 'react-bootstrap/Collapse';


function Home() {
  

  return (
    <>
      <div className='carrousel'>
        
            <img
              className="carrouselimg"
              src="https://cdn.create.vista.com/downloads/dde5b43a-a1b0-493d-903c-3f63dc571189_1024.jpeg" // Ruta de la primera imagen
              alt="First slide"
            />
            <img
              className="carrouselimg"
              src="https://img.freepik.com/vector-premium/conjunto-diseno-camiseta-citas-tipografia-fitness-gimnasio-color-negro-rojo_514407-104.jpg"// Ruta de la primera imagen
              alt="First slide"
            />
            
            
      </div>

      <h1 className="titEntrenadores"> 
            Entrenadores
        </h1>
     <div className="contEntrenadores">
        
      <div className="cajaEntre">
        <img className="imgs" alt="leo" src="https://pbs.twimg.com/media/ELguppVWsAAsjV0.jpg"/>
        <h1 className="textE">Leonardo Mesario</h1>
        <p className="desE">Experiencia en alimentación</p>
      </div>

      <div className="cajaEntre">
        <img className="imgs" alt="nestor" src="https://www.sportyou.es/blog/wp-content/uploads/2016/02/neymarnino.jpg"/>
        <h1 className="textE">Nestor JR JR</h1>
        <p className="desE">Aumento de masa muscular</p>
      </div>

      <div className="cajaEntre">
        <img className="imgs" alt="ronald" src="https://pbs.twimg.com/media/EO9LEfcWsAAJ0ia.jpg"/>
        <h1 className="textE">Ronald Upegui</h1>
        <p className="desE">Ganar fuerza</p>
      </div>

      <div className="cajaEntre">
        <img className="imgs" alt="piedra" src="https://www.ecestaticos.com/imagestatic/clipping/e85/d36/e85d36994524515c4fb68ac5669520d6/the-rock-un-gordito-feliz-que-esconde-sus-musculos-en-central-intelligence.jpg?mtime=1622841982"/>
        <h1 className="textE">Piedra Jhonson</h1>
        <p className="desE">Perder peso</p>
      </div>

     </div>

      <h1 className="titR">
        RUTINAS
      </h1>

     <div className="contRutinas">
      <div className="cajaR">
        <img className="imgR" src="https://i.blogs.es/947e13/six-pack/1366_2000.jpeg" alt="pecho"/>
        <p className="txtR">Pecho</p>
      </div>
      <div className="cajaR">
      <img className="imgR"  src="https://i.blogs.es/ed141c/pexels-pikx-by-panther-2092479/1366_2000.jpeg" alt="Espalda"/>
        <p className="txtR">Espalda</p>
      </div>
      <div className="cajaR">
      <img className="imgR"  src="https://i.ytimg.com/vi/Xv4qExTKxbU/maxresdefault.jpg" alt="Pierna"/>

        <p className="txtR">Pierna</p>
      </div>
      <div className="cajaR">
      <img className="imgR" alt="Biceps" src="https://thumbs.dreamstime.com/b/hombres-musculares-entrenando-en-gimnasios-haciendo-ejercicios-para-bicicletas-fuertes-que-construyen-el-cuerpo-muestran-b%C3%ADceps-164090981.jpg" />
        <p className="txtR">Biceps</p>
      </div>
      <div className="cajaR">
      <img className="imgR"  src="https://t2.uc.ltmcdn.com/es/posts/6/6/0/los_mejores_ejercicios_para_los_hombros_42066_orig.jpg" alt="Hombro"/>
        <p className="txtR">Hombro</p>
      </div>
      

     </div>
     <br></br>
     
     
      <div className="planes">
      
      <h1 className="titP">
        
        PLANES
      </h1>

        <div className="contP">

          <div className="cajaP">
            <h1 className="ttp">Basico</h1>
            <h2 className="bp">Beneficios</h2>
            
            <ul className="contLp">
            <li className="txtP">
              Entrada a las instalaciones
            </li>
            <li className="txtP">
              Acceso a todas las maquinas
            </li>
            <li className="txtP">
              Derecho a un tutor
            </li>
            
            <button className="btnP"><Link
                  to="/pagar"
                  
                >
                   PAGAR
                </Link>
                </button> 
            </ul>
          </div>
          <div className="cajaP">
            <h1 className="ttp">Plan VIP</h1>
            <h2 className="bp">Beneficios</h2>
            <ul className="contLp">
            <li className="txtP">
              Todos los beneficios del basico
            </li>
            <li className="txtP">
              Acceso a la zona VIP
            </li>
            <li className="txtP">
              Entrada a un amigo gratis
            </li>
            
            <button className="btnP"><Link
                  to="/pagar"
                  
                >
                   PAGAR
                </Link>
                </button>
            </ul>
          </div>
          <div className="cajaP">
            <h1 className="ttp">Plan anual VIP</h1>
            <h2 className="bp">Beneficios</h2>
            <ul className="contLp">
            <li className="txtP">
              Ahorras más dinero
            </li>
            <li className="txtP">
              Acceso a la zona VIP
            </li>
            <li className="txtP">
              Entrada para un amigo gratis
            </li>
            
            <button className="btnP"><Link
                  to="/pagar#top"
                  
                >
                   PAGAR
                </Link>
                </button>
            
            </ul>
            
          </div>
          
        </div>
        
      </div>





    </>
  );
}

export default Home;
