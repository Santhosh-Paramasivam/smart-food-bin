import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Donation from "./pages/DonationForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/DonationForm" element={<Donation />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
