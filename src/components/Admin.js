import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";
import Modal from "react-modal";

const Admin = () => {
  const { firebase } = useContext(FirebaseContext);
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [userDailys, setUserDailys] = useState([]);
  const [blockReason, setBlockReason] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    firebase.db.collection("users").onSnapshot((snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    });

    firebase.db.collection("training").onSnapshot((snapshot) => {
      const classList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClasses(classList);
    });

    firebase.db.collection("assigned").onSnapshot((snapshot) => {
      const routineList = snapshot.docs.map((doc) => ({
        id: doc.id,
        userId: doc.data().userId,
        trainingId: doc.data().trainingId,
      }));
      setUserDailys(routineList);
    });
  }, [firebase]);

  const toggleBlockUser = (userId, isBlocked) => {
    if (isBlocked) {
      firebase.db.collection("users").doc(userId).update({
        blocked: false,
      });
    } else {
      setSelectedUser(userId);
      setModalIsOpen(true);
    }
  };

  const handleBlockUser = () => {

    if (selectedUser && blockReason) {
      firebase.db.collection("users").doc(selectedUser).update({
        blocked: true,
        blockReason: blockReason,
      });
      setModalIsOpen(false);
    }
  };

  return (
    <>
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow dark:border xl:p-0 dark:bg-gray-800">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Usuarios Bloqueados
          </h1>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-1 text-center">
            {users.map((user) => (
              <div key={user.id} className="bg-white p-4 rounded-lg shadow-md">
                <strong className="block text-lg font-semibold mb-2">
                  Usuario:
                </strong>
                <p>{user.name}</p>
                <p>
                  <strong>Estado:</strong>{" "}
                  {user.blocked ? "Bloqueado" : "Desbloqueado"}
                </p>
                <button
                  onClick={() => toggleBlockUser(user.id, user.blocked)}
                  className="bg-yellow-300 hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded-md mt-4"
                >
                  {user.blocked ? "Desbloquear" : "Bloquear"}
                </button>
                <ul className="mt-4">
                  {userDailys
                    .filter((routine) => routine.userId === user.id)
                    .map((routine) => {
                      const classInfo = classes.find(
                        (c) => c.id === routine.trainingId
                      );
                      return (
                        <li key={routine.id} className="mt-2">
                          <strong>Rutina de Entrenamiento:</strong>
                          <ul>
                            <li>
                              Nombre:
                              {classInfo.name}
                            </li>
                            <li>Categoria: {classInfo.category}</li>
                            <li>
                              Hora inicio:
                              {classInfo.startHour}
                            </li>
                            <li>Hora fin:{classInfo.endHour}</li>
                          </ul>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Motivo de bloqueo"
        className="bg-white border rounded-md p-4 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        overlayClassName="bg-black bg-opacity-50 absolute inset-0"
      >
        <h2 className="text-lg font-semibold mb-2">
          Ingrese el motivo del bloqueo
        </h2>
        <textarea
          className="w-full h-32 border border-gray-300 rounded-md p-2"
          value={blockReason}
          onChange={(e) => setBlockReason(e.target.value)}
        ></textarea>
        <div className="mt-2 text-right">
          <button
            onClick={handleBlockUser}
            className="bg-yellow-400 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-md"
          >
            Confirmar bloqueo
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Admin;
