import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header title="My Task Manager" />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
