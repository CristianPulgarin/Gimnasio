import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import './Assign.css'
const Assign = () => {
  const { firebase } = useContext(FirebaseContext);
  const [users, setUsers] = useState([]);
  const [classs, setClass] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [availableTrainings, setAvailableTrainings] = useState([]);
  const [assignedTrainings, setAssignedTrainings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userSnapshot = await firebase.db.collection("users").get();
      const userList = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);

      const trainingSnapshot = await firebase.db.collection("training").get();
      const trainingList = trainingSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAvailableTrainings(trainingList);
      setClass(trainingList);

      const assignedSnapshot = await firebase.db.collection("assigned").get();
      const assignedList = assignedSnapshot.docs.map((doc) => ({
        id: doc.id,
        trainingId: doc.data().trainingId,
        userId: doc.data().userId,
        available: doc.data().available,
      }));
      setAssignedTrainings(assignedList);
    };

    fetchData();
  }, [firebase]);

  const assignRutina = async () => {
    if (!selectedUser || !selectedTraining) {
      window.alert("Selecciona un usuario y un horario de entrenamiento.");
      return;
    }

    await firebase.db.collection("assigned").add({
      userId: selectedUser,
      trainingId: selectedTraining,
      available: true,
    });

    const assignedSnapshot = await firebase.db.collection("assigned").get();
    const assignedList = assignedSnapshot.docs.map((doc) => ({
      id: doc.id,
      trainingId: doc.data().trainingId,
      userId: doc.data().userId,
      available: doc.data().available,
    }));
    setAssignedTrainings(assignedList);

    // Eliminar el usuario asignado de la lista desplegable
    const updatedUsers = users.filter((user) => user.id !== selectedUser);
    setUsers(updatedUsers);

    window.alert("Entrenamiento asignado correctamente.");
    setSelectedUser("");
    setSelectedTraining("");
  };


  const unassignRutina = async (assignedTrainingId) => {
    await firebase.db.collection("assigned").doc(assignedTrainingId).update({
      available: false,
    });

    const updatedAssignedTrainings = assignedTrainings.filter(
      (assignedTraining) => assignedTraining.id !== assignedTrainingId
    );
    setAssignedTrainings(updatedAssignedTrainings);
  };

  const availableOptions = availableTrainings
    .filter((training) => {
      return !assignedTrainings.some(
        (assigned) =>
          assigned.trainingId === training.id && assigned.available === true
      );
    })
    .map((training) => (
      <option key={training.id} value={training.id}>
        {`Entrenamiento: ${training.name} - Fecha inicio: ${training.day}, Hora inicio: ${training.startHour}`}
      </option>
    ));

  return (
    <>
      <div className="flex flex-col ">
        <div className="bg-white p-0 rounded-lg shadow-md mt-2">
          <h2 className="text-3xl text-center  font-bold leading-tight tracking-tight text-gray-900 dark:text-white h-10">
            ASIGNAR RUTINAS
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="user"
                id="u"
                className="text-xl block font-bold  text-center"
              >
                Datos del Usuario
              </label>
              <div className="flex justify-center items-center">
                <select
                  id="user"
                  className="bg-white py-2 pl-8 pr-4 outline-none w-1000 rounded"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  <option value="">Selecciona un usuario</option>
                  {users
                    .filter((user) => !user.blocked) // Filtra usuarios no bloqueados
                    .map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="training"
                className="text-xl block font-bold  text-center"
              >
                Entrenamientos y horarios disponibles
              </label>
              <div className="flex justify-center items-center">
                <select
                  id="training"
                  className="bg-white py-2 pl-8 pr-4 outline-none w-1000 rounded"
                  value={selectedTraining}
                  onChange={(e) => setSelectedTraining(e.target.value)}
                >
                  <option value="">Selecciona un Entrenamiento</option>
                  {availableOptions}
                </select>
              </div>
            </div>
            <div className="flex justify-center items-center h-20">
              <button
                onClick={assignRutina}
                className="botonAR"
              >
                Asignar Entrenamiento
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md mt-4">
          <h2 className="text-2xl uppercase font-bold text-gray-700 text-center">
            Clases asignadas
          </h2>
          <div className="space-y-4">
            {assignedTrainings.map((assignedTraining) => {
              const assignedClass = classs.find(
                (clas) => clas.id === assignedTraining.trainingId
              );
              const assignedUser = users.find(
                (user) => user.id === assignedTraining.userId
              );

              if (assignedTraining.available && assignedClass && assignedUser) {
                return (
                  <div key={assignedTraining.id} className="border rounded-md p-4">
                    <h3 className="text-md font-semibold">
                      Nombre del Entrenamiento Asignado: {assignedClass.name}
                    </h3>
                    <p>
                      <strong>Cliente:</strong> {assignedUser.name}
                    </p>
                    <p>
                      <strong>Categoria del entrenamiento:</strong> {assignedClass.category}
                    </p>
                    <p>
                      <strong>Hora de inicio:</strong> {assignedClass.startHour}
                    </p>
                    <p>
                      <strong>Día:</strong> {assignedClass.day}
                    </p>
                    <div className="mt-2">
                      <button
                        onClick={() => unassignRutina(assignedTraining.id)}
                        className="botonAR2"
                      >
                        Cancelar clase del cliente
                      </button>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Assign;
