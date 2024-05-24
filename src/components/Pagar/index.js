//Importaciones de librerias , componentes y hooks
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
// import * as Yup from "yup";

import './Pagar.css'

function Pagar() {
  //Hooks y valriables

const [estado,setEstado] = useState(true)
  
  const formik = useFormik({
    initialValues: {
      cuenta: "",
      nombre: "",
      plan: "",
    },

    
    
       
        
   
  });

  const exito = ()=>{
    setEstado(!estado)
  }

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div>
      <div id="top"></div>
      <div className="col-span-1">
        <section className="bg-white-50  ">
          <div className=" w-full md:w-1/2 bg-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 ">
            <div className="p-8 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-3xl text-center  font-bold leading-tight tracking-tight text-gray-800  dark:text-white">
                REGISTRAR USUARIOS
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik.handleSubmit}
              >
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-xl font-bold text-gray-700 dark:text-white"
                  >
                    Cuenta
                  </label>

                  <input
                    type="number"
                    id="cuenta"
                    className="bg-white py-2 pl-8 pr-3 outline-none w-full rounded"
                    required
                    value={formik.values.cuenta}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                </div>
                <div className="mb-6">
                  <label
                    htmlFor="nombre"
                    className="block mb-2 text-xl font-bold text-gray-700 dark:text-white"
                  >
                    Nombre
                  </label>


                  <input
                    type="text"
                    id="nombre"
                    className="bg-white py-2 pl-8 pr-4 outline-none w-full rounded"
                    required
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                </div>
                <div className="mb-6">
                  <label
                    htmlFor="userName"
                    className="block mb-2 text-xl font-bold text-gray-700 dark:text-white"
                  >
                    Plan
                  </label>
                  <input
                    type="text"
                    id="plan"
                    className="bg-white py-2 pl-8 pr-4 outline-none w-full rounded"
                    required
                    value={formik.values.plan}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                </div>
                <div className="contbt">
                  <button
                    type="submit"
                    className="btnRegistrar"
                    onClick={exito}
                  >
                    Realizar pago
                  </button>
                </div>
                {estado ? (<><div className="confirmar"></div></>) : (<><div className="confirmar">Pagado con exito</div></>) }


              </form>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}

export default Pagar;
