import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
// import * as Yup from "yup";
import './Training.css'
import { FirebaseContext } from "../../firebase";

function Trainig() {
  const { firebase } = useContext(FirebaseContext);
  const [trainings, setTrainings] = useState([]);
  console.log(trainings)
  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      day: "",
      startHour: "",
    },


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
                  <h1 className="text-3xl text-center  font-bold leading-tight tracking-tight text-gray-900  dark:text-white">
                    RUTINAS
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
                  

                    <div className="mb-6">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-xl font-bold text-gray-700 dark:text-white"
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
                 

                    <div className="mb-6">
                      <label
                        htmlFor="category"
                        className="block mb-2 text-xl font-bold text-gray-700 dark:text-white"
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
                   
                    <div className="mb-4">
                      <label
                        htmlFor="day"
                        className="block text-gray-700 text-xl font-bold mb-2"
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
                    
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="startHour"
                        className="block text-gray-700 text-xl font-bold mb-2"
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
                   
                  <div className="contBtnRT">
                    <button
                      type="submit"
                      className="btnRT"
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

      
    </>
  );
}
export default Trainig;
