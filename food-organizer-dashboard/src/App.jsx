import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Messages from './pages/Messages';

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/dashboard" element={<h1>Dashboard</h1>}></Route>
      <Route path="/sensor_output" element={<Messages/>}></Route>
    </Routes>
  </BrowserRouter>
}

export default App;