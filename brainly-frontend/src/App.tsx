import { Dashboard } from "./pages/Dashboard";
import SignIn from "./pages/Signin";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Share from "./pages/Share";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/share/:hash" element={<Share />} />
        <Route path="*" element={<div className="flex items-center justify-center h-screen text-2xl text-gray-400">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
