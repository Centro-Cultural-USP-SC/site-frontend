import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Post from "../pages/Post";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

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

      </Routes>
    </BrowserRouter>
  );
}