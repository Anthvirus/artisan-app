import { useState } from "react";
import Button from "./Button";

export default function ClientProfile(){
    const [user, setUser] = useState({
    name: 'John Doe',
    location: 'New York, USA',
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    email: 'john.doe@example.com',
    tel: '+234-903-601-331-5'
  });

  const client = false;
  
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState(user);
  const [preview, setPreview] = useState(user.profilePicture);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormValues({ ...formValues, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUser(formValues);
    setIsEditing(false);
  };
    return(
      <div className="flex flex-col p-4 px-4 py-16 mx-auto mt-4 bg-white 2xl:w-1/2 rounded-2xl md:w-2/3 sm:w-5/6">    
        <div className="flex items-center mb-4 justify-evenly">
          <img
          className="object-cover w-56 h-56 mr-4 rounded-full md:h-72 md:w-72"
          src={user.profilePicture}
          alt="Profile"
          />
          <div className="flex flex-col gap-y-2">
            <h1 className="text-6xl font-bold">{user.name}</h1>
            <h1 className="text-xl">{user.location}</h1>
            <h1 className="text-xl">{user.email}</h1>
            <h1 className="text-xl">{user.tel}</h1>
          </div>
          {client ? (<Button
          onClick={() => setIsEditing(!isEditing)}
          text={isEditing ? 'Cancel' : 'Edit Profile'}
          />) : (<></>)}
        </div>
        <div>
            {isEditing && (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-3">
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Location</label>
                  <input
                  type="text"
                  name="location"
                  value={formValues.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Profile Picture</label>
                  <input
                  type="file"
                  accept="image/*"
                  name="profilePicture"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Phone Number</label>
                  <input
                  type="tel"
                  name="tel"
                  value={formValues.tel}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <Button
                type="submit"
                text="Save Changes"
                />
              </form>
            )}
          </div>
      </div>
    )
  }