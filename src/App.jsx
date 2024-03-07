
import {BrowserRouter as Router ,Route,Routes} from "react-router-dom";
import Home from "./screens/Home";
import MyTasks from "./screens/MyTasks";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import AdminLogin from "./screens/AdminLogin";
import Tasks from "./screens/Tasks";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/mytasks" element={<MyTasks/>}/>
        <Route path="/tasks" element={<Tasks/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/adminlogin" element={<AdminLogin/>}/>
      </Routes>
    </Router>
  );
}

export default App;
