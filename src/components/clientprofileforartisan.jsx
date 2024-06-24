export default function ClientProfileForArtisan({user}){
// A removed the form and the functions attached to the form, just import the detail of the client 
  

    return(
      <div className="flex flex-col p-4 px-4 py-16 mx-auto mt-4 bg-white 2xl:w-1/2 rounded-2xl md:w-2/3 sm:w-5/6">    
        <div className="flex items-center mb-4 justify-evenly">
          <img
          className="object-cover w-56 h-56 mr-4 rounded-full md:h-72 md:w-72"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Profile"
          />
          <div className="flex flex-col gap-y-2">
            <h1 className="text-6xl font-bold">{user.fname}</h1>
            <h1 className="text-xl">{user.city}</h1>
            <h1 className="text-xl">{user.email}</h1>
            <h1 className="text-xl">{user.mobile_number}</h1>
          </div>
          </div>
      </div>
    )
  }