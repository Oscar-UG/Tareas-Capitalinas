import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: authErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-8">
          {authErrors.map((error, i) => (
            <div key={i} className="card w-50 bg-red-500 shadow-xl my-1">
              <div className="card-body -my-4 -mx-8">
                <p className="text-white text-center" key={i}>
                  {error}
                </p>
              </div>
            </div>
          ))}
          <h1 className="text-2xl font-bold mx-9 mt-5">Regístrate</h1>
          <form className="card-body" onSubmit={onSubmit}>
            <div className="form-control -mt-4">
              <label className="label">
                <span className="label-text">Nombre de usuario</span>
              </label>
              <input
                type="text"
                placeholder="Nombre de usuario"
                className="input input-bordered"
                {...register("username", { required: true })}
              />
            </div>
            {errors.username && (
              <p className="text-red-500">Nombre de usuario requerido</p>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contraseña</span>
              </label>
              <input
                type="password"
                placeholder="Contraseña"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
              {errors.username && (
                <p className="text-red-500">Contraseña requerida</p>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Registrarse
              </button>
            </div>
            <div className="my-4 mx-2">
              <p className="flex justify-between">
                ¿Ya tienes una cuenta?{" "}
                <Link to={"/login"} className="text-blue-400">
                  Inicia Sesión
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
