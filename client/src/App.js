import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ElectionForm from "./components/ElectionForm";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Admin from "./components/Admin";
import AdminSigin from "./components/AdminSigin";

function App() {

  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Signin />} />
=======
>>>>>>> f8ae960130d8763336d220065275ab251172f4f6
        <Route path="/eaform" element={<ElectionForm />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/login" element={<AdminSigin/>} />

<<<<<<< HEAD
=======
        <Route path="/" element={<Signin />} />
>>>>>>> f8ae960130d8763336d220065275ab251172f4f6

        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
