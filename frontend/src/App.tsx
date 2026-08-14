import { Route, Routes } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Turnos y Agendas</h1>} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
