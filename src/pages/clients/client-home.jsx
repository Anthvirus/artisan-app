import ClientNavBar from "../../components/clientNavbar";
import ClientHeader from "../../components/clientHeader";
import Services from "../../components/services.jsx";
import { useEffect, useState } from 'react';
import Connections from '../../components/connections';
import Header from '../../components/connectionheader';
import useNavigation from '../../components/navigation';
import { baseUrl } from '../../../constants/server';
import { useNavigate } from 'react-router-dom';

export default function ArtisanHome() {
  const [homeDefault, setDefault] = useState(null);
  const { navigation, toggleConnections, toggleHome } = useNavigation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
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
    
  }, [userId, navigate]);
  useEffect(() => {
    if (navigation[0].current) {
      setDefault(true); 
    } else if (navigation[1].current) {
      setDefault(false);
    }
  }, [navigation]);

  useEffect(() => {
    if (navigation[0].current) {
      setDefault(true); 
    } else if (navigation[1].current) {
      setDefault(false);
    }
  }, [navigation]);

  return (
    <div className="min-h-screen bg-gray-200">
        <ClientNavBar   
          userData={userData} 
          
          toggleHome={() => {
          toggleHome();
          setDefault(true);
        }}

        toggleConnections={() => {
          toggleConnections();
          setDefault(false);
        }}

        />
      {homeDefault ? (
        <div>
          <ClientHeader userData={userData}/>
          <Services/>
          </div>
      ) : (
        <div>
          <Header heading="Contacts" />
          <Connections />
        </div>
      )}
    </div>
  );
}
