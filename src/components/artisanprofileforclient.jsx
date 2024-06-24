import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
// import { doc, getDoc, updateDoc } from 'firebase/firestore';
// import { auth, db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Button from "./Button";
import { FaWhatsapp } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import ArtisanPortfolioItem from "./artisanportfolioitem";
import client from "./client";
import Popup from "./popup";

// This page should be what the client sees of the artisan

const reviews = [
  { name: 'John Doe', imageUrl: 'https://via.placeholder.com/40', review: 'Great service!' },
  { name: 'Jane Smith', imageUrl: 'https://via.placeholder.com/40', review: 'Very professional and reliable.' },
  { name: 'Jane Smith', imageUrl: 'https://via.placeholder.com/40', review: 'Very professional and reliable.' },
  { name: 'Jane Smith', imageUrl: 'https://via.placeholder.com/40', review: 'Very professional and reliable.' },
];

const portfolio = [
  {clientName: 'John Smith', src: 'https://via.placeholder.com/40', description : "Wall Mounting of 32 inches television", date: "23/02/1987"}
]

const ArtisanProfileCardForClient = ({artisan}) => {
  const [appointments, setAppointments] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState(artisan.fname);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [endDate, setEnd] = useState('');
  const [startDate, setStart] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({ 
      name: "",
      email: "",
      phoneNumber:"",
      whatsappContact: "",
      officeAddress: "",
      location: "",  
    }
  );
  const [reviewFormData, setReviewFormData] = useState({ rating: '', review: '' });
  const [activeTab, setActiveTab] = useState('profile'); 
  const [allReviews, setAllReviews] = useState(reviews)
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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (artisan._id) {
      const url = `${baseUrl}/users/${userId}`;
      const formDataToSend = new FormData();
    
      // Append form data
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('mobile_number', formData.phoneNumber);
      formDataToSend.append('city', formData.location);
      formDataToSend.append('address', formData.officeAddress);
     
      // Append profile picture if it exists
      if (formData.profilePicture) {
        formDataToSend.append('picture', formData.profilePicture);
      }
    
      try {
        const response = await fetch(url, {
          method: 'PUT',
          body: formDataToSend,
          headers: {
            // Add headers if needed, for example, authorization headers
            // 'Authorization': 'Bearer your-token'
          }
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
    
        const result = await response.json();
        console.log('Profile updated successfully:', result);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
    };
  

  const createAppointment = () => {
    setAppointments(false);
    console.log(tasks);
  };

  const handleCancel = () => {
    setFormData(artisan);
    setShowProfileForm(false);
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewFormData({ ...reviewFormData, [name]: value });
  };

  const handleReviewSave = () => {
    const newReview = {
      name: client.firstname +" "+ client.lastname,
      imageUrl: client.imageUrl,
      review: reviewFormData.review,
      rating: reviewFormData.rating
    };
    setAllReviews([ newReview, ...allReviews]);
    setShowReviewForm(false);
    setReviewFormData({ rating: '', review: '' });
    console.log(allReviews);
  };

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (artisan._id) {
  //     } else {
  //       navigate('/artisansignin');
  //     }
  //   };

  //   fetchUserData();
  // }, [artisan._id, navigate]);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        if (showProfileForm){
          return (
            <form onSubmit={handleSubmit} className="w-full p-4 mx-auto overflow-y-auto bg-white rounded-lg shadow-lg">
        <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        </div>
        <div className="mb-4">
        <label className="block text-gray-700">Profile Picture</label>
        <input
        type="file"
        name="profilePicture"
        onChange={handleChange}
        className="w-full p-2 border rounded"
        />
        </div>
        <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        </div>
        <div className="mb-4">
        <label className="block text-gray-700">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        </div>
        <div className="mb-4">
        <label className="block text-gray-700">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        </div>
        <div className="mb-4">
        <label className="block text-gray-700">Office Address</label>
        <input
          type="text"
          name="officeAddress"
          value={formData.officeAddress}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        </div>
        <div className="mb-4">
        <label className="block text-gray-700">WhatsApp Contact</label>
        <input
          type="text"
          name="whatsappContact"
          value={formData.whatsappContact}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        </div>
        <div className="flex justify-between">
        <button type="button" onClick={handleCancel} className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 text-white bg-green-700 rounded hover:bg-green-800">
          Save
        </button>
      </div>
            </form>         
          )
        } else {
          return (
            <div className="flex flex-col items-center justify-center p-3 py-16 bg-gray-200 overfl0ow-y-auto md:py-0 md:gap-8 md:flex-row gap-y-12">
            <Popup show={appointments} onClose={createAppointment}>
          <h1 className="text-3xl font-semibold">Create Appointment</h1>
          <form className="flex flex-col gap-4 my-4">
            <div className="flex flex-col items-start gap-2">
              <label className="text-lg">Name of Artisan:</label>
              <input
                name="name"
                type="text"
                className="items-center w-full h-12 p-2 text-xl rounded-md"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <label className="text-lg">
                Describe the task the artisan is to do:
              </label>
              <textarea
                name="description"
                type="text"
                className="items-center w-full h-24 p-2 text-xl rounded-md"
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="flex my-2 gap-x-4">
              <div className="flex items-center justify-center gap-x-2">
                <label className="text-xl">Start Date:</label>
                <input
                  name="start_date"
                  type="date"
                  className="items-center h-12 p-2 text-xl rounded-md w-72"
                  required
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center gap-x-2">
                <label className="text-xl">End Date:</label>
                <input
                  name="end_date"
                  type="date"
                  className="items-center h-12 p-2 text-xl rounded-md w-72"
                  required
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 my-2">
              <label className="text-xl">Amount Agreed $:</label>
              <input
                name="amount"
                type="text"
                className="items-center h-12 p-2 text-xl rounded-md w-96"
                required
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
            </div>
            <Button text="Submit Appointment" onClick={submitAppointment} />
          </form>
        </Popup>
              <div className="flex-shrink-0">
                <img className="mx-auto rounded-full max-w-72 max-h-72 md:w-96 md:h-96 sm:mx-0" srcSet={userData?.profilePicture} alt="Profile" />
              </div>
              <div className="flex flex-col gap-3 text-left md:ml-4">
                <div className="text-3xl font-bold leading-tight md:text-5xl">{formData.name || `${userData?.firstname} ${userData?.lastname}`}</div>
                <div className="flex items-center gap-x-4">
                  <FaWhatsapp className="w-8 h-8 text-green-500" />
                  <Link to={`https://wa.me/${formData.whatsapp}`} className="text-xl text-gray-700 md:text-2xl">{formData.whatsapp || '+1234567890'}</Link>
                </div>
                <div className="flex items-center gap-x-4">
                  <MdEmail className="w-8 h-8 text-red-500" />
                  <Link to={`mailto:${formData.email}`} className="text-xl text-gray-700 md:text-2xl">{formData.email || userData?.email}</Link>
                </div>
                <div className="flex items-center gap-x-4">
                  <MdPhone className="w-8 h-8 text-green-700" />
                  <Link to={`tel:${formData.phone}`} className="text-xl text-gray-700 md:text-2xl">{formData.whatsapp || '+1234567890'}</Link>
                </div>
                <div className="text-xl text-gray-700 md:text-2xl">{formData.location || 'City, Country'}</div>
                <div className="text-xl text-gray-700 md:text-2xl">{formData.officeAddress || '123 Artisan Street, Office 456'}</div>
              </div>
                    <div className="flex flex-col gap-2">
                      <Button text="Add to Connections" onClick={()=>(setShowProfileForm(!showProfileForm))}/>
                      <Button text="Create Appointment" onClick={()=>(setShowProfileForm(!showProfileForm))}/>
                    </div>
            </div>
          );
        }
      case 'reviews':
        if (showReviewForm) {
          return (
            <form className="w-4/5 p-4 mx-auto my-auto bg-white border rounded-xl">
              <h2 className="mb-4 text-xl font-bold md:text-2xl">Add Review</h2>
              <div className="">
              <p>What Rating would you give this artisan:</p>
                <select name="rating" value={reviewFormData.rating} onChange={handleReviewChange} className="w-full h-12 my-2 border">
                  <option value="1" className="h-24">-</option>
                  <option value="1" className="h-24">1</option>
                  <option value="2" className="h-24">2</option>
                  <option value="3" className="h-24">3</option>
                  <option value="4" className="h-24">4</option>
                  <option value="5" className="h-24">5</option>
                </select>
              </div>
              <textarea
                placeholder="Review"
                name="review"
                value={reviewFormData.review}
                onChange={handleReviewChange}
                className="w-full h-32 px-3 py-2 mb-4 bg-gray-200 rounded"
              />
              <div className="flex gap-4">
                <button type="button" onClick={() => setShowReviewForm(false)} className="flex items-center justify-center w-full px-4 py-2 mt-4 text-white bg-red-700 rounded md:w-auto hover:bg-red-600">Cancel</button>
                <button type="button" onClick={handleReviewSave} className="flex items-center justify-center w-full px-4 py-2 mt-4 text-white bg-green-800 rounded md:w-auto hover:bg-green-700">Save</button>
              </div>
            </form>
          );
        } else {
          return (
            <div>
              <div className="flex justify-between my-4">
              <h2 className="m-2 text-xl font-bold text-gray-800 rounded-xl md:text-2xl">Reviews</h2>
              {(!artisan) ? (
                <Button text="Add Review" onClick={() => setShowReviewForm(true)} />
              ): (<></>)}
              </div>
              <div className="grid grid-cols-1 gap-2 rounded-xl">
                {allReviews.map((review, index) => (
                  <div key={index} className="w-full p-4 bg-gray-100 h-36 rounded-xl">
                    <div className="flex items-center h-full mb-2">
                      <img className="w-24 h-24 mr-4 rounded-full" src={review.imageUrl} alt={review.name} />
                      <div>
                        <p className="text-lg font-medium text-gray-800 md:text-xl">{review.name}</p>
                        <p className="text-gray-600">{review.review}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }
      case 'portfolio':
        return (
        <div className="flex flex-col gap-2 p-2">
          <div className="flex items-center justify-between my-2">
            <h1 className="text-2xl font-bold">Portfolio</h1>
          </div>
        {portfolioItems.map((item, index) => (
          <ArtisanPortfolioItem
            key={index}
            image={item.image}
            description={item.description}
            date={item.date}
            client={item.client}
          />
        ))
        }
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
        <button onClick={() => setActiveTab('reviews')} className={`col-span-1 px-4 py-2 ${activeTab === 'reviews' ? 'bg-green-800 text-white' : 'text-gray-700 hover:bg-green-700 hover:text-white'}`}>
          Reviews
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

export default ArtisanProfileCardForClient;
