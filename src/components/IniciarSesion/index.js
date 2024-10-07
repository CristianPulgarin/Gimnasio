import React, { useEffect, useState} from "react";
import { useFormik } from "formik";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; // Firestore
import { useNavigate } from "react-router-dom"; // Para redirigir
import './IniciarSesion.css';

function IniciarSesion() {
  const firestore = getFirestore(); // Inicializar Firestore
  const navigate = useNavigate(); // Hook para redirigir
  const [loginError, setLoginError] = useState(""); // Para manejar errores de autenticación
  const [userRole, setUserRole] = useState(null); // Para almacenar el rol del usuario
console.log(userRole)
  // Inicialización del formulario con Formik
  const formik = useFormik({
    initialValues: {
      email: "", // Campo de correo electrónico
      password: "" // Campo de contraseña
    },

    // Función que se ejecuta al enviar el formulario
    onSubmit: async (values) => {
      try {
        // Buscar en Firestore Database el usuario que tenga el correo ingresado
        const usersCollectionRef = collection(firestore, "users"); // 'usuarios' es la colección en Firestore
        const q = query(usersCollectionRef, where("email", "==", values.email)); // Query para buscar por correo
        const querySnapshot = await getDocs(q); // Obtener documentos que coincidan con el query

        if (querySnapshot.empty) {
          setLoginError("Correo no encontrado. Inténtalo de nuevo.");
        } else {
          let userData = null;
          
          // Verificar si la contraseña coincide con el registro en Firestore
          querySnapshot.forEach((doc) => {
            const user = doc.data();
            if (user.password === values.password) {
              userData = user; // Si la contraseña coincide, almacenar los datos del usuario
              setUserRole(user.rol); // Guardar el rol del usuario
            }
          });

          if (userData) {
            console.log("Inicio de sesión exitoso, rol del usuario:", userData.rol);
            
            // Redirigir según el rol del usuario
            if (userData.rol === "entrenador") {
              navigate("/training"); // Redirigir a la página de entrenadores
            } else {
              navigate("/register"); // Redirigir a la página de clientes
            }
          } else {
            setLoginError("Contraseña incorrecta. Inténtalo de nuevo.");
          }
        }
      } catch (e) {
        window.alert("Error al iniciar sesión, causa --> " + e.message);
      }
    },
  });

  useEffect(() => {
    console.log("Formulario inicializado con valores:", formik.values);
  }, [formik.values]);

  return (
    <div>
      <div className="col-span-1">
        <section className="bg-white-50">
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800">
            <div className="p-8 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-3xl text-center font-bold leading-tight tracking-tight text-gray-800 dark:text-white">
                INICIAR SESIÓN
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik.handleSubmit}
              >
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-xl font-bold text-gray-700 dark:text-white"
                  >
                    Correo
                  </label>

                  <input
                    type="email"
                    id="email"
                    className="bg-white py-2 pl-8 pr-3 outline-none w-full rounded"
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

                {loginError && <p className="text-red-500">{loginError}</p>}

                <div className="contbt">
                  <button
                    type="submit"
                    className="btnRegistrar"
                  >
                    Ingresar
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

export default IniciarSesion;
