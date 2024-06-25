import { useState } from "react";
import Button from "./Button";
import { editUser } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
export default function ClientProfile({user}){
 

  
  const client = false;
  
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    email: user.email,
    fname: user.fname,
    lname: user.lname,
    user_type: user.user_type,
    mobile_number: user.mobile_number,
    address: user.address,
    city: user.city,
    state: user.state,
    profilePicture: user.profilePicture,
  });
  // const [preview, setPreview] = useState(user.profilePicture);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        setFormValues({ ...formValues, profilePicture: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
   

    setIsLoading(true);
    try {
      const userId = localStorage.getItem('userId')
      
      await dispatch(editUser({ userId: userId, userData: {...formValues} })).unwrap();
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
          {client ?  (<></>) : (<Button
          onClick={() => setIsEditing(!isEditing)}
          text={isEditing ? 'Cancel' : 'Edit Profile'}
          />)}
        </div>
        <div>
            {isEditing && (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-3">
              <div>
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  name="fname"
                  value={formValues.fname}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lname"
                  value={formValues.lname}
                  onChange={handleInputChange}
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
                <label className="block text-gray-700">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile_number"
                  value={formValues.mobile_number}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formValues.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formValues.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={formValues.state}
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
              <Button
                type="submit"
                text="Save Changes"
                isLoading={isLoading}
              />
            </form>
            )}
          </div>
      </div>
    )
  }