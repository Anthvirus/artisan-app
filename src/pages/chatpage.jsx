import Chat from '../components/chat';
import {useState, useEffect} from 'react';
import {useLocation } from 'react-router-dom';
import Header from '../components/connectionheader';
import axios from 'axios'

export default function ChatPage() {
  const { state } = useLocation();
  const connection_id = state?.connection_id;
  const receiver_id = state?.receiver_id;
  console.log('Chat', connection_id, receiver_id)
  const [receiverProfile, setReceiverProfile] = useState({
    fname: "",
    lname: "",
  });

  const userId = localStorage.getItem('userId') // Get the userId from the Redux state
  console.log('User',userId)

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

    fetchReceiverProfile();},
  [connection_id, receiver_id]);
  return (
    <div className="min-h-screen bg-gray-200">
      <Header heading={`Chat with ${receiverProfile.fname+" "+ receiverProfile.lname}`} link="Back to Home" href={"/artisandashboard" || "/clienthome" }/>
      <Chat connection_id={connection_id} receiver_id={receiver_id}/>
    </div>
  );
}
