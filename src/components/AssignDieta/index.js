//importació de librerias y Hooks
import React, { useState, useEffect, useContext } from "react";
import './AssignDieta.css'
import {FirebaseContext} from "../../firebase";
const AssignDieta = () => {
  const { firebase } = useContext(FirebaseContext);
  const [users, setUsers] = useState([]);
  const [classs, setClass] = useState([]);
  const [selectedDieta, setSelectedDieta] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [availableDietas, setAvailableDietas] = useState([]);

  const unassignDieta = (assignedDietaId) => {
    firebase.db.collection("assigned2").doc(assignedDietaId).update({
      available: false,
    });
    const updatedAssignedDietas = assignedDietas.filter(
      (assignedDieta) => assignedDieta.id !== assignedDietaId
    );
    setAssignedDietas(updatedAssignedDietas);
  };

  useEffect(() => {
    firebase.db.collection("users").onSnapshot((snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    });

    firebase.db.collection("dieta").onSnapshot((snapshot) => {
      const DietaList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAvailableDietas(DietaList);
      setClass(DietaList);
    });
  }, [firebase]);

  const [assignedDietas, setAssignedDietas] = useState([]);

  useEffect(() => {
    firebase.db.collection("assigned2").onSnapshot((snapshot) => {
      const assignedList = snapshot.docs.map((doc) => ({
        id: doc.id,
        DietaId: doc.data().DietaId,
        userId: doc.data().userId,
        available: doc.data().available,
      }));
      setAssignedDietas(assignedList);
    });
  }, [firebase]);

  const assignDieta = () => {
    if (!selectedUser || !selectedDieta) {
      window.alert("Selecciona un usuario y un horario de entrenamiento.");
      return;
    }
    firebase.db.collection("assigned2").add({
      userId: selectedUser,
      DietaId: selectedDieta,
      available: true,
    });
    window.alert("Entrenamiento asignada correctamente.");
    setSelectedUser("");
    setSelectedDieta("");
  };

  const availableOptions = availableDietas
    .filter((dieta) => {
      return !assignedDietas.some(
        (assigned) =>
          assigned.DietaId === dieta.id && assigned.available === true
      );
    })
    .map((dieta) => (
      <option key={dieta.id} value={dieta.id}>
        {`dieta: ${dieta.dieta} - cantidad ${dieta.cantidad} -  Fecha inicio: ${dieta.horario}`}
      </option>
    ));

  return (
    <>
      <div className="flex flex-col ">
        <div className="bg-white p-0 rounded-lg shadow-md mt-2">
          <h2 className="text-3xl text-center font-bold leading-tight tracking-tight text-gray-900  dark:text-white h-10 ">
            ASIGNAR DIETAS
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="user"
                id="d"
                className="text-xl block font-bold  text-center"
              >
                Datos del Usuario
              </label>
              <div className=" flex justify-center items-center">
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
                className="text-xl block font-bold text-center"
              >
                Entrenamientos y horarios disponibles
              </label>
              <div className="flex justify-center items-center">
                <select
                  id="training"
                  className="bg-white py-2 pl-8 pr-4 outline-none w-1500 rounded"
                  value={selectedDieta}
                  onChange={(e) => setSelectedDieta(e.target.value)}
                >
                  <option value="">Selecciona un Entrenamiento</option>
                  {availableOptions}
                </select>
              </div>
            </div>
            <div className="flex justify-center items-center h-20">
              <button
                 onClick={assignDieta}
                className="botonAD"
              >
                Asignar Entrenamiento
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md mt-4">
          <h2 className="text-3xl font-bold text-gray-700 text-center">
            Clases asignadas
          </h2>
          <div className="space-y-4">
            {assignedDietas.map((assignedDietas) => (
              <div key={assignedDietas.id}>
                {assignedDietas.available ? (
                  <div className="border rounded-md p-4">
                    <h3 className="text-xl font-semibold">
                      Dieta: {' '}
                      { 
                        classs.find(
                          (clas) => clas.id === assignedDietas.DietaId
                        ).dieta
                      }
                    </h3>
                    <p>
                      <strong>Cliente:</strong>
                      {
                        users.find(
                          (user) => user.id === assignedDietas.userId
                        ).name
                      }
                    </p>
                    
                    <p>
                      <strong>Horario:</strong>
                      {
                        classs.find(
                          (clas) => clas.id === assignedDietas.DietaId
                        ).horario
                      }
                    </p>
                    
                    <div className=" mt-2">
                      <button
                        onClick={() => unassignDieta(assignedDietas.id)}
                        className="botonAD2"
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

export default AssignDieta;
