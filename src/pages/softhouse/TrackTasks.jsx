// import { useEffect, useState } from "react";
// import { Table, Button } from "react-bootstrap";
// import axios from "axios";

// const TrackTask = () => {
//   const [tasks, setTasks] = useState([]);
//   const companyId = localStorage.getItem("companyId");

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get(
//         `https://internship-hub-backend.vercel.app/api/tasks/${companyId}`
//       );
//       setTasks(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Failed to fetch tasks:", error);
//     }
//   };

//   const updateTaskStatus = async (taskId, status) => {
//     try {
//       const response = await axios.patch(
//         `https://internship-hub-backend.vercel.app/api/tasks/tasks/${taskId}`,
//         { status }
//       );
//       setTasks((prevTasks) =>
//         prevTasks.map((task) =>
//           task._id === taskId ? { ...task, status: response.data.status } : task
//         )
//       );
//     } catch (error) {
//       console.error("Error updating task status:", error);
//     }
//   };
//   const handleDownload = (path) => {
//     const link = document.createElement("a");
//     link.href = `https://internship-hub-backend.vercel.app/${path}`; // URL to the file
//     link.setAttribute("download", "task-file.pdf"); // Set the filename to download
//     document.body.appendChild(link);
//     link.click(); // Trigger the download
//     document.body.removeChild(link); // Clean up the link element
//   };
//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <section className="p-4 bg-white rounded">
//       <h2 className="mb-4 text-lg font-bold text-center md:text-left">
//         Track Tasks
//       </h2>
//       <div className="overflow-x-auto">
//         <Table striped bordered hover responsive="sm">
//           <thead>
//             <tr>
//               <th>Task Title</th>
//               <th>Assigned To</th>
//               <th>Deadline</th>
//               <th>Student Answer</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((task) => (
//               <tr key={task._id}>
//                 <td>{task.title}</td>
//                 <td>{task.std.name}</td>
//                 <td>{new Date(task.deadline).toLocaleDateString()}</td>

//                 {task.file.filePath ? (
//                   <td>
//                     {task.file.fileName}{" "}
//                     <button
//                       onClick={() => handleDownload(task.file.filePath)}
//                       className="p-2 text-white bg-blue-500 border-2 rounded"
//                     >
//                       Download
//                     </button>
//                   </td>
//                 ) : (
//                   <td style={{ color: "red" }}>No Task Submitted Yet.</td>
//                 )}
//                 <td>
//                   {task.status === 2
//                     ? "Completed"
//                     : task.status === 1
//                     ? "In Progress"
//                     : "Pending"}
//                 </td>
//                 <td className="flex flex-wrap gap-2">
//                   <Button
//                     onClick={() => updateTaskStatus(task._id, 2)}
//                     style={{ backgroundColor: "green", color: "white" }}
//                     className="w-full sm:w-auto"
//                   >
//                     Mark as Completed
//                   </Button>
//                   <Button
//                     onClick={() => updateTaskStatus(task._id, 1)}
//                     style={{ backgroundColor: "yellow", color: "black" }}
//                     className="w-full sm:w-auto"
//                   >
//                     Mark as In Progress
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </section>
//   );
// };

// export default TrackTask;


import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

const TrackTask = () => {
  const [tasks, setTasks] = useState([]);
  const companyId = localStorage.getItem("companyId");
  const token = localStorage.getItem("authToken"); // Assuming the token is stored in localStorage

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `https://internship-hub-backend.vercel.app/api/tasks/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      const response = await axios.patch(
        `https://internship-hub-backend.vercel.app/api/tasks/tasks/${taskId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: response.data.status } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDownload = (path) => {
    const link = document.createElement("a");
    link.href = `https://internship-hub-backend.vercel.app/${path}`; // URL to the file
    link.setAttribute("download", "task-file.pdf"); // Set the filename to download
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up the link element
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <section className="p-4 bg-white rounded">
      <h2 className="mb-4 text-lg font-bold text-center md:text-left">Track Tasks</h2>
      <div className="overflow-x-auto">
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>Task Title</th>
              <th>Assigned To</th>
              <th>Deadline</th>
              <th>Student Answer</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.std.name}</td>
                <td>{new Date(task.deadline).toLocaleDateString()}</td>
                {task.file && task.file.filePath ? (
                  <td>
                    {task.file.fileName}{" "}
                    <button
                      onClick={() => handleDownload(task.file.filePath)}
                      className="p-2 text-white bg-blue-500 border-2 rounded"
                    >
                      Download
                    </button>
                  </td>
                ) : (
                  <td style={{ color: "red" }}>No Task Submitted Yet.</td>
                )}
                <td>
                  {task.status === 2
                    ? "Completed"
                    : task.status === 1
                    ? "In Progress"
                    : "Pending"}
                </td>
                <td className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => updateTaskStatus(task._id, 2)}
                    style={{ backgroundColor: "green", color: "white" }}
                    className="w-full sm:w-auto"
                  >
                    Mark as Completed
                  </Button>
                  <Button
                    onClick={() => updateTaskStatus(task._id, 1)}
                    style={{ backgroundColor: "yellow", color: "black" }}
                    className="w-full sm:w-auto"
                  >
                    Mark as In Progress
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

export default TrackTask;
