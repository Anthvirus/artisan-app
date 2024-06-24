
import Header from '../../components/connectionheader';
import ClientProfile from '../../components/clientprofile';
import { useState, useEffect } from 'react';
import { baseUrl } from '../../../constants/server';

export default function ClientProfilePage() {
  
  const [userData, setUserData] = useState({fname:"",lname:""});
  const userId = localStorage.getItem('userId') // Get the userId from the Redux state
  console.log('User',userId)
  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/${userId}`);
        const data = await response.json();
        setUserData(data);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
    
  }, [userId]);
  
  return (
    <div className="min-h-screen bg-gray-200">
      <Header heading={`${userData.lname + "'s" +' Profile'}`} link="Back to Home" href="/clienthome"/>
      <ClientProfile user={userData}/>
    </div>
  );
}
