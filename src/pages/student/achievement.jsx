// import React, { useEffect, useState } from 'react';
// import { Table, Button } from 'react-bootstrap';
// import axios from 'axios';

// const Achievements = () => {
//     const [achievements, setAchievements] = useState([]);
//     const studentId = localStorage.getItem('id'); // Assuming studentId is stored in localStorage

//     // Fetch the achievements (remarks) provided by the software house
//     const fetchAchievements = async () => {
//         try {
//             // Replace with the correct endpoint to fetch remarks (software house feedback)
//             const response = await axios.get(`https://internship-hub-backend.vercel.app/api/remarks/student/${studentId}`);
//             console.log(Array.isArray(achievements)); // should log true
//     console.log(achievements); // log to inspect the value

//             console.log('Fetched achievements:', response.data);
//             setAchievements(response.data);
//         } catch (error) {
//             console.error('Error fetching achievements:', error);
//         }
//     };

//     useEffect(() => {
//         fetchAchievements();
//     }, []);



//     return (
//         <section className="bg-white p-4 rounded">
//             <h2 className="text-lg font-bold mb-4">Your Achievements</h2>
//             <div className="overflow-x-auto">
//                 {/* Display remarks (feedback from software house) */}
//                 <h5>Remarks:</h5>
//                 {/* <p>{achievements || 'No remarks provided yet'}</p> */}

//                 {/* Display evaluation (if any data available) */}
//                 {achievements && (
//                     <>
//                         <h5>Evaluation:</h5>
//                         <Table striped bordered hover responsive>
//                             <thead>
//                                 <tr>
//                                     <th>Technical Skills</th>
//                                     <th>Task Completion</th>
//                                     <th>Learning Ability</th>
//                                     <th>Communication Skills</th>
//                                     <th>Team Collaboration</th>
//                                     <th>Punctuality & Attendance</th>
//                                     <th>Professionalism</th>
//                                     <th>Creativity/Initiative</th>
//                                     <th>Behavior & Attitude</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
                             
//                                 {achievements && achievements.map((ach) => (
//                                     <tr key={ach._id}>
//                                         <td>{ach.remarks}</td>
//                                         <td>{ach.remarks}</td>
//                                         <td>{ach.remarks}</td>
//                                         <td>{ach.remarks}</td>
//                                         <td>{ach.remarks}</td>
//                                         <td>{ach.remarks}</td>
//                                         <td>{ach.remarks}</td>
//                                         <td>{ach.remarks}</td>
//                                         <td>{ach.remarks}</td>
//                                         {/* <td>{ach.evalution.taskCompletion}</td>
//                                         <td>{ach.evalution.learningAbility}</td>        
//                                         <td>{ach.evalution.communicationSkills}</td>
//                                         <td>{ach.evalution.teamCollaboration}</td>
//                                         <td>{ach.evalution.punctualityAttendance}</td>
//                                         <td>{ach.evalution.professionalism}</td>
//                                         <td>{ach.evalution.creativityInitiative}</td>
//                                         <td>{ach.evalution.behaviorAttitude}</td> */}
//                                     </tr>
//                                 ))}

//                             </tbody>
//                         </Table>
//                     </>
//                 )}

               
//             </div>
//         </section>
//     );
// };

// export default Achievements;


import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);
    const studentId = localStorage.getItem('id'); // Assuming studentId is stored in localStorage

    // Fetch the achievements (remarks) provided by the software house
    const fetchAchievements = async () => {
        try {
            // Replace with the correct endpoint to fetch remarks (software house feedback)
            const response = await axios.get(`https://internship-hub-backend.vercel.app/api/remarks/student/${studentId}`);
            console.log(Array.isArray(achievements)); // should log true
    console.log(achievements); // log to inspect the value

            console.log('Fetched achievements:', response.data);
            setAchievements(response.data);
        } catch (error) {
            console.error('Error fetching achievements:', error);
        }
    };

    useEffect(() => {
        fetchAchievements();
    }, []);



    return (
        <section className="bg-white p-4 rounded">
            <h2 className="text-lg font-bold mb-4">Your Achievements</h2>
            <div className="overflow-x-auto">
                
                <h5>Remarks:</h5>
                {achievements.remarks}

                {achievements && (
                    <div>
                        <h5>Evaluation:</h5>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Technical Skills</th>
                                    <th>Task Completion</th>
                                    <th>Learning Ability</th>
                                    <th>Communication Skills</th>
                                    <th>Team Collaboration</th>
                                    <th>Punctuality & Attendance</th>
                                    <th>Professionalism</th>
                                    <th>Creativity/Initiative</th>
                                    <th>Behavior & Attitude</th>
                                </tr>
                            </thead>
                               <tbody> {achievements.map((ach) => (
                                    <tr key={ach._id}>
                                        <td>{ach.evaluation?.technicalSkills || 'N/A'}</td>
                                        <td>{ach.evaluation?.taskCompletion || 'N/A'}</td>
                                        <td>{ach.evaluation?.learningAbility || 'N/A'}</td>
                                        <td>{ach.evaluation?.communicationSkills || 'N/A'}</td> 
                                        <td>{ach.evaluation?.teamCollaboration || 'N/A'}</td> 
                                        <td>{ach.evaluation?.punctualityAttendance || 'N/A'}</td>
                                        <td>{ach.evaluation?.professionalism || 'N/A'}</td> 
                                        <td>{ach.evaluation?.creativityInitiative || 'N/A'}</td>
                                        <td>{ach.evaluation?.behaviorAttitude || 'N/A'}</td> 
                                    </tr>
                                    ))} 
                                </tbody>   
                        </Table>
                    </div>
                )}   
            </div>
        </section>
    );
};

export default Achievements;
