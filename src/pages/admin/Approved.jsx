// import React ,{ useState, useEffect} from "react";
// import { Table } from 'react-bootstrap';
// import axios from "axios";

// import DataTable from "../../components/DataTable";

// const Approved = () => {
//     const columns = [
//         // { key: '_id', label: "ID"},
//         { key: 'name', label: "Name"},
//         { key: 'email', label: "email"},
//         { key: 'role', label: "Role"}, 
//     ];

//     const [ result, setResult ] = useState([]);

//     const fetchData = async() => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/users/active')
//             setResult(response.data)
//         } catch (error) {
//             console.error('Error fetching data:', error)
//         }
//     }

//     useEffect( () =>{
//         fetchData();
//     }, [])

//     return(
//         <section className="bg-white p-4 rounded">
//             <h2 className="text-lg font-bold">Approved Students</h2>
//             <DataTable data={result} columns={columns} />
//             {/* <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                     <th>#</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Role</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {result.map((item, index) => (
//                     <tr key={item.id}>
//                         <td>{index + 1}</td>
//                         <td>{item.name}</td>
//                         <td>{item.email}</td>
//                         <td>{item.role}</td>
//                     </tr>
//                     ))}
//                 </tbody>
//             </Table> */}

//         </section>
//     )
// };

// export default Approved;


import React, { useState, useEffect } from "react";
import { FaUsers, FaLaptopCode, FaTasks } from "react-icons/fa";
import axios from "axios";
import DashboardCard from "../../components/DashboardCard";

const Dashboard = () => {
  const [stdCount, setStdCount] = useState(0);
  const [softCount, setSoftCount] = useState(0);
  const [appCount, setAppCount] = useState(0);
  const role = "student";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/applications");
        const res2 = await axios.get("http://localhost:5000/api/softwarehouses");
        const res3 = await axios.get(`http://localhost:5000/api/users/${role}`);

        setSoftCount(res2.data.length);
        setStdCount(res3.data.length);
        setAppCount(response.data.length);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <DashboardCard
        title="Total Students"
        value={stdCount}
        icon={<FaUsers className="text-white text-4xl" />}
        bgColor="bg-blue-500"
      />
      <DashboardCard
        title="Software Houses"
        value={softCount}
        icon={<FaLaptopCode className="text-white text-4xl" />}
        bgColor="bg-green-500"
      />
      <DashboardCard
        title="Applications"
        value={appCount}
        icon={<FaTasks className="text-white text-4xl" />}
        bgColor="bg-purple-500"
      />
    </div>
  );
};

export default Dashboard;
