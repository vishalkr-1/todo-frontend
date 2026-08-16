import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";

function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default Routing;
