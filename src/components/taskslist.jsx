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
        const response = await axios.get(`${baseUrl}/appointments/artisan/${userId}`);
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
                  // delete={deleteAppointment}
                />
              ))
            )}
          </div>
  );
}
