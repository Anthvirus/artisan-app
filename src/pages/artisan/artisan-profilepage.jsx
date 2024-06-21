import Header from '../../components/connectionheader';
import ArtisanProfileCard from '../../components/artisan-profile';

export default function ArtisanHome() {


  return (
    <div className="min-h-screen bg-gray-200">
        <Header heading="Your Profile" link="Back to Home" href="/artisandashboard"/>
        <div className='p-4 md:mx-auto mt-2 mx-4 bg-white md:w-3/4 lg:w-1/2 rounded-xl md:h-[40rem] min-h-auto'>
          <ArtisanProfileCard/>
        </div>
    </div>
  );
}
