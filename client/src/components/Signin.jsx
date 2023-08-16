import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data={
      email:formData.email,
      password:formData.password
    }
    await axios.post("https://itcell.onrender.com/user/login",data)
    .then((res)=>{
      console.log(res.data);
      if(res.data.message==='Login success') {
        sessionStorage.setItem("token", res.data.token);
        toast.success(res.data.message,{
          position:"top-center",
          autoClose:2000,
          hideProgressBar:"true",
          closeOnClick: true,
          pauseOnHover: false,
        })   
        navigate("/eaform")
      }
      
    })
    .catch((error)=>{ 
      console.log(error);
      toast.error(error.response.data.error,{
        position:"top-center",
        autoClose:2000,
        hideProgressBar:"true",
        closeOnClick: true,
        pauseOnHover: false,
      })      
        navigate("/")
    })
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Log In</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">
                  Log In
                </button>  
                <Link className="btn m-3" to="/admin/login" style={{backgroundColor:"#39478C",color:"white"}}>
                Admin Log In
                </Link>
                <p className="mt-3 text-center">
                  Don't have an account? <Link to="/signup">Signup</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
