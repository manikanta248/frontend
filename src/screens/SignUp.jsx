import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
export default function SignUp() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
  let [error, setError] = useState("");
  let navigate = useNavigate();
  const handleSumit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://backend-2-phf4.onrender.com/api/createUser", {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      setError(json.message);
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("userName", credentials.name);
      console.log(localStorage.getItem("userEmail"))
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container'>
      <form onSubmit={handleSumit}>
      {error ? <div className="alert alert-danger mt-3" role="alert">{error}</div> : ""}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" placeholder="Enter Name" name='name' value={credentials.name} onChange={onChange} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={credentials.email} onChange={onChange} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Location</label>
          <input type="text" className="form-control" id="exampleInputPassword1" placeholder="location" name='geolocation' value={credentials.geolocation} onChange={onChange} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
        <Link to="/adminlogin" className="m-3 btn btn-danger">Admin Login</Link>

        
      </form>
    </div>
  )
}
