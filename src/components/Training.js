import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
// import * as Yup from "yup";
import { FirebaseContext } from "../firebase";

function Trainig() {
  const { firebase } = useContext(FirebaseContext);
  const [trainings, setTrainings] = useState([]);
  console.log(trainings)
  const daysOfWeek = [
    "Lunes",
    "Miércoles",
    "Sábado",
    "Martes",
    "Jueves",
    "Viernes",
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      day: "",
      startHour: "",
    },

    // validationSchema: Yup.object({
    //   name: Yup.string()
    //     .min(4, "El nombre debe tener mínimo 4 caracteres")
    //     .required("El nombre es requerido"),
    //   description: Yup.string()
    //     .min(10, "La descripción debe tener mínimo 10 caracteres")
    //     .required("La descripción es requerida"),
    //   category: Yup.string().required("Selecciona una categoría"),
    //   day: Yup.string().required("El día es requerido"),
    //   startHour: Yup.string().required("La hora de inicio es requerida"),
    // }),

    onSubmit: async (values) => {
      try {
        const trainingData = {
          name: values.name,
          description: values.description,
          category: values.category,
          day: values.day,
          startHour: values.startHour,
        };
        await firebase.db.collection("training").add(trainingData);
        window.alert("Entrenamiento agregado correctamente");
        window.location.reload();
      } catch (e) {
        window.alert("El Entrenamiento no se agrego" + e);
      }
    },
  });

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const snapshot = await firebase.db.collection("training").get();
        const trainingList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrainings(trainingList);
      } catch (error) {
        console.error("Error al obtener los entrenamientos", error);
      }
    };
    fetchTrainings();
  }, [firebase]);

  

  return (
    <>
      <div>
        <div className="col-span-2">
          <section className="bg-gray-50 dark:bg-gray-900 ">
            <div className="flex flex-col  items-center justify-center h-screen">
              <div className=" w-full md:w-1/2 bg-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl text-center  font-bold leading-tight tracking-tight text-gray-900  dark:text-white">
                    Rutinas para los usuarios 
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="mb-6">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      >
                        Nombre de la rutina
                      </label>
                      
                        
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="bg-white py-2 pl-8 pr-4 outline-none w-full rounded"
                        />
                      
                    </div>
                    {/* {formik.touched.name && formik.errors.name ? (
                      <div className="text-red-500 font-bold">
                        {formik.errors.name}
                      </div>
                    ) : null} */}

                    <div className="mb-6">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      >
                        Descripción de la rutina
                      </label>
                    
                        <textarea
                          id="description"
                          name="description"
                          required
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="bg-white font-bold py-2 pl-8 pr-4 outline-none w-full rounded"
                          rows="4"
                        />
                      
                    </div>
                    {/* {formik.touched.description && formik.errors.description ? (
                      <div className="text-red-500 font-bold">
                        {formik.errors.description}
                      </div>
                    ) : null} */}

                    <div className="mb-6">
                      <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      >
                        Categoría de la rutina
                      </label>
                      
                        <select
                          id="category"
                          name="category"
                          required
                          value={formik.values.category}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="bg-white py-2 pl-8 pr-4 outline-none w-full rounded"
                        >
                          <option value="">Selecciona una categoría</option>
                          <option value="Cardio">Cardio</option>
                          <option value="Pierna">Pierna</option>
                          <option value="Brazos">Brazos</option>
                          <option value="Abdomen">Abdomen</option>
                          <option value="Pecho">Pecho</option>
                        </select>
                      
                    </div>
                    {/* {formik.touched.category && formik.errors.category ? (
                      <div className="text-red-500 font-bold">
                        {formik.errors.category}
                      </div>
                    ) : null} */}
                    <div className="mb-4">
                      <label
                        htmlFor="day"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Horarios disponibles para asignar rutina
                      </label>
                      <select
                        id="day"
                        name="day"
                        required
                        value={formik.values.day}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      >
                        <option value="">Elija un dia</option>
                        {daysOfWeek.map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                      {/* {formik.touched.day && formik.errors.day ? (
                        <div className="text-red-500 font-bold">
                          {formik.errors.day}
                        </div>
                      ) : null} */}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="startHour"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Hora de Inicio
                      </label>
                      <select
                        id="startHour"
                        name="startHour"
                        required
                        value={formik.values.startHour}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      >
                        <option value="8:00 AM">8:00 AM</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                        <option value="7:00 PM">7:00 PM</option>
                        <option value="8:00 PM">8:00 PM</option>
                      </select>
                    </div>
                    {/* {formik.touched.startHour && formik.errors.startHour ? (
                      <div className="text-red-500 font-bold">
                        {formik.errors.startHour}
                      </div>
                    ) : null} */}
                  <div className="justify-center items-center flex">
                    <button
                      type="submit"
                      className=" text-white bg-yellow-400 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Crear rutina
                    </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* <div className="w-full px-4 bg-white">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
          {trainings.map((training) => (
            <div
              className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300"
              key={training.id}
            >
              <div
                key={training.id}
                className="bg-white p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 relative"
              >
                <h2 className="text-xl font-semibold mb-2 relative z-10">
                  {training.name}
                </h2>
                <p className="text-gray-600 relative z-10">
                  {training.description}
                </p>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">
                    Paquete de Horaios Asignados:
                  </h3>
                  <ul className="mt-2">
                    <li className="mb-2">
                      <strong>{training.day}</strong> - {training.startHour} 
                      {training.endHour} <br/>Fecha Inicio: Noviembre 1 del 2023
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
}
export default Trainig;
