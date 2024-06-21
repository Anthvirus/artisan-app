import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import ArtisanTaskCard from './artisan-task';

export default function TasksList() {
  const { currentUser } = auth;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasksData = async () => {
      if (currentUser) {
        const tasksRef = collection(db, 'tasks');
        const q = query(tasksRef, where('artisanId', '==', currentUser.uid));
        try {
          const querySnapshot = await getDocs(q);
          const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setTasks(tasksData);
        } catch (error) {
          console.error('Error fetching tasks data:', error);
        }
      }
    };

    fetchTasksData();
  }, [currentUser]);

  return (
          <div className='w-full mx-2 p-4 md:mx-auto mt-2 bg-gray-100 lg:w-1/2 rounded-xl max-h-[30rem] overflow-y-auto'>
            <h1 className='my-4 text-3xl font-bold'>Open Jobs</h1>
            {tasks.length === 0 ? (
              <p className="text-xl text-gray-500">No Available Jobs</p>
            ) : (
              tasks.map((task, id) => (
                <ArtisanTaskCard
                  key={id}
                  clientName={task.clientName}
                  amountAgreed={task.amountAgreed}
                  startDate={task.startDate}
                  endDate={task.endDate}
                  taskDescription={task.taskDescription}
                  // delete={deleteAppointment}
                />
              ))
            )}
          </div>
  );
}
