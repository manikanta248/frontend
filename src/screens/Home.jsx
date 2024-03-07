import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function Home() {
  const [taskData, setTaskData] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [inProcessCount, setinProcessCount] = useState(0);
  const [yetToStartCount, setyetToStartCount] = useState(0);
  const total_count = taskData.length

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      loadTaskData();
    }
  }, []);

  useEffect(() => {
    // Count completed tasks when taskData changes
    setCompletedCount(taskData.filter(task => task.status === 'completed').length);
  }, [taskData]);
  useEffect(() => {
    // Count completed tasks when taskData changes
    setyetToStartCount(taskData.filter(task => task.status === 'Yet to start').length);
  }, [taskData]);
  useEffect(() => {
    // Count completed tasks when taskData changes
    setinProcessCount(taskData.filter(task => task.status === 'In process').length);
  }, [taskData]);

  const loadTaskData = async () => {
    try {
      const response = await fetch("https://backend-2-phf4.onrender.com/api/taskdataload", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      // Format the dates before setting the state
      const formattedData = data.map(task => ({
        ...task,
        startDate: new Date(task.startDate).toLocaleDateString(),
        endDate: new Date(task.endDate).toLocaleDateString(),
      }));
      setTaskData(formattedData);
      console.log(taskData)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      {(!localStorage.getItem("authToken")) ?
        <div className='container'>
          Login to view the Tasks
        </div>
        :
        <div className='container mt-4'>
          <div style={{ height: "10rem", background: "green", borderRadius: "22px", color: "white" }} >
            <h2 className='mx-4'>Completed</h2>
            <h3 className='mx-4'>{completedCount}/{total_count}</h3>
            <div class="progress mx-4" style={{width:"95%"}}>
              <div className="progress-bar" role="progressbar" style={{ width: `${(completedCount / total_count) * 100}%` }} aria-valuenow={(completedCount / total_count) * 100} aria-valuemin="0" aria-valuemax="100">{`${(completedCount / total_count * 100).toFixed(2)}%`}</div>
            </div>
          </div >
          <div className='mt-4' style={{ height: "10rem", background: "orange", borderRadius: "22px", color: "white" }} >
            <h2 className='mx-4'>In Process</h2>
            <h3 className='mx-4'>{inProcessCount}/{total_count}</h3>
            <div class="progress mx-4" style={{width:"95%"}}>
              <div className="progress-bar" role="progressbar" style={{ width: `${(inProcessCount / total_count * 100).toFixed(2)}%` }} aria-valuenow={((inProcessCount / total_count) * 100).toFixed(2)} aria-valuemin="0" aria-valuemax="100">{`${(inProcessCount / total_count * 100).toFixed(2)}%`}</div>
            </div>
          </div>
          <div className='mt-4' style={{ height: "10rem", background: "red", borderRadius: "22px", color: "white" }} >
            <h2 className='mx-4'>Yet to Start</h2>
            <h3 className='mx-4'>{yetToStartCount}/{total_count}</h3>
            <div class="progress mx-4" style={{width:"95%"}}>
              <div className="progress-bar" role="progressbar" style={{ width: `${(yetToStartCount / total_count) * 100}%` }} aria-valuenow={(yetToStartCount / total_count) * 100} aria-valuemin="0" aria-valuemax="100">{`${(yetToStartCount / total_count * 100).toFixed(2)}%`}</div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
