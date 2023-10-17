import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ListPage from "./pages/ListPage";
import ListFormPage from "./pages/ListFormPage";
import TaskFormPage from "./pages/TaskFormPage";
import MainPage from "./pages/MainPage";
import { AuthProvider } from "./context/AuthContext";
import { ListProvider } from "./context/ListContext";
import { TaskProvider } from "./context/TaskContext";
import ProtectedRoute from "./ProtectedRoute";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <AuthProvider>
      <ListProvider>
        <TaskProvider>
          <BrowserRouter>
            <main className="container content-container mx-auto px-10 md:px-0">
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/lists" element={<ListPage />} />
                  <Route path="/add-list" element={<ListFormPage />} />
                  <Route path="/lists/:id" element={<ListFormPage />} />
                  <Route path="/tasks" element={<TaskPage />} />
                  <Route path="/add-task" element={<TaskFormPage />} />
                  <Route path="/tasks/:id" element={<TaskFormPage />} />
                </Route>
              </Routes>
            </main>
          </BrowserRouter>
        </TaskProvider>
      </ListProvider>
    </AuthProvider>
  );
}

export default App;
