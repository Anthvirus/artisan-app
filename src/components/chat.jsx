import { useState } from 'react';
import { Link } from 'react-router-dom';
import Client from './client';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  function handleChange(e){
    setMessage(e.target.value)
  }

  function sendChat(){
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, timestamp: new Date() }]);
      setMessage(`${""}`);
  }
}
  return (
    <div className='w-1/2 p-4 mx-auto mt-4 bg-white rounded-2xl'>
        <div className="flex flex-col h-[40rem] bg-gray-100 rounded-xl shadow-xl">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 text-white bg-green-800 rounded-t-xl">
        <Link to="/" className="text-xl font-bold">{Client.firstname+ ` `+ Client.lastname}</Link>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {/* Message from others */}
          <div className="flex">
            <div className="max-w-md px-4 py-3 text-xl font-bold text-green-900 bg-gray-300 shadow rounded-2xl">
              Hello!
            </div>
          </div>

          {/* Message from user */}
          {messages.map((msg, index)=>(
            <div className="flex flex-col items-end" key={index}>
            <div className="max-w-md px-4 py-3 text-xl font-bold text-white bg-green-800 shadow-md rounded-2xl min-h-10">
              {msg.text}
            </div>
            <span className='mt-1 text-xs'>{msg.timestamp.toLocaleTimeString()}</span>
          </div>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="flex items-center p-4 bg-gray-200 shadow border-sm rounded-b-xl">
        <input
          type="text"
          placeholder="Type a Message"
          className="flex-1 px-4 py-2 mr-4 rounded-xl"
          onChange={handleChange}
          name='chatMessage'
          value={message}
        />
        <button className="px-4 py-2 text-white bg-green-800 rounded-2xl" onClick={sendChat}>Send</button>
      </div>
    </div>
    </div>
  );
}