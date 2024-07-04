import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Insight from "./pages/Insight";
import Survey from "./components/Survey";
import { AuthProvider } from "./context/AuthContext";
import Chatbot from "./components/Chatbot";
import SMS from "./components/SMS";

function App() {
  return (
    <div className="app">
      <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/reset" Component={Reset} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/insight" element={<Insight />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/sms" element={<SMS />} /> 
        </Routes>
        <Chatbot />
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
