import ContactCard from "./contact.jsx";
import contacts from "./contact.js";

  
  function Connections(){
    function handleClick (){
        console.log(contacts.openedName)
    }
    return (
      <div className='w-full mx-2 p-4 md:mx-auto mt-2 bg-gray-100 lg:w-1/2 rounded-xl max-h-[30rem] overflow-y-auto'>
         <ul role="list" className="flex flex-col gap-2 bg-gray-100 divide-y divide-gray-100 rounded-xl">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} name={contact.name} available={contact.available} imageUrl={contact.imageUrl} service={contact.service} onClick={handleClick}/>
          ))}
        </ul>
      </div>
    )
  }
  
export default Connections; 