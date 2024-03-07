import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function MyTasks() {

  const [taskData, setTaskData] = useState([]);
  const [editedTask, setEditedTask] = useState({});

  const loadTaskData = async () => {
    try {
      const response = await fetch("https://backend-2-phf4.onrender.com/api/taskdataload1", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userid: localStorage.getItem("name") }) // Pass the 'name' as 'userid'
      });
      const data = await response.json();
      // Format the dates before setting the state
      const formattedData = data.map(task => ({
        ...task,
        startDate: new Date(task.startDate).toLocaleDateString(),
        endDate: new Date(task.endDate).toLocaleDateString(),
      }));
      setTaskData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTaskData();
  }, []);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTasks = [...taskData];
    updatedTasks[index][name] = value;
    setTaskData(updatedTasks);
    setEditedTask(updatedTasks[index]); // Update editedTask whenever handleChange is triggered
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://backend-2-phf4.onrender.com/api/updatetask/${editedTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedTask)
      });

      if (response.ok) {
        loadTaskData();
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Navbar />
      {(!localStorage.getItem("authToken")) ?
        <div className='container'>
          Login to view the Tasks
        </div>
        :
        <div className='container'>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Task</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {taskData.map((task, index) => (
                <tr key={index}>
                  <td>{task.task}</td>
                  <td>{task.startDate}</td>
                  <td>{task.endDate}</td>
                  <td>
                    <select name="status" value={task.status} onChange={(e) => handleChange(e, index)}>
                      <option value="Yet to start">Yet to start</option>
                      <option value="In process">In process</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td><button onClick={handleSave}>Save</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}
