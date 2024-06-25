import client from "./client";
import avatar from '../assets/images/male_avatar.svg'

export default function UserProfile(){
    return (
      <>
        <main className="grid min-h-screen px-6 py-24 bg-gray-200 place-items-center sm:py-32 lg:px-8">
          <div className="flex items-center justify-center gap-5 p-4 bg-green-400 border rounded-2xl">
            <img className='w-80 h-80 rounded-3xl' src={avatar}></img>
            <div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{client.firstname} {client.lastname}</h1>
              <h1 className="mt-4 text-xl font-bold tracking-tight text-gray-900">{client.email}</h1>
              <h1 className="mt-4 text-xl font-bold tracking-tight text-gray-900">{client.mobile}</h1>
              <h1 className="mt-4 text-xl font-bold tracking-tight text-gray-900">{client.city}</h1>
            </div>
            <div className="flex items-center justify-center mt-10 gap-x-6">
            </div>
          </div>
        </main>
      </>
    )
  }
  