import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const StudentChat = () => {
  const [currentUserId, setCurrentUserId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const [receiverProfile, setReceiverProfile] = useState(null);

  useEffect(() => {
    const std = JSON.parse(localStorage.getItem('studentData'));
    if (std) {
      setCurrentUserId(std._id);
      const newSocket = io('https://internship-hub-backend.vercel.app');
      newSocket.emit('join', std._id);
      setSocket(newSocket);
      return () => newSocket.close();
    }
  }, []);

  useEffect(() => {
    axios.get('https://internship-hub-backend.vercel.app/api/softwarehouses')
      .then(res => {
        const dynamicUsers = res.data.map(user => ({
          id: user._id,
          name: user.name || user.email
        }));
        setUsers(dynamicUsers);
      });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (msg) => {
        setMessages(prev => [...prev, msg]);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (receiverId) {
      axios.get(`https://internship-hub-backend.vercel.app/api/softwarehouses/${receiverId}`)
        .then(res => setReceiverProfile(res.data));
    }
  }, [receiverId]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    const msgObj = { senderId: currentUserId, receiverId, message };
    socket.emit('sendMessage', msgObj);
    setMessages(prev => [...prev, msgObj]);
    setMessage('');
    await axios.post('https://internship-hub-backend.vercel.app/api/chat', msgObj);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Student Chat</h1>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 font-medium">Select Software House:</label>
        <select
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          className="w-full border p-2 rounded-md"
        >
          <option value="">-- Select --</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
      </div>

      {receiverId && (
        <div className="bg-white shadow p-4 rounded-lg max-w-3xl mx-auto">
          <div className="mb-4 flex items-center gap-4">
            <img src={receiverProfile?.profileImage || '/default-profile.png'} alt="Profile" className="w-12 h-12 rounded-full" />
            <div>
              <p className="text-lg font-semibold">{receiverProfile?.name}</p>
              <p className="text-sm text-gray-600">{receiverProfile?.email}</p>
            </div>
          </div>

          <div className="h-64 overflow-y-auto border p-3 mb-3 rounded">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-2 ${msg.senderId === currentUserId ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block px-4 py-2 rounded-lg ${msg.senderId === currentUserId ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>

          <div className="flex">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-l-md"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 rounded-r-md"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentChat;
