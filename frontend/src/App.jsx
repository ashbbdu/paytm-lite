import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css"
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./PrivateRoute";
import { useSelector } from "react-redux"
import Loading from "./components/Loading";
import About from "./pages/About";
import HelpSection from "./pages/HelpSection";
import ReferAndEarn from "./pages/ReferAndEarn";
import { Suspense } from "react";

function App() {
  return (
    <div className="h-[100vh] bg-slate-200">
      {/* <Loading /> */}
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
        <Route path="/help" element={<PrivateRoute><HelpSection /></PrivateRoute>} />
        <Route path="/refer" element={<PrivateRoute><ReferAndEarn /></PrivateRoute>} />
      </Routes>
      </Suspense>
  
      
    </div>
  );
}

export default App;
