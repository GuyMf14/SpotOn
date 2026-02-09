import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import ParkingAvailability from "./pages/ParkingAvailability.jsx";
import BookParking from "./pages/BookParking.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={
          <ProtectedRoute><Home /></ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />

        <Route path="/parking" element={
          <ProtectedRoute><ParkingAvailability /></ProtectedRoute>
        } />

        <Route path="/book" element={
          <ProtectedRoute><BookParking /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>

);
}

export default App;
