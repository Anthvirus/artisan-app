import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClientHome from "./pages/clients/client-home";
import AppointmentPage from './pages/clients/apointmentpage';
import ClientProfilePage from './pages/clients/userprofilepage';
import ArtisanHome from "./pages/artisan/artisanhome";
import ArtisanSignInPage from './pages/artisan/artisan-signinpage';
import ArtisanSignUpPage from './pages/artisan/artisan-signuppage';
import UserSignUpPage from './pages/clients/user-signup-page';
import UserSignInPage from './pages/clients/user-signin-page';
import UserProfilePage from './pages/clients/userprofilepage';
import ArtisanProfilePage from './pages/artisan/artisan-profilepage';
import ChatPage from './pages/chatpage';
import TransactionPage from './pages/transactionpage';
import { Provider } from 'react-redux';
import store from "./redux/store.jsx";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path='/artisandashboard' element={<ArtisanHome />} />
        <Route path='/artisansignin' element={<ArtisanSignInPage />} />
        <Route path='/artisanprofile' element={<ArtisanProfilePage />} />
        <Route path='/artisansignup' element={<ArtisanSignUpPage />} />
        <Route path='/usersignup' element={<UserSignUpPage />} />
        <Route path='/usersignin' element={<UserSignInPage />} />
        <Route path='/appointments' element={<AppointmentPage />} />
        <Route path='/userprofile' element={<UserProfilePage />} />
        <Route path='/clienthome' element={<ClientHome/>} />
        <Route path='/appointments' element={<AppointmentPage/>} />
        <Route path='/clientprofile' element={<ClientProfilePage/>} />
        <Route path="/chat" element={<ChatPage/>} />
        <Route path="/transactions" element={<TransactionPage />} />
      </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;