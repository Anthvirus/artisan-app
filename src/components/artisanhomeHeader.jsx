import Button from './Button'
import Popup from './popup.jsx';
import { useState } from 'react';

export default function HeaderHome({ userData, }) {
  const [showPopupTwo, setShowPopupTwo] = useState(false);

  const toggleWithdrawalPopup = () => {
    setShowPopupTwo(!showPopupTwo);
  };

  return (
    <header className="pt-3 bg-gray-200 shadow h-28">
      <div className="flex items-center justify-between px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold text-gray-900">Hi, <span className="font-extrabold">{userData?.firstname}</span></h1>
        <div className='flex gap-2'>
          <h1 className="flex items-end font-semibold text-gray-900 text-md">Account balance: <b className='text-4xl'>{`$${"0.00"} `||` ${userData?.accountBalance}`}</b></h1>
          <Button type="button" text="Withdraw" style={{ backgroundColor: "inherit", color: "green", boxShadow: 0 }} onClick={toggleWithdrawalPopup} />
          <Popup show={showPopupTwo} onClose={toggleWithdrawalPopup}>
            <form className="flex flex-col h-96 gap-y-2">
              <label htmlFor="amount" className="block text-xl font-medium leading-6 text-gray-900">
                Amount $:
              </label>
              <div>
                <input
                  type="num"
                  name="amount"
                  id="amount"
                  placeholder="0.00"
                  className="block w-full h-12 px-2 text-4xl font-extrabold text-right text-gray-900 rounded-md shadow-sm placeholder:text-gray-600 ring-0 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600"
                />
              </div>
              <label htmlFor="bank" className="block mt-3 text-xl font-medium leading-6 text-gray-900">
                Select Bank:
              </label>
              <div>
                <select className='w-full h-12' id="bank" name="bank">
                  <option>-</option>
                  <option>Opay</option>
                  <option>Kuda</option>
                  <option>Access Bank</option>
                </select>
                <label htmlFor="account-number" className="block mt-4 mb-2 text-xl font-medium leading-6 text-gray-900">
                  Account Number:
                </label>
                <div>
                  <input
                    type="num"
                    name="account-number"
                    id="account-number"
                    className="block w-full h-12 px-4 text-2xl text-gray-900 rounded-md shadow-sm placeholder:text-gray-600 ring-0 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600"
                  />
                </div>
              </div>
              <Button style={{ marginTop: "2rem" }} text="Submit" />
            </form>
          </Popup>
        </div>
      </div>
    </header>
  );
}