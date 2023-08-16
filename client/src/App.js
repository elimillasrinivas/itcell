import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ElectionForm from "./components/ElectionForm";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Admin from "./components/Admin";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/eaform" element={<ElectionForm />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/" element={<Signin />} />

        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
