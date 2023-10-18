import Navbar from "../components/Navbar";
import { useTask } from "../context/TaskContext";
import { ImFileEmpty } from "react-icons/im";
import { BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../components/Loader";
import { ButtonLink } from "../components/ButtonLink";
import ButtonBack from "../components/ButtonBack";
import dayjs from "dayjs";
import { useList } from "../context/ListContext";
import { Button } from "../components/Button";

function TaskPage() {
  const { tasks, loading, updateStatus, deleteTask } = useTask();
  const { clearCurrentList, currentListId } = useList();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <ButtonBack to={"/lists"} onClick={() => clearCurrentList()} />
          {tasks.length === 0 && (
            <div className="flex justify-center items-center p-10">
              <div>
                <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
                <h1 className="font-bold text-xl">No hay tareas, agrega una</h1>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 mt-8">
            {tasks.map((task) =>
              task.list === currentListId ? (
                <div
                  className="card w-96 bg-black shadow-xl -py-8"
                  key={task._id}
                >
                  <div className="card-body">
                    <div className="flex flex-row justify-between">
                      <h2 className="card-title">{task.title}</h2>
                      <div className="form-control">
                        <label className="cursor-pointer label flex justify-end">
                          <span className="label-text mr-5 font-bold text-base">
                            Estado
                          </span>
                          <input
                            type="checkbox"
                            checked={tasks.status}
                            className="checkbox checkbox-warning"
                            onChange={() =>
                              updateStatus(task._id, !task.status)
                            }
                          />
                        </label>
                      </div>
                    </div>

                    <p className="break-words">{task.description}</p>
                    <p className="text-slate-400 mt-3 mb-5">
                      {dayjs(task.created_at).format("DD-MM-YYYY")}
                    </p>

                    <div className="card-actions flex justify-end">
                      <ButtonLink
                        to={`/tasks/${task._id}`}
                        className="btn btn-primary"
                      >
                        Editar <BiEdit className="text-xl" />
                      </ButtonLink>
                      <Button
                        onClick={() => deleteTask(task._id)}
                        className="btn btn-error"
                      >
                        Eliminar <FiDelete className="text-xl" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
          <ButtonLink to={"/add-task"} className={"btn mt-12"}>
            Agregar tarea  <IoMdAddCircleOutline className="text-3xl" />
          </ButtonLink>
        </>
      )}
    </>
  );
}

export default TaskPage;
