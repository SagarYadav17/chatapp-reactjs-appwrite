import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Room from "./pages/Room";
import Login from "./pages/Login";
import PrivateRoutes from "./components/PrivateRoutes";

import AuthProvider from "./utils/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Room />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
