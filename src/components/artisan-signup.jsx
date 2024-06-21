import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners'; // Importing a loader from react-spinners
import Button from "./Button";
import InputBox from "./Input";

function ArtisanSignUpForm() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [selectedPassword, setPasswordOne] = useState("");
  const [confirmedPassword, setPasswordTwo] = useState("");
  const [errors, setErrors] = useState({ email: '', lastname: '', firstname: '', selectedPassword: '', confirmedPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function validate() {
    let valid = true;
    let errors = { email: '', selectedPassword: '', firstname: '', lastname: '', confirmedPassword: '' };
    var regxEmail = /^([a-zA-Z0-9._]+)@([a-zA-Z0-9]+)([.])([a-z]+)(.[a-z]+)?$/;
    var regxPassword = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

    if (lastname.trim().length < 2) {
      errors.lastname = 'Name must be at least 2 characters long';
      valid = false;
    }

    if (firstname.trim().length < 2) {
      errors.firstname = 'Name must be at least 2 characters long';
      valid = false;
    }

    if (!regxEmail.test(email)) {
      errors.email = 'Incorrect email format';
      valid = false;
    }

    if (!regxPassword.test(selectedPassword)) {
      errors.selectedPassword = 'Password must contain at least one special character, one uppercase letter and one number';
      valid = false;
    }

    if (selectedPassword.length < 8) {
      errors.selectedPassword = 'Password must be at least 8 characters';
      valid = false;
    }

    if (selectedPassword !== confirmedPassword) {
      errors.confirmedPassword = 'Passwords don\'t match';
      valid = false;
    }

    setErrors(errors);
    return valid;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (validate()) {
      setIsLoading(true); // Start the loading spinner
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, selectedPassword);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          firstname: firstname,
          lastname: lastname,
          email: email,
          accountBalance: 0,
          profilePicture: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=626&ext=jpg&ga=GA1.1.724018076.1718773100&semt=ais_user',
        });

        toast.success('Sign up successful! Redirecting to login...', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate('/artisansignin');
        }, 3000);
      } catch (error) {
        console.error('Error signing up:', error);
        toast.error('Error signing up: ' + error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="flex-1 min-h-full px-1 w-full lg:w-[40rem] m-auto py-12 lg:px-8 lg:-mt-[-10rem]">
      <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
          Create Account
        </h2>
      </div>
      <div className="w-full mt-10 sm:mx-auto sm:max-w-sm">
        <form className="w-full space-y-6" onSubmit={handleSubmit} method="POST">
          <div className="flex flex-col gap-5 lg:flex-row">
            <div>
              <InputBox for="First Name" Label="First Name" type="text" name="first_name" id="firstName" onChange={(e) => setFirstName(e.target.value)} value={firstname} />
              {errors.firstname && <p className="mt-1 text-xs text-red-500">{errors.firstname}</p>}
            </div>
            <div>
              <InputBox for="Last Name" Label="Last Name" type="text" name="last_name" id="lastName" onChange={(e) => setLastName(e.target.value)} value={lastname} />
              {errors.lastname && <p className="mt-1 text-xs text-red-500">{errors.lastname}</p>}
            </div>
          </div>
          <div>
            <InputBox for="Email Address" Label="Email" type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div>
              <InputBox for="Password" Label="Password" type="password" name="password" id="password" onChange={(e) => setPasswordOne(e.target.value)} value={selectedPassword} />
              {errors.selectedPassword && <p className="mt-1 text-xs text-red-500">{errors.selectedPassword}</p>}
            </div>
            <div>
              <InputBox for="Confirm Password" Label="Confirm Password" type="password" name="confirm_password" id="confirmPassword" onChange={(e) => setPasswordTwo(e.target.value)} value={confirmedPassword} />
              {errors.confirmedPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmedPassword}</p>}
            </div>
          </div>
          <div className="flex justify-center">
            <Button type="submit" text={isLoading ? <ClipLoader size={24} color={"#ffffff"} /> : "Submit"} disabled={isLoading} style={{ width: "10rem", height: "3rem" }} />
          </div>
        </form>
        <p className="mt-10 text-lg text-center text-gray-500">
          Already have an account?{' '}
          <Link to="/signin" className="font-semibold leading-6 text-green-800 hover:text-green-600">
            Sign In.
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ArtisanSignUpForm;
