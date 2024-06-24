import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ClientHome from "./pages/clients/client-home";
import AppointmentPage from './pages/clients/apointmentpage';
import ClientProfilePage from './pages/clients/userprofilepage';

export default function AppTwo(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/clienthome' element={<ClientHome/>} />
                <Route path='/appointments' element={<AppointmentPage/>} />
                <Route path='/clientprofile' element={<ClientProfilePage/>} />
            </Routes>
        </BrowserRouter>
    )
} 