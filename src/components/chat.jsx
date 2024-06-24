import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";
import io from "socket.io-client";
import { baseUrl } from "../../constants/server";

export default function Chat({connection_id, receiver_id}) {

  const userId = localStorage.getItem("userId");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [receiverProfile, setReceiverProfile] = useState({
    fname: "",
    lname: "",
  });
  

  useEffect(() => {
    if (!connection_id) {
      console.error('No connection_id provided');
      return;
    }

    // Fetch receiver profile
    const fetchReceiverProfile = async () => {
      try {
        const response = await axios.get(`${baseUrl}/users/${receiver_id}`);
        setReceiverProfile(response.data);
      } catch (error) {
        console.error('Error fetching receiver profile:', error);
      }
    };

    fetchReceiverProfile();

    // Initialize socket connection
    const newSocket = io(baseUrl, {
      query: { connection_id },
    });
    setSocket(newSocket);

    // Listen for initial messages
    newSocket.on('initial messages', (initialMessages) => {
      setMessages(initialMessages);
    });

    // Listen for updated messages
    newSocket.on('updated messages', (updatedMessages) => {
      setMessages(updatedMessages);
    });

    // Clean up the socket connection on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [connection_id, receiver_id]);

  useEffect(() => {
    if (!connection_id || !receiver_id) {
      console.error("No connection_id or receiver_id provided");
      return;
    }

    // Fetch receiver profile
    const fetchReceiverProfile = async () => {
      try {
        console.log("Hereeeeeee");
        const response = await axios.get(`${baseUrl}/users/${receiver_id}`);
        setReceiverProfile(response.data);
      } catch (error) {
        console.error("Error fetching receiver profile:", error);
      }
    };

    fetchReceiverProfile();

    // Initialize socket connection
    const newSocket = io(baseUrl, {
      query: { connection_id },
    });
    setSocket(newSocket);

    // Listen for initial messages
    newSocket.on("initial messages", (initialMessages) => {
      setMessages(initialMessages);
      
    });

    // Listen for updated messages
    newSocket.on("updated messages", (updatedMessages) => {
      setMessages(updatedMessages);
      
    });

    // Clean up the socket connection on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [connection_id, receiver_id]);



  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const sendChat = () => {
    if (message.trim() !== "") {
      const newMessage = {
        sender_id: userId,
        receiver_id,
        content: message,
      };

      // Emit the message to the server
      socket.emit("chat message", newMessage);

      // Clear the input field
      setMessage("");
    }
  };
  return (
    <div className='w-1/2 p-4 mx-auto mt-4 bg-white rounded-2xl'>
        <div className="flex flex-col h-[40rem] bg-gray-100 rounded-xl shadow-xl">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 text-white bg-green-800 rounded-t-xl">
        <Link to={receiverProfile.fname } className="text-xl font-bold">{receiverProfile.lname}</Link>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          

          {/* Message from user */}
          {messages.map((msg, index)=>(
            <div
            className={
              msg.sender === userId
                ? "flex flex-col items-end"
                : "flex flex-col"
            }
            key={index}
          >
            <div
              className={`max-w-md px-4 py-3 text-xl font-bold shadow rounded-2xl min-h-10 ${
                msg.sender === userId
                  ? "text-white bg-green-800"
                  : "text-green-900 bg-gray-300"
              }`}
            >
              {msg.content}
            </div>
            <span className='mt-1 text-xs'>{new Date(msg.timestamp).toLocaleTimeString()}</span>
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