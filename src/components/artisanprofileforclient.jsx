import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import ArtisanPortfolioItem from "./artisanportfolioitem";
import axios from 'axios'; // Import axios
import Popup from "./popup";
import { baseUrl } from "../../constants/server";
import avatar_image from "../assets/images/male_avatar.svg";
import client from './client'

const ArtisanProfileCardForClient = ({ artisan }) => {
  const [appointments, setAppointments] = useState(false);
  const name = artisan.fname;
  console.log('Artisan', artisan.fname);
  console.log('Name', name);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [endDate, setEnd] = useState("");
  const [startDate, setStart] = useState("");
  const navigate = useNavigate();
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isAlreadyConnected, setIsAlreadyConnected] = useState(false);
  const [connectionId, setConnectionId] = useState(null);

  const [portfolioItems, setPortfolioItems] = useState([]);
  useEffect(() => {
    // Fetch portfolio items from the backend
    const artisan_id = localStorage.getItem('userId');
    const fetchPortfolioItems = async () => {
      try {
        const response = await axios.get(`${baseUrl}/portfolios/${artisan_id}`);
        setPortfolioItems(response.data);
      } catch (error) {
        console.error('Error fetching portfolio items:', error);
        setError('Error fetching portfolio items');
      }
    };

    fetchPortfolioItems();
  }, []);

  const handleAddClick = () => {
    setIsAdding(true);
  };


    const submitAppointment = async (e) => {
      setAppointments(false);
      e.preventDefault();
    if (name.trim() !== '' && description.trim() !== '' && amount.trim() !== '' && startDate !== '' && endDate !== '') {
      const clientId = localStorage.getItem('userId'); // Current logged in user
      const appointmentData = {
        client_id: clientId,
        artisan_id: artisan._id,
        start_date: startDate,
        end_date: endDate,
        amount: parseFloat(amount),
        description: description,
      };

      try {
        const response = await axios.post(`${baseUrl}/appointments`, appointmentData);
        if (response.status === 201) {
          console.log('Appointment created:', response.data);
          // React toast here
          setAppointments(false);
        } else {
          console.error('Error creating appointment:', response.data.message);
        }
      } catch (error) {
        console.error('Error creating appointment:', error);
      }
    } else {
      console.error('All fields are required.');
    }
  };

  const checkConnection = async () => {
    try {
      const clientId = localStorage.getItem('userId'); // Current logged in user
      const response = await axios.get(`${baseUrl}/connections/${clientId}`);
      const connections = response.data;

      const existingConnection = connections.find(
        (connection) => connection.artisan_id._id === artisan._id
      );

      if (existingConnection) {
        setIsAlreadyConnected(true);
        setConnectionId(existingConnection._id); // Store the connection ID
      }
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  useEffect(() => {
    

    checkConnection();
  }, [artisan._id]);

  const handleAddToConnection = async () => {
    try {
      const clientId = localStorage.getItem('userId'); // Current logged in user
      const artisanId = artisan._id;
      const response = await axios.post(`${baseUrl}/connections`, {
        client_id: clientId,
        artisan_id: artisanId
      });
      if (response.status === 201) {
        console.log('Connection added:', response.data);
        checkConnection();
        // React toast here

      } else {
        console.error('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding connection:', error);
    }
  };
  const handleRemoveConnection = async () => {
   
    try {
      const response = await axios.delete(`${baseUrl}/connections/${connectionId}`);
      if (response.status === 200) {
        console.log('Connection removed:', response.data);
        setIsAlreadyConnected(false); // Update the state to reflect the removal
        setConnectionId(null); // Clear the stored connection ID
        checkConnection();
        // React toast here
      } else {
        console.error('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Error removing connection:', error);
    }
  };
console.log('COn', isAlreadyConnected)
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="flex flex-col items-center justify-center p-3 py-16 bg-gray-200 overflow-y-auto md:py-0 md:gap-8 md:flex-row gap-y-12">
            <Popup show={appointments} onClose={() => setAppointments(false)}>
              <h1 className="text-3xl font-semibold">Create Appointment</h1>
              <form className="flex flex-col gap-4 my-4 " onSubmit={submitAppointment}>
                <div className="flex flex-col items-start gap-2">
                  <label className="text-lg">Name of Artisan:</label>
                  <input
                    name="name"
                    type="text"
                    className="items-center w-full h-12 p-2 text-xl rounded-md"
                    readOnly
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
                <Button text="Submit Appointment" type="submit" />
              </form>
            </Popup>
            <div className="flex-shrink-0">
              <img
                className="mx-auto rounded-full max-w-72 max-h-72 md:w-96 md:h-96 sm:mx-0"
                src={avatar_image}
                alt="Profile"
              />
            </div>
            <div className="flex flex-col gap-3 text-left md:ml-4">
              <div className="text-3xl font-bold leading-tight md:text-5xl">{`${artisan?.fname} ${artisan?.lname}`}</div>
              <div className="flex items-center gap-x-4">
                <FaWhatsapp className="w-8 h-8 text-green-500" />
                <a
                  href={`https://wa.me/${artisan.mobile_number}`}
                  className="text-xl text-gray-700 md:text-2xl"
                >
                  {artisan.mobile_number || "+1234567890"}
                </a>
              </div>
              <div className="flex items-center gap-x-4">
                <MdEmail className="w-8 h-8 text-red-500" />
                <a
                  href={`mailto:${artisan.email}`}
                  className="text-xl text-gray-700 md:text-2xl"
                >
                  {artisan.email}
                </a>
              </div>
              <div className="flex items-center gap-x-4">
                <MdPhone className="w-8 h-8 text-green-700" />
                <a
                  href={`tel:${artisan.mobile_number}`}
                  className="text-xl text-gray-700 md:text-2xl"
                >
                  {artisan.mobile_number}
                </a>
              </div>
              <div className="text-xl text-gray-700 md:text-2xl">
                {artisan.city || "City, Country"}
              </div>
              <div className="text-xl text-gray-700 md:text-2xl">
                {artisan.address || "123 Artisan Street, Office 456"}
              </div>
            </div>
            <div className="flex flex-col gap-2">
            {isAlreadyConnected ? (
              <div className="flex flex-col gap-2">
                <Button text="Already a Connection" disabled={true} style={{color: "#166534", backgroundColor:'transparent'}} />
                <Button text="Remove Connection" danger={true} onClick={handleRemoveConnection}/>
              </div>
              ) : (
                <Button text="Add to Connections" onClick={handleAddToConnection} />
              )}
              
              <Button
                text="Create Appointment"
                onClick={() => setAppointments(true)}
              />
            </div>
          </div>
        );

      case "portfolio":
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
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full max-w-full mx-auto overflow-hidden rounded-lg gap-y-2">
      <div className="grid min-h-16 md:grid-cols-3">
        <button
          onClick={() => setActiveTab("profile")}
          className={`col-span-1 px-4 py-2 ${
            activeTab === "profile"
              ? "bg-green-800 text-white  md:rounded-tl-xl"
              : "text-gray-700 hover:bg-green-700 hover:text-white"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("portfolio")}
          className={`col-span-1 px-4 py-2 ${
            activeTab === "portfolio"
              ? "bg-green-800 text-white md:rounded-tr-xl"
              : "text-gray-700 hover:bg-green-700 hover:text-white"
          }`}
        >
          View Portfolio
        </button>
      </div>
      <div className="grid h-full p-2 overflow-y-auto bg-gray-200 rounded-xl">
        {renderContent()}
      </div>
    </div>
  );
};

export default ArtisanProfileCardForClient;
