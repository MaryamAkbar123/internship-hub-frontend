import React from 'react';
const InternshipPage = () => {
  const internships = [
    {
      id: 1,
      title: 'Internship 1',
      description: 'Learn valuable skills and work on exciting projects.',
      img: 'src/assets/images/internship1.png',
      profileLink: '#',
    },
    {
      id: 2,
      title: 'Internship 2',
      description: 'Collaborate with industry experts and grow your network.',
      img: 'src/assets/images/internship2.png',
      profileLink: '#',
    },
    {
      id: 3,
      title: 'Internship 3',
      description: 'Gain hands-on experience in a dynamic environment.',
      img: 'src/assets/images/internship3.png',
      profileLink: '#',
    },
    {
      id: 4,
      title: 'Internship 4',
      description: 'Work on innovative projects and enhance your skills.',
      img: 'src/assets/images/internship4.png',
      profileLink: '#',
    },
    {
      id: 5,
      title: 'Internship 5',
      description: 'Join a passionate team and contribute to real-world projects.',
      img: 'src/assets/images/internship5.png',
      profileLink: '#',
    },
    {
      id: 6,
      title: 'Internship 6',
      description: 'Explore new technologies and develop your career.',
      img: 'src/assets/images/internship6.png',
      profileLink: '#',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-100 to-white p-6">
      <div className='bg-gradient-to-r from-blue-950 to-blue-800 p-4 shadow-lg animate-slide-in-down w-full mb-20 h-full'>
      <h1 className="text-5xl font-bold text-center mb-10 text-white drop-shadow-md">Internship Opportunities</h1>
      <div className='flex justify-center mt-4 animate-fade-in-slow '>
        <input type='search' placeholder='search...' className='border p-3 rounded-lg w-1/3 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ' 
        >
        </input>
      </div>
      </div>
      <div className=" bg-gradient-to-r from-blue-500 to-blue-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {internships.map((internship) => (
          <div key={internship.id} className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:shadow-2xl hover:scale-105 relative overflow-hidden">
            <img src={internship.img} alt={internship.title} className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 transform hover:scale-110" />
            <h2 className="text-2xl font-semibold mb-2 text-blue-600 mt-4">{internship.title}</h2>
            <p className="text-gray-700 mb-4">{internship.description}</p>
            <a
              href={internship.profileLink}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full hover:opacity-90 transition duration-300 shadow-lg hover:shadow-xl"
            >
              Apply Now
            </a>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-200 opacity-30 rounded-lg"></div>
          </div>
        ))}
      </div>
      <footer className="bg-blue-900 text-white p-6 mt-10 w-full">
        <div className="text-center">
          <p>© 2024 Internship Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
export default InternshipPage;
