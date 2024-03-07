import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AllTasks from '../components/AllTasks';

export default function Tasks() {
    const [editTask, setEditTask] = useState(false);
    const [credentials, setCredentials] = useState({ task: "", startDate: "", endDate: "", user: "" });
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const response = await fetch("https://backend-2-phf4.onrender.com/api/loaduserdata", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error("Error loading user data:", error);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = {
                task: credentials.task,
                startDate: credentials.startDate,
                endDate: credentials.endDate,
                userId: credentials.user,
                status: "Yet to start" // Use credentials.user to get the selected user ID
            };
            console.log(formData);
            const response = await fetch("http://localhost:5000/api/taskdata", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log("Task created successfully!");
            setCredentials({ task: "", startDate: "", endDate: "", user: "" }); // Reset form fields
            loadUserData();
        } catch (error) {
            console.error("Error creating task:", error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleStartDateChange = (date) => {
        setCredentials(prevState => ({
            ...prevState,
            startDate: date // Update startDate in credentials state
        }));
    }

    const handleEndDateChange = (date) => {
        setCredentials(prevState => ({
            ...prevState,
            endDate: date // Update endDate in credentials state
        }));
    }

    const handleSelectChange = (e) => {
        const { value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            user: value // Update user in credentials state
        }));
    }

    return (
        <div>
            <Navbar />
            <div className='container mt-4 mb-5'>
                {!editTask ? <button className='btn bg-success' onClick={() => setEditTask(true)}>+ Add Task</button> : ""}
                {editTask && (
                    <form onSubmit={handleSubmit}>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Enter Task</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="Enter Task" rows="3" name='task' value={credentials.task} onChange={handleChange}></textarea>
                        </div>
                        <div>
                            <label className='mt-3'>Start date</label>
                            <DatePicker className='mx-5' selected={credentials.startDate} onChange={handleStartDateChange} />
                        </div>
                        <div>
                            <label className='mt-3' style={{}}>End date</label>
                            <DatePicker className='mx-5' selected={credentials.endDate} onChange={handleEndDateChange} />
                        </div>
                        <div>
                            <label className='mt-3' style={{}}>Select User</label>
                            <select onChange={handleSelectChange} value={credentials.user}>
                                <option className='mt-3' value=""></option>
                                {userData.map((user) => {
                                    return <option key={user._id} value={user._id}>{user.name}</option>;
                                })}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary mt-5">Submit</button>
                    </form>
                )}
            </div>
            <div>
                <AllTasks data={userData} />
            </div>
        </div>
    );
}
