import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie, Line, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PieController, LineElement, RadarController, RadialLinearScale, PointElement } from 'chart.js';
import { useSpring, animated } from '@react-spring/web';

// Registering all required components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement, 
  PieController, 
  LineElement, 
  RadarController, 
  RadialLinearScale, 
  PointElement
);

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchUserId, setSearchUserId] = useState('');
  const [userDetails, setUserDetails] = useState(null); // Store user details and messages
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('http://localhost:5000/api/users');
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    if (searchUserId) {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${searchUserId}`);
        setUserDetails(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserDetails(null);
        setError('Error fetching user data. Please try again.');
      }
    }
  };

  const totalMembers = users.length;
  const activeMembers = users.filter(user => user.isActive).length;
  const inactiveMembers = totalMembers - activeMembers;
  const topContributors = users.sort((a, b) => b.messages - a.messages).slice(0, 5);

  const chartDataBar = {
    labels: users.map(user => user.name),
    datasets: [
      {
        label: 'Messages',
        data: users.map(user => user.messages),
        backgroundColor: 'rgba(34, 152, 180, 0.2)',
        borderColor: 'rgba(34, 152, 180, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartDataPie = {
    labels: ['Active Members', 'Inactive Members'],
    datasets: [
      {
        data: [activeMembers, inactiveMembers],
        backgroundColor: ['rgba(34, 152, 180, 0.8)', 'rgba(34, 152, 180, 0.4)'],
        borderColor: ['rgba(34, 152, 180, 1)', 'rgba(34, 152, 180, 0.8)'],
        borderWidth: 1,
      },
    ],
  };

  const chartDataLine = {
    labels: users.map(user => user.name),
    datasets: [
      {
        label: 'Messages Over Time',
        data: users.map(user => user.messages),
        borderColor: 'rgba(34, 152, 180, 1)',
        backgroundColor: 'rgba(34, 152, 180, 0.2)',
        fill: true,
        tension: 0.1, // For smooth lines
      },
    ],
  };

  const chartDataRadar = {
    labels: ['Messages', 'Active Status'],
    datasets: [
      {
        label: 'User Stats',
        data: [
          users.reduce((acc, user) => acc + user.messages, 0) / users.length, // Average messages
          activeMembers / totalMembers * 100, // Percentage of active members
        ],
        backgroundColor: 'rgba(34, 152, 180, 0.2)',
        borderColor: 'rgba(34, 152, 180, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Animation for stats boxes
  const statsSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
    config: { duration: 500 },
  });

  // Animation for user details
  const detailsSpring = useSpring({
    opacity: userDetails ? 1 : 0,
    height: userDetails ? 'auto' : '0px',
    overflow: 'hidden',
    config: { duration: 300 },
  });

  return (
    <div className="min-h-screen bg-[#0a0c11] text-[#ffffff] overflow-hidden">
      <div className="container mx-auto p-6 max-w-screen-xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Community Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <animated.div style={statsSpring} className="bg-[#1f1f2d] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-2">Total Members</h2>
            <p className="text-xl">{totalMembers}</p>
          </animated.div>
          <animated.div style={statsSpring} className="bg-[#1f1f2d] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-2">Active Members</h2>
            <p className="text-xl">{activeMembers}</p>
          </animated.div>
          <animated.div style={statsSpring} className="bg-[#1f1f2d] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-2">Inactive Members</h2>
            <p className="text-xl">{inactiveMembers}</p>
          </animated.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#1f1f2d] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Messages Distribution</h2>
            <div className="h-80">
              <Bar data={chartDataBar} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-[#1f1f2d] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Member Status</h2>
            <div className="h-80">
              <Pie data={chartDataPie} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-[#1f1f2d] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Messages Over Time</h2>
            <div className="h-80">
              <Line data={chartDataLine} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-[#1f1f2d] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">User Stats Radar</h2>
            <div className="h-80">
              <Radar data={chartDataRadar} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
        <div className="bg-[#1f1f2d] p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4">Top Contributors</h2>
          <ul className="list-disc list-inside">
            {topContributors.map(user => (
              <li key={user._id} className="text-lg">{user.name} - {user.messages} messages</li>
            ))}
          </ul>
        </div>
        <div className="bg-[#1f1f2d] p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4">Search User</h2>
          <input
            type="text"
            value={searchUserId}
            onChange={(e) => setSearchUserId(e.target.value)}
            placeholder="Enter user ID"
            className="p-2 mb-4 w-full rounded border text-black border-gray-300"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {userDetails && (
            <animated.div style={detailsSpring}>
              <h3 className="text-xl font-semibold mt-6">User ID: {userDetails.user._id}</h3>
              <p>Name: {userDetails.user.name}</p>
              <p>Messages: {userDetails.user.messages}</p>
              <div className="mt-4">
                <h4 className="text-lg font-semibold">User Messages:</h4>
                <ul className="list-disc list-inside">
                  {userDetails.messages && userDetails.messages.length > 0 ? (
                    userDetails.messages.map((msg, index) => (
                      <li key={index} className="text-md">
                        <strong>{userDetails.user.name}:</strong> {msg.text}
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500">No messages found</p>
                  )}
                </ul>
              </div>
            </animated.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
