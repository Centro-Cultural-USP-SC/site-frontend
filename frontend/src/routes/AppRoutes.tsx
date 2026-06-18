import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Post from "../pages/Post";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Programacao from "../pages/Programacao";
import Exposicoes from "../pages/Exposicoes";
import Acervo from "../pages/Acervo";

function PrivateRoute({ children }: any) {
  const token = localStorage.getItem("token");
  return token ? children : <Login />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PÚBLICO */}
        <Route path="/" element={<Home />} />
        <Route path="/post/:slug" element={<Post />} />

        {/* ADMIN */}
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/programacao"
          element={<Programacao />}
        />

        <Route
          path="/exposicoes"
          element={<Exposicoes />}
        />

        <Route
          path="/acervo"
          element={<Acervo />}
        />

      </Routes>
    </BrowserRouter>
  );
}