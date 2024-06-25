import { Disclosure, DisclosureButton, DisclosurePanel, MenuItem, MenuItems, MenuButton, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Fragment, useState } from 'react';
import Popup from './popup';
import Notification from './notificationbox';
import useNavigation from './navigation';
import avatar from '../assets/images/male_avatar.svg'
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';

const userNavigation = [
  { name: 'Transaction History', to: '/transactions' },
  { name: 'Your Profile', to: '/artisanmyprofile' },
  { name: 'Sign out', to: "/" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar({userData, toggleHome, toggleConnections}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false);
  const { navigation } = useNavigation();


  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  }

  const handleSignOut = async () => {
    try {
      dispatch(logout);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
      <>
        <div>
        <Disclosure as="nav" className="h-24 pt-3 bg-green-800">
      {({ open }) => (
        <>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="text-3xl font-extrabold text-white">Oga-Artisan</h1>
                </div>
                <div className="hidden md:block">
                  <div className="flex items-baseline ml-10 space-x-4">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                        onClick={item.name === 'Home' ? toggleHome : toggleConnections}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center ml-4 md:ml-6">
                  <button
                    type="button"
                    className="p-1 text-gray-400 bg-gray-200 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    onClick={toggleNotifications}
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src={avatar} alt="" />
                      </MenuButton>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <MenuItem key={item.name}>
                            {(active ) => (
                              <Link
                                to={item.to}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                                onClick={item.name === "Sign out" ? handleSignOut : undefined}
                              >
                                {item.name}
                              </Link>
                            )}
                          </MenuItem>
                        ))}
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="flex -mr-2 md:hidden">
                <DisclosureButton className="relative inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="relative z-10 md:hidden">
            <div className="px-2 pt-2 pb-3 mt-5 space-y-1 bg-gray-600 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.to}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                  onClick={item.name === 'Home' ? toggleHome : toggleConnections}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="pt-4 pb-3 bg-gray-200 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img className="w-10 h-10 rounded-full" src={avatar} alt="" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-900">{`${userData?.fname} ${userData?.lname}`}</div>
                  <div className="text-sm font-medium text-gray-500">{userData?.email}</div>
                </div>
                <button
                  type="button"
                  className="flex-shrink-0 p-1 ml-auto text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  onClick={toggleNotifications}
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>
              <div className="px-2 mt-3 space-y-1">
                {userNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    to={item.to}
                    className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
                    onClick={item.name === "Sign out" ? handleSignOut : undefined}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
          <Popup show={showNotifications} onClose={toggleNotifications}>
            <h1 className='text-3xl font-semibold'>Notifications</h1>
            <Notification type="error" message="Your Premium Subscription expires in 7 days, access to premium content would be denied if you don't renew." />
            <Notification type="info" message="Your Premium Subscription expires in 7 days, access to premium content would be denied if you don't renew." />
          </Popup>
        </div>
      </>
  );
}
