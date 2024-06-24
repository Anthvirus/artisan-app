import Button from "./Button";
import { Link } from "react-router-dom";

export default function AppointmentCard(task){
    return (
        <>
          <div className='w-1/2 h-auto p-4 mx-auto mt-4 bg-white rounded-2xl max-h-[40rem]'>
            <div className="flex flex-col w-full p-3 mx-auto my-2 overflow-hidden bg-gray-100 rounded-lg shadow-lg max-h-64">
      <div className="p-4">
        <div className="mb-2">
          <Link to="/" className="text-3xl font-extrabold text-gray-800">{task.artisanName}</Link>
          <p className="my-4 text-lg text-gray-600">{task.taskDescription}</p>
        </div>
        <div className="mb-2">
          <div className="flex justify-between text-xl">
            <span className="text-gray-600">Start Date:</span>
            <span className="text-gray-800">{task.startDate}</span>
          </div>
          <div className="flex justify-between text-xl">
            <span className="text-gray-600">End Date:</span>
            <span className="text-gray-800">{task.endDate}</span>
          </div>
        </div>
        <div className="flex justify-between mb-2 text-2xl">
          <span className="text-gray-600">Amount Agreed:</span>
          <span className="font-extrabold text-gray-800">${task.amountAgreed}</span>
        </div>
      </div>
      <Button text="Cancel Appointment" onClick={task.delete}/>
          </div>
        </div>
        </>
    )
}