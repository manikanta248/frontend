import React,{useState} from 'react'
import {Link,useNavigate} from "react-router-dom";
export default function Login() {
    let admin =false;
  const  [credentials, setCredentials] = useState({adminid:"",email:"",password:""})
  const [error, setError] = useState("");

  let navigate =useNavigate();
  const handleSumit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://backend-2-phf4.onrender.com/api/adminlogin", {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ adminid:credentials.adminid,email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success&&json.adminid) {
        admin=json.adminid;
        localStorage.setItem("userEmail", credentials.email);

      console.log(localStorage.getItem("userEmail"))
      localStorage.setItem("authToken", json.authToken);
        navigate("/");
        // Update state to store the error message
        
    }
    if (!json.success) {
      setError("Invalid email or password");
    }
}

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <div className='container mt-5'>
        <form onSubmit={handleSumit}>
        {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
        <div className="form-group">
    <label >Admin Id</label>
    <input type="text" className="form-control"placeholder="Enter Admin id" name='adminid' value={credentials.adminid} onChange={onChange}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>

  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={credentials.email} onChange={onChange}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={credentials.password} onChange={onChange}/>
  </div>
  
  
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/login" className="m-3 btn btn-danger">Login</Link>
  <Link to="/signup" className="m-3 btn btn-danger">new user</Link>

</form>
    </div>
    </div>
  )
}
