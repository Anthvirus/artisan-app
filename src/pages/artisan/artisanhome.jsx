import { useEffect, useState } from 'react';
// import { doc, getDoc } from 'firebase/firestore';
// import { auth, db } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/artisanNavbar';
import HeaderHome from '../../components/artisanhomeHeader';
import TasksList from '../../components/taskslist';
import Connections from '../../components/connections';
import Header from '../../components/connectionheader';
import useNavigation from '../../components/navigation';
import { baseUrl } from '../../../constants/server';


export default function ArtisanHome() {

  const [userData, setUserData] = useState(null);
  const [homeDefault, setDefault] = useState(null);
  const navigate = useNavigate();
  const { navigation, toggleConnections, toggleHome } = useNavigation();


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

  return (
    <div className="min-h-screen bg-gray-200">
      <NavBar 
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
          <HeaderHome userData={userData} />
          <TasksList />
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
