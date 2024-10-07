//Importaciones de librerias , componentes y hooks
import React, { useContext } from "react";
import { useFormik } from "formik";
// import * as Yup from "yup";
import {FirebaseContext} from "../../firebase";

function Dieta() {
  //Hooks y valriables
  const { firebase } = useContext(FirebaseContext);

  //Inicialización y validaciones
  const formik2 = useFormik({
    initialValues: {
      
      dieta: "",
      cantidad: "",
      suplemento: "",
      horario: "",
      blocked: false,
    },


    onSubmit: async (values) => {
      try {
        // Verifica si ya existe un usuario con el mismo nombre de usuario
        

        
          await firebase.db.collection("dieta").add(values);
          window.alert("Registro exitoso");
        
      } catch (e) {
        window.alert("Registro no exitoso, causa --> " + e);
      }
    },
  });

  return (
    <div>
      <div className="col-span-1">
        <section className="bg-white-50  ">
          <div className=" w-full md:w-1/2 bg-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 ">
            <div className="p-8 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-3xl text-center  font-bold leading-tight tracking-tight text-gray-800  dark:text-white">
                REGISTRAR DIETAS
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik2.handleSubmit}
              >
                <div className="mb-6">
                  <label
                    htmlFor="cc"
                    className="block mb-2 text-xl font-bold text-gray-700 dark:text-white"
                  >
                    Nombre de la dieta
                  </label>


                  <input
                    type="text"
                    id="dieta"
                    className="bg-white py-2 pl-8 pr-4 outline-none w-full rounded"
                    required
                    value={formik2.values.dieta}
                    onChange={formik2.handleChange}
                    onBlur={formik2.handleBlur}
                  />

                </div>
                <div className="mb-6">
                  <label
                    htmlFor="userName"
                    className="block mb-2 text-xl font-bold text-gray-700 dark:text-white"
                  >
                    Cantidad
                  </label>

                  <input
                    type="text"
                    id="cantidad"
                    className="bg-white py-2 pl-8 pr-4 outline-none w-full rounded"
                    required
                    value={formik2.values.cantidad}
                    onChange={formik2.handleChange}
                    onBlur={formik2.handleBlur}
                  />

                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-xl font-bold text-gray-700 dark:text-white"
                  >
                    suplemento
                  </label>

                  <input
                    type="text"
                    id="suplemento"
                    className="bg-white py-2 pl-8 pr-4 outline-none w-full rounded"
                    required
                    value={formik2.values.suplemento}
                    onChange={formik2.handleChange}
                    onBlur={formik2.handleBlur}
                  />

                </div>
                <div className="mb-6">
                <label
                        htmlFor="startHour"
                        className="block  text-xl font-bold mb-2 outline-none w-full rounded"
                      >
                        Horario
                      </label>
                      <input
                        id="horario"
                        name="horario"
                        required
                        value={formik2.values.horario}
                        onChange={formik2.handleChange}
                        onBlur={formik2.handleBlur}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      />
                </div>
                <div className="contbt">
                  <button
                    type="submit"
                    className="btnRegistrar"
                  >
                    CREAR DIETA
                  </button>
                </div>



              </form>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}

export default Dieta;
