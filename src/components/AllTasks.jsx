import React, { useEffect, useState } from 'react';

export default function AllTasks(props) {
    const [taskData, setTaskData] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editedTask, setEditedTask] = useState({});


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
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        loadTaskData();
    }, []);

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditedTask(taskData[index]);
    };

    const handleUpdate = async () => {
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
                // Reset editIndex to null to exit edit mode
                setEditIndex(null);
            } else {
                console.error('Failed to update task');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            const response = await fetch(`https://backend-2-phf4.onrender.com/api/deletetask/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                loadTaskData();
                // Reset editIndex to null to exit edit mode
                setEditIndex(null);
            } else {
                console.error('Failed to delete task');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    




    return (
        <div className='container'>
            <table style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>User</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {taskData.map((task, index) => (
                        <tr key={index}>
                            <td>{editIndex === index ?
                                <input type="text" name="task" value={editedTask.task} onChange={handleChange} /> :
                                task.task
                            }</td>
                            <td>{editIndex === index ?
                                <input type="text" name="startDate" value={editedTask.startDate} onChange={handleChange} /> :
                                task.startDate
                            }</td>
                            <td>{editIndex === index ?
                                <input type="text" name="endDate" value={editedTask.endDate} onChange={handleChange} /> :
                                task.endDate
                            }</td>
                            <td>{editIndex === index ?
                                <input type="text" name="status" value={editedTask.status} onChange={handleChange} /> :
                                task.status
                            }</td>
                            <td>
                                {editIndex === index ? (
                                    <select name="user" value={editedTask.user} onChange={handleChange}>
                                        {props.data.map((task, idx) => (
                                            <option key={idx} value={task.user}>{task.name}</option>
                                        ))}
                                    </select>
                                ) : (
                                    task.user
                                )}
                            </td>


                            <td>
                                {editIndex === index ?
                                    <button onClick={() => handleUpdate()}>Update</button> :
                                    <button onClick={() => handleEdit(index)}>Edit</button>
                                }
                            </td>
                            <td>
                                <button onClick={() => handleDelete(task._id)}>Delete</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
