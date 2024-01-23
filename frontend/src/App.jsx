import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css"
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./PrivateRoute";
import { useSelector } from "react-redux"
import Loading from "./components/Loading";

function App() {
  const { loading } = useSelector(state => state.user)
  return (
    <div className="h-[100vh] bg-slate-200">
      <Loading />
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
  
      
    </div>
  );
}

export default App;
