//Importaciones de librerias , componentes y hooks
import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
// import * as Yup from "yup";
import { FirebaseContext } from "../../firebase";
import './Register.css'

function Register() {
  //Hooks y valriables
  const { firebase } = useContext(FirebaseContext);

  //Inicialización y validaciones
  const formik = useFormik({
    initialValues: {
      name: "",
      cc: "",
      userName: "",
      email: "",
      password: "",
      blocked: false,


    },

    onSubmit: async (values) => {
      try {
        
        // Verifica si ya existe un usuario con el mismo nombre de usuario
        const existingUserByUsername = await firebase.db
          .collection("users")
          .where("userName", "==", values.userName)
          .get();

        // Verifica si ya existe un usuario con el mismo correo electrónico
        const existingUserByEmail = await firebase.db
          .collection("users")
          .where("email", "==", values.email)
          .get();

        if (!existingUserByUsername.empty) {
          window.alert("El nombre de usuario ya está en uso.");
        } else if (!existingUserByEmail.empty) {
          window.alert("El correo electrónico ya está en uso.");
        } else {
          await firebase.db.collection("users").add(values);
          window.alert("Registro exitoso");
        }
      } catch (e) {
        window.alert("Registro no exitoso, causa --> " + e);
      }
    },
  });

  useEffect(() => {
    console.log("Formulario inicializado con valores:", formik.values);
  }, [formik.values]);

  return (
    <div>
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
                    Nombre completo
                  </label>

                  <input
                    type="text"
                    id="name"
                    className="bg-white py-2 pl-8 pr-3 outline-none w-full rounded"
                    required
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                </div>
                <div className="mb-6">
                  <label
                    htmlFor="cc"
                    className="block mb-2 text-xl font-bold text-gray-700 dark:text-white"
                  >
                    Cedula 
                  </label>


                  <input
                    type="number"
                    id="cc"
                    className="bg-white py-2 pl-8 pr-4 outline-none w-full rounded"
                    required
                    value={formik.values.cc}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                </div>
                <div className="mb-6">
                  <label
                    htmlFor="userName"
                    className="block mb-2 text-xl font-bold text-gray-700 dark:text-white"
                  >
                    Usuario
                  </label>

                  <input
                    type="text"
                    id="userName"
                    className="bg-white py-2 pl-8 pr-4 outline-none w-full rounded"
                    required
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-xl font-bold text-gray-700 dark:text-white"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    id="email"
                    className="bg-white py-2 pl-8 pr-4 outline-none w-full rounded"
                    required
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-xl font-bold text-gray-700 dark:text-white"
                  >
                    Contraseña
                  </label>


                  <input
                    type="password"
                    id="password"
                    className="bg-white py-2 pl-8 pr-4 outline-none w-full rounded"
                    required
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                </div>
                <div className="contbt">
                  <button
                    type="submit"
                    className="btnRegistrar"
                  >
                    Crear cuenta
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

export default Register;
