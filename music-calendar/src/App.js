import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Auth"; // Example component
import Callback from "./Callback"; // Example component
import Dashboard from "./Dashboard"; // Example component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

