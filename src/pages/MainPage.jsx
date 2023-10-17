import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Bienvenido</h1>
          <p className="py-6">
            Con tareas capitalinas podras hacer un mejor control de tu tiempo y vida :3
          </p>
          <Link to={"/register"}>
            <button className="btn btn-primary">Continua</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
