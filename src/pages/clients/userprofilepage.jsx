
import Header from '../../components/connectionheader';
import ClientProfile from '../../components/clientprofile';
import client from '../../components/client';

export default function ClientProfilePage() {
  return (
    <div className="min-h-screen bg-gray-200">
      <Header heading={(client) ? `Your Profile` : `${client.lastname + "'s" +' Profile'}`} link="Back to Home" href="/clienthome"/>
      <ClientProfile/>
    </div>
  );
}
