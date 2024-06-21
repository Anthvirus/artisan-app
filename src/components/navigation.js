import { useState } from 'react';

const initialNavigation = [
  { name: 'Home', to: '#', current: true },
  { name: 'Contacts', to: '#', current: false },
];

function useNavigation() {
  const [navigation, setNavigation] = useState(initialNavigation);

  const toggleConnections = () => {
    setNavigation([
      { ...navigation[0], current: null },
      { ...navigation[1], current: true },
    ]);
  };

  const toggleHome = () => {
    setNavigation([
      { ...navigation[0], current: true },
      { ...navigation[1], current: false },
    ]);
  };

  return { navigation, toggleConnections, toggleHome };
}

export default useNavigation;
