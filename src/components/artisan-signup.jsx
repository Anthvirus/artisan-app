import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../redux/slices/userSlice';
import Button from './Button';
import InputBox from './Input'; // Ensure this import path is correct
import services from './services';

function ArtisanSignUpForm() {
  const [email, setEmail] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [selectedPassword, setPasswordOne] = useState('');
  const [confirmedPassword, setPasswordTwo] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    lastname: '',
    firstname: '',
    selectedPassword: '',
    confirmedPassword: ''
  });

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  function validate() {
    let valid = true;
    let errors = {
      email: '',
      selectedPassword: '',
      firstname: '',
      lastname: '',
      confirmedPassword: ''
    };
    const regxEmail = /^([a-zA-Z0-9._]+)@([a-zA-Z0-9]+)([.])([a-z]+)(.[a-z]+)?$/;
    const regxPassword = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

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

  function handleSubmit(event) {
    event.preventDefault();
    if (validate()) {
      dispatch(signupUser({
        fname: firstname,
        lname: lastname,
        email,
        password: selectedPassword,
        user_type: 'artisan',
        service: selectedService
      }));
      console.log('Form submitted:', {
        email,
        selectedPassword,
        confirmedPassword,
        firstname,
        lastname
      });
    }
  }

  return (
    <div className="flex-1 min-h-full px-1 w-full lg:w-[40rem] m-auto py-12 lg:px-8 lg:-mt-[-10rem]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
          Create Account
        </h2>
      </div>
      <div className="w-full mt-10 sm:mx-auto sm:max-w-sm">
        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div>
              <InputBox
                for="First Name"
                Label="First Name"
                type="text"
                name="first_name"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstname}
              />
              {errors.firstname && (
                <p className="mt-1 text-xs text-red-500">{errors.firstname}</p>
              )}
            </div>
            <div>
              <InputBox
                for="Last Name"
                Label="Last Name"
                type="text"
                name="last_name"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
                value={lastname}
              />
              {errors.lastname && (
                <p className="mt-1 text-xs text-red-500">{errors.lastname}</p>
              )}
            </div>
          </div>
          <div>
            <InputBox
              for="Email Address"
              Label="Email"
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div>
              <InputBox
                for="Password"
                Label="Password"
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPasswordOne(e.target.value)}
                value={selectedPassword}
              />
              {errors.selectedPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.selectedPassword}</p>
              )}
            </div>
            <div>
              <InputBox
                for="Confirm Password"
                Label="Confirm Password"
                type="password"
                name="confirm_password"
                id="confirmPassword"
                onChange={(e) => setPasswordTwo(e.target.value)}
                value={confirmedPassword}
              />
              {errors.confirmedPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmedPassword}</p>
              )}
            </div>
          </div>
          <div>
            {
              //style this
            }
            Select a Service
          <select
          id="services"
          name="services"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="">Select a service...</option>
          {services.map((service) => (
            <option key={service.id} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>
            </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              text="Submit"
              style={{ width: '10rem', height: '3rem' }}
            />
          </div>
        </form>
        <p className="mt-10 text-lg text-center text-gray-500">
          Already have an account?{' '}
          <a
            href="artisansignin"
            className="font-semibold leading-6 text-green-800 hover:text-green-600"
          >
            Sign In.
          </a>
        </p>
      </div>
    </div>
  );
}

export default ArtisanSignUpForm;
