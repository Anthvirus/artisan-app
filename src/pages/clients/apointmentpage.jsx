
import Header from '../../components/connectionheader';
import AppointmentCard from '../../components/appointmentcard';

export default function AppointmentPage() {
  return (
    <div className="min-h-screen bg-gray-200">
      <Header heading="Appointments" link="Back to Home" href="/clienthome"/>
      <AppointmentCard/>
    </div>
  );
}
