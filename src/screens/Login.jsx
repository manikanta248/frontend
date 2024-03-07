import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [error, setError] = useState("");

  let navigate = useNavigate();
  const handleSumit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("https://backend-2-phf4.onrender.com/sapi/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        
        if (json.success) {
            localStorage.setItem("authToken", json.authToken);
            localStorage.setItem("userEmail", credentials.email);

            localStorage.setItem("name", json.name); // Set 'name' to local storage
            console.log(localStorage.getItem("name"))
            navigate("/");
        } else {
            setError("Invalid email or password");
        }
    } catch (error) {
        console.error('Error:', error);
        setError("Something went wrong. Please try again.");
    }
}

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <div className='container mt-5'>
        <form onSubmit={handleSumit}>
          {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={credentials.email} onChange={onChange} />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
          </div>


          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/signup" className="m-3 btn btn-danger">new user</Link>
          <Link to="/adminlogin" className="m-3 btn btn-danger">Admin Login</Link>

        </form>
      </div>
    </div>
  )
}
