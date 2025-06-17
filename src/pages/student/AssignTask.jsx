import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import axios from "axios";

const AssignTask = () => {
  const [tasks, setTasks] = useState([]);
  const [answers, setAnswers] = useState({});
  const [file, setFile] = useState(null);
  const stdId = localStorage.getItem("id");

  const fetchTasks = async () => {
    try {
      console.log("stdid", stdId);
      const response = await axios.get(
        `https://internship-hub-backend.vercel.app/api/tasks/student/${stdId}`
      );
      setTasks(response.data);
      console.log("Tasks:", response.data);
      // Reset answers state based on loaded tasks
      const initialAnswers = {};
      response.data.forEach((task) => {
        initialAnswers[task._id] = ""; // or task.answer if previously submitted
      });
      setAnswers(initialAnswers);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  const handleAnswerChange = (taskId, value) => {
    setAnswers((prev) => ({ ...prev, [taskId]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const submitTask = async (taskId) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("studentId", stdId);
      formData.append("status", 2);
      console.log(formData);
      const response = await axios.patch(
        `https://internship-hub-backend.vercel.app/api/tasks/uploadpdf/${taskId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      alert("Task submitted successfully!");
      fetchTasks(); // refresh task list
    } catch (error) {
      console.error("Task submission failed:", error);
      alert("Failed to submit task");
    }
  };

  return (
    <section className="p-4 bg-white rounded">
      <h2 className="text-lg font-bold">Assigned Task</h2>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <td>Id</td>
              <th>Title</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Your Answer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task._id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{new Date(task.deadline).toLocaleString()}</td>
                <td>
                  {task.file.filePath ? (
                    <p className="font-bold text-green-500">
                      Task Already Submitted
                    </p>
                  ) : (
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                    />
                  )}
                </td>
                <td>
                  <Button
                    variant={task.status == 1 ? "success" : "primary"}
                    onClick={() => submitTask(task?._id)}
                    disabled={task.status == 1}
                    className="w-full md:w-auto" // Make the button responsive
                  >
                    {task.status == 1 ? "Submitted" : "Submit"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export default AssignTask;
