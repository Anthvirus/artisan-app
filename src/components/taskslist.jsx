import { useEffect, useState } from 'react';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { auth, db } from '../firebaseConfig';
import ArtisanTaskCard from './artisan-task';
import axios from 'axios';
import { baseUrl } from '../../constants/server';

export default function TasksList() {
  
  const [tasks, setTasks] = useState([]);
  const userId = localStorage.getItem('userId') // Get the userId from the Redux state
  console.log('User',userId)


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        //start loading
        const response = await axios.get(`${baseUrl}/appointments/artisan/${userId}`);
        //end loading
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


    fetchAppointments();
  }, [userId]);

  const deleteAppointment = async (appointmentId) => {
    try {
      const response = await axios.delete(`${baseUrl}/appointments/${appointmentId}`);
      if (response.status === 200) {
        setTasks((prevTasks) => prevTasks.filter(task => task._id !== appointmentId));
        console.log('Appointment deleted:', appointmentId);
      } else {
        console.error('Error deleting appointment:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const response = await axios.patch(`${baseUrl}/appointments/${appointmentId}`, { iscomplete: true });
      if (response.status === 200) {
        setTasks((prevTasks) => prevTasks.map(task => 
          task._id === appointmentId ? { ...task, iscomplete: true } : task
        ));
        console.log('Appointment marked as complete:', appointmentId);
      } else {
        console.error('Error marking appointment as complete:', response.data.message);
      }
    } catch (error) {
      console.error('Error marking appointment as complete:', error);
    }
  };


  return (
          <div className='w-full mx-2 p-4 md:mx-auto mt-2 bg-gray-100 lg:w-1/2 rounded-xl max-h-[30rem] overflow-y-auto'>
            <h1 className='my-4 text-3xl font-bold'>Open Jobs</h1>
            {tasks.length === 0 ? (
              <p className="text-xl text-gray-500">No Available Jobs</p>
            ) : (
              tasks.map((task, id) => (
                <ArtisanTaskCard
                  key={id}
                  clientName={task.client_name}
                  amountAgreed={task.amount}
                  startDate={task.start_date}
                  endDate={task.end_date}
                  taskDescription={task.description}
                  taskCompleted={task.iscomplete}
                  delete={() => deleteAppointment(task._id)}
                  complete={()=>completeAppointment(task._id)}
                />
              ))
            )}
          </div>
  );
}
