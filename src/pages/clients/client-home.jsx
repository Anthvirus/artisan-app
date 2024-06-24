import ClientNavBar from "../../components/clientNavbar";
import ClientHeader from "../../components/clientHeader";
import Services from "../../components/services.jsx";
import { useEffect, useState } from 'react';
import Connections from '../../components/connections';
import Header from '../../components/connectionheader';
import useNavigation from '../../components/navigation';

export default function ArtisanHome() {
  const [homeDefault, setDefault] = useState(null);
  const { navigation, toggleConnections, toggleHome } = useNavigation();

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
          <ClientHeader/>
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
