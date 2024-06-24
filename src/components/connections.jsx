import React, { useState, useEffect } from 'react';
import ContactCard from './contact.jsx';
import { baseUrl } from '../../constants/server.js';

  
  function Connections(){
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
      const userId = localStorage.getItem('userId')
      const fetchConnections = async () => {
        try {
          const response = await fetch(`${baseUrl}/connections/${userId}`); // Adjust the URL as per your backend setup
          if (!response.ok) {
            throw new Error('Failed to fetch connections');
          }
          const data = await response.json();
          const processedContacts = data.map((connection) => {
            if (connection.artisan_id) {
              return {
                id: connection._id,
                receiver_id: connection.artisan_id._id,
                name: `${connection.artisan_id.fname} ${connection.artisan_id.lname}`,
                available: true, // Replace with actual availability logic if available
                imageUrl: connection.artisan_id.picture || '',
                service: connection.artisan_id.service || '',
              };
            } else if (connection.client_id) {
              return {
                id: connection._id,
                receiver_id: connection.client_id._id,
                //receiver id needed for chats
                name: `${connection.client_id.fname} ${connection.client_id.lname}`,
                available: true, // Replace with actual availability logic if available
                imageUrl: connection.client_id.picture || '', // Replace with client image URL if available
                service: '', // Replace with client service if available
              };
            }
            return null; // Handle unexpected cases, if any
          }).filter(contact => contact !== null); // Filter out any null entries
  
          setContacts(processedContacts);
        } catch (error) {
          console.error('Error fetching connections:', error);
        }
      };
  
      fetchConnections();
    }, []); // Empty dependency array ensures the effect runs only once on mount
  
    function handleClick (){
        console.log(contacts.openedName)
    }
    return (
      <div className='w-full mx-2 p-4 md:mx-auto mt-2 bg-gray-100 lg:w-1/2 rounded-xl max-h-[30rem] overflow-y-auto'>
         <ul role="list" className="flex flex-col gap-2 bg-gray-100 divide-y divide-gray-100 rounded-xl">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} id={contact.id} name={contact.name} receiver_id={contact.receiver_id} available={contact.available} imageUrl={contact.imageUrl} service={contact.service} onClick={handleClick}/>
          ))}
        </ul>
      </div>
    )
  }
  
export default Connections; 