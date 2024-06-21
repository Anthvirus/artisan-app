import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import ArtisanHome from "./pages/artisan/artisanhome";
import ArtisanSignInPage from './pages/artisan/artisan-signinpage';
import ArtisanSignUpPage from './pages/artisan/artisan-signuppage';
import AppointmentPage from './pages/clients/apointmentpage';
import UserSignUpPage from './pages/clients/user-signup-page';
import UserSignInPage from './pages/clients/user-signin-page';
import UserProfilePage from './pages/clients/userprofilepage';
import ArtisanProfilePage from './pages/artisan/artisan-profilepage';
import ChatPage from './pages/chatpage';
import TransactionPage from './pages/transactionpage';

function PrivateRoute({ element: Component, ...rest }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div className='flex items-center justify-center min-h-screen text-4xl font-semibold bg-gray-200 border'>Loading... Please Wait</div>; // or any loading indicator
  }

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/artisansignin" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/artisandashboard' element={<PrivateRoute element={ArtisanHome} />} />
        <Route path='/artisansignin' element={<ArtisanSignInPage />} />
        <Route path='/artisanprofile' element={<ArtisanProfilePage />} />
        <Route path='/artisansignup' element={<ArtisanSignUpPage />} />
        <Route path='/usersignup' element={<UserSignUpPage />} />
        <Route path='/usersignin' element={<UserSignInPage />} />
        <Route path='/appointments' element={<PrivateRoute element={AppointmentPage} />} />
        <Route path='/userprofile' element={<PrivateRoute element={UserProfilePage} />} />
        <Route path="/chat" element={<PrivateRoute element={ChatPage} />} />
        <Route path="/transactions" element={<PrivateRoute element={TransactionPage} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
