import { BrowserRouter, Route, Routes } from "react-router-dom";
import Messages from "./pages/Messages";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/sensor_output" element={<Messages />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
