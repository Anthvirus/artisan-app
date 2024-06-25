import Header from '../../components/connectionheader';
import ArtisanProfileCard from '../../components/artisan-profile';
import { useState, useEffect } from 'react';
import { baseUrl } from '../../../constants/server';

// export default function ArtisanHome({artisan}) {

export default function ArtisanMyProfile() {
  const [artisan, setArtisanData] = useState({})



  const userId = localStorage.getItem('userId') // Get the userId from the Redux state
  console.log('User',userId)
  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/${userId}`);
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
        <Header heading={(!artisan)? `${artisan.fname + 'Profile'}` : `Your Profile`} link="Back to Home" href={(!artisan)?`/userhome`:`/artisandashboard`}/>
        <div className='p-4 md:mx-auto mt-2 mx-4 bg-white md:w-3/4 lg:w-1/2 rounded-xl md:h-[40rem] min-h-auto'>
          <ArtisanProfileCard artisan={artisan}/>
        </div>
    </div>
  );
}
