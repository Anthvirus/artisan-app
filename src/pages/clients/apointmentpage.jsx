
import Header from '../../components/connectionheader';
import AppointmentCard from '../../components/appointmentcard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../constants/server';

export default function AppointmentPage() {
  const [tasks, setTasks] = useState([]);
  const userId = localStorage.getItem('userId')
  const fetchAppointments = async () => {
    const clientId = localStorage.getItem('userId');
    try {
      const response = await axios.get(`${baseUrl}/appointments/client/${clientId}`);
      if (response.status === 200) {
        setTasks(response.data);
        console.log('Appointments fetched:', response.data);
      } else {
        console.error('Error fetching appointments:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };
  useEffect(() => {
    
    fetchAppointments();
  }, [userId]);
  const deleteAppointment = async (appointmentId) => {
    console.log('Deleting appointment:', appointmentId);
    try {
      const response = await axios.delete(`${baseUrl}/appointments/${appointmentId}`);
      if (response.status === 200) {
        console.log('Appointment deleted:', response.data);
        window.location.reload(); // Refresh appointments after deletion
      } else {
        console.error('Error deleting appointment:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-200">
      <Header heading="Appointments" link="Back to Home" href="/clienthome"/>
      {tasks == "" ? (
              <p className="text-xl text-gray-500">No Appointments Available</p>
            ) : (
              tasks.map((task, id) => (
                <AppointmentCard
                  key={id}
                  artisanName={task.artisan_name}
                  amountAgreed={task.amount}
                  startDate={task.start_date}
                  endDate={task.end_date}
                  taskDescription={task.description}
                  delete={()=>{deleteAppointment(task._id)}}
                />
              ))
            )}
    </div>
  );
}
