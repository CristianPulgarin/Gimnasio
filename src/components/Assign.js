//importació de librerias y Hooks
import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";

const Assign = () => {
  const { firebase } = useContext(FirebaseContext);
  const [users, setUsers] = useState([]);
  const [classs, setClass] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [availableTrainings, setAvailableTrainings] = useState([]);

  const unassignRutina = (assignedTrainingId) => {
    firebase.db.collection("assigned").doc(assignedTrainingId).update({
      available: false,
    });
    const updatedAssignedTrainings = assignedTrainings.filter(
      (assignedTraining) => assignedTraining.id !== assignedTrainingId
    );
    setAssignedTrainings(updatedAssignedTrainings);
  };

  useEffect(() => {
    firebase.db.collection("users").onSnapshot((snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    });

    firebase.db.collection("training").onSnapshot((snapshot) => {
      const trainingList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAvailableTrainings(trainingList);
      setClass(trainingList);
    });
  }, [firebase]);

  const [assignedTrainings, setAssignedTrainings] = useState([]);

  useEffect(() => {
    firebase.db.collection("assigned").onSnapshot((snapshot) => {
      const assignedList = snapshot.docs.map((doc) => ({
        id: doc.id,
        trainingId: doc.data().trainingId,
        userId: doc.data().userId,
        available: doc.data().available,
      }));
      setAssignedTrainings(assignedList);
    });
  }, [firebase]);

  const assignRutina = () => {
    if (!selectedUser || !selectedTraining) {
      window.alert("Selecciona un usuario y un horario de entrenamiento.");
      return;
    }
    firebase.db.collection("assigned").add({
      userId: selectedUser,
      trainingId: selectedTraining,
      available: true,
    });
    window.alert("Entrenamiento asignada correctamente.");
    setSelectedUser("");
    setSelectedTraining("");
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
          <h2 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900  dark:text-white h-10 ">
            Asignar rutinas
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="user"
                className="block font-bold text-gray-700 text-center"
              >
                Datos del Usuario
              </label>
              <div className="flex justify-center items-center">
                <select
                  id="user"
                  className="bg-white py-2 pl-8 pr-4 outline-none w-1500 rounded"
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
                className="block font-bold text-gray-700 text-center"
              >
                Entrenamientos y horarios disponibles
              </label>
              <div className="flex justify-center items-center">
                <select
                  id="training"
                  className="bg-white py-2 pl-8 pr-4 outline-none w-1500 rounded"
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
                className="bg-yellow-400 hover-bg-yellow-600 text-white font-bold py-2 px-4 rounded-md"
              >
                Asignar Entrenamiento
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md mt-4">
          <h2 className="text-1xl font-bold text-gray-700 text-center">
            Clases asignadas
          </h2>
          <div className="space-y-4">
            {assignedTrainings.map((assignedTraining) => (
              <div key={assignedTraining.id}>
                {assignedTraining.available ? (
                  <div className="border rounded-md p-4">
                    <h3 className="text-md font-semibold">
                      Nombre del Entrenamiento Asignado:
                      {
                        classs.find(
                          (clas) => clas.id === assignedTraining.trainingId
                        ).name
                      }
                    </h3>
                    <p>
                      <strong>Cliente:</strong>
                      {
                        users.find(
                          (user) => user.id === assignedTraining.userId
                        ).name
                      }
                    </p>
                    <p>
                      <strong>Categoria del entrenamiento:</strong>
                      {
                        classs.find(
                          (clas) => clas.id === assignedTraining.trainingId
                        ).category
                      }
                    </p>
                    <p>
                      <strong>Hora de inicio:</strong>
                      {
                        classs.find(
                          (clas) => clas.id === assignedTraining.trainingId
                        ).startHour
                      }
                    </p>
                    <p>
                      <strong>Día:</strong>
                      {
                        classs.find(
                          (clas) => clas.id === assignedTraining.trainingId
                        ).day
                      }
                    </p>
                    <div className=" mt-2">
                      <button
                        onClick={() => unassignRutina(assignedTraining.id)}
                        className="bg-yellow-400 hover-bg-yellow-600 text-white font-bold py-2 px-4 rounded-md"
                      >
                        Cancelar clase del cliente
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Assign;
