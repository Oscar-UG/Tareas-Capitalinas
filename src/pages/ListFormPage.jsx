import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useList } from "../context/ListContext";
import { Button } from "../components/Button";
import Navbar from "../components/Navbar";
import ButtonBack from "../components/ButtonBack";

function ListFormPage() {
  const { createList, updateList } = useList();
  const { register, handleSubmit, errors: errors } = useForm();
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    try {
      if (params.id) {
        updateList(params.id, {
          ...data,
          date: dayjs(data.date).format(),
        });
      } else {
        createList({
          ...data,
          date: dayjs(data.date).format(),
        });
      }

      navigate("/lists");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Navbar />
      <ButtonBack to={"/lists"} />
      <div className="hero max-h-screen">
        <div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={onSubmit} className="card-body">
              <h2 className="mb-4 text-2xl font-bold">Lista</h2>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Nombre de la lista"
                  className="input input-bordered w-full max-w-xs"
                  autoFocus
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-500">Nombre de lista requerido</p>
                )}
              </div>
              <div className="form-control mt-6">
                <Button className={"btn btn-primary"}>Guardar datos</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListFormPage;
