import React from 'react';

const DashboardCard = ({ title, value, icon: Icon, bgColor = 'bg-blue-500', textColor = 'text-white' }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-lg font-semibold ${textColor}`}>{title}</h2>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <div className={`${bgColor} p-3 rounded-full`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;