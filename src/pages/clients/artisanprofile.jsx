import Header from '../../components/connectionheader';
import ArtisanProfileCardForClient from '../../components/artisanprofileforclient';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../../../constants/server';

// export default function ArtisanHome({artisan}) {

export default function ArtisanProfileForClient() {
  const { state } = useLocation();
  const artisanId = state?.artisanId;
  const [artisan, setArtisanData] = useState({
    fname: "",})



  const userId = localStorage.getItem('userId') // Get the userId from the Redux state
  console.log('User',userId)
  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/${artisanId}`);
        const data = await response.json();
        setArtisanData(data);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
    
  }, [userId]);
  return (
    <div className="min-h-screen bg-gray-200">
        <Header heading={`${artisan.fname} Profile`} link="Back to Home" href='/clienthome' />

        <div className='p-4 md:mx-auto mt-2 mx-4 bg-white md:w-3/4 lg:w-1/2 rounded-xl md:h-[40rem] min-h-auto'>
          <ArtisanProfileCardForClient artisan={artisan}/>
        </div>
    </div>
  );
}
