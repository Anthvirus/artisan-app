import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import Button from "./Button";
import { FaWhatsapp } from 'react-icons/fa';
import { editUser } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MdEmail, MdPhone } from 'react-icons/md';
import ArtisanPortfolioItem from "./artisanportfolioitem";
import client from "./client";
import avatar from '../assets/images/male_avatar.svg'


const ArtisanProfileCard = ({artisan}) => {
  const dispatch = useDispatch();
  console.log('arisan', artisan)
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [formValues, setFormValues] = useState({
    email: artisan.email,
    fname: artisan.fname,
    lname: artisan.lname,
    user_type: artisan.user_type,
    mobile_number: artisan.mobile_number,
    address: artisan.address,
    city: artisan.city,
    state: artisan.state,
    profilePicture: artisan.profilePicture,
  });

  const [activeTab, setActiveTab] = useState('profile'); 
  const [isAdding, setIsAdding] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState([
    {
      image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGFuZHJhZnQlMjBzdG9vbHxlbnwwfHwwfHx8MA%3D%3D',
      description: 'Handcrafted wooden table with intricate carvings.',
      date: '2024-05-15',
      client: `${client.firstName} ${client.lastName}`
    }
  ]);

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handlePortfolioSave = (e) => {
    e.preventDefault();
    const formValues = new FormData(e.target);
    const newPortfolioItem = {
      image: formValues.get('image'),
      description: formValues.get('description'),
      date: new Date().toISOString().split('T')[0], // Current date
      client: `${client.firstname} ${client.lastname}`
    };
    setPortfolioItems([...portfolioItems, newPortfolioItem]);
    setIsAdding(false);
  };
  
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
   

    
    try {
      
      const userId = localStorage.getItem('userId')
      
      await dispatch(editUser({ userId: userId, userData: {...formValues} })).unwrap();
      
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
    } 
  };
  

 

  const handleCancel = () => {
    setFormValues(artisan);
    setShowProfileForm(false);
  };





  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        if (showProfileForm){
          return (
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
                
              />
            </form>        
          )
        } else {
          return (
            <div className="flex flex-col items-center justify-center p-3 py-16 bg-gray-200 overfl0ow-y-auto md:py-0 md:gap-8 md:flex-row gap-y-12">

              <div className="flex-shrink-0">
                <img className="mx-auto rounded-full max-w-72 max-h-72 md:w-96 md:h-96 sm:mx-0" srcset={avatar} alt="Profile" />
              </div>
              <div className="flex flex-col gap-3 text-left md:ml-4">
                <div className="text-3xl font-bold leading-tight md:text-5xl">{`${artisan.fname} ${artisan.lname}`}</div>
                
                <div className="flex items-center gap-x-4">
                  <MdEmail className="w-8 h-8 text-red-500" />
                  <Link to={`mailto:${artisan.email}`} className="text-xl text-gray-700 md:text-2xl">{artisan.email}</Link>
                </div>
                <div className="flex items-center gap-x-4">
                  <MdPhone className="w-8 h-8 text-green-700" />
                  <Link to={`tel:${artisan.mobile_number}`} className="text-xl text-gray-700 md:text-2xl">{artisan.mobile_number || 'Edit Profile to Set'}</Link>
                </div>
                <div className="text-xl text-gray-700 md:text-2xl">{artisan.city }</div>
                <div className="text-xl text-gray-700 md:text-2xl">{artisan.address}</div>
              </div>
              
                <Button text="Update Profile" onClick={()=>(setShowProfileForm(!showProfileForm))}/>
            
            </div>
          );
        }
      case 'portfolio':
        return (
        <div className="flex flex-col gap-2 p-2">
          <div className="flex items-center justify-between my-2">
            <h1 className="text-2xl font-bold">Portfolio</h1>
            {(!artisan) ? (<></>
            ):(<Button text="Add to portfolio" onClick={handleAddClick} />)}
          </div>

        {isAdding ? (
          <form onSubmit={handlePortfolioSave} className="flex flex-col gap-4 p-4 bg-white rounded-xl">
          <input type="file" name="image" accept="image/*" className="p-2 border rounded" required />
          <textarea type="text" name="description" placeholder="Description" className="p-2 border rounded h-36" required />
          <div className="flex gap-4">
          <button type="button" onClick={()=> (setIsAdding(false))}  className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">Cancel</button>
          <button type="submit" className="px-4 py-2 text-white bg-green-700 rounded hover:bg-green-800">Save</button>
          </div>
          </form>
        ) : (
          portfolioItems.map((item, index) => (
          <ArtisanPortfolioItem
            key={index}
            image={item.image}
            description={item.description}
            date={item.date}
            client={item.client}
          />
        ))
        )}
        </div>
      );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full max-w-full mx-auto overflow-hidden rounded-lg gap-y-2">
      <div className="grid min-h-16 md:grid-cols-3">
        <button onClick={() => setActiveTab('profile')} className={`col-span-1 px-4 py-2 ${activeTab === 'profile' ? 'bg-green-800 text-white  md:rounded-tl-xl' : 'text-gray-700 hover:bg-green-700 hover:text-white'}`}>
          Profile
        </button>
        <button onClick={() => setActiveTab('portfolio')} className={`col-span-1 px-4 py-2 ${activeTab === 'portfolio' ? 'bg-green-800 text-white md:rounded-tr-xl' : 'text-gray-700 hover:bg-green-700 hover:text-white'}`}>
          Portfolio
        </button>
      </div>
      <div className="grid h-full p-2 overflow-y-auto bg-gray-200 rounded-xl">
        {renderContent()}
      </div>
    </div>
  );
};

export default ArtisanProfileCard;
