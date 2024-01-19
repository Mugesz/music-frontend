// PaymentUI.js
import React from 'react';
import { Link } from 'react-router-dom';

const PaymentUI = () => {
  // Implementation for the payment UI goes here
  return (
    <div className="relative h-screen">
      <Link to="/musics" className="absolute top-4 right-4 text-blue-500 font-semibold">
        Back to Home
      </Link>

      <div className="flex justify-center items-center h-full">
        <form className="bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter card number"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="MM/YY"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
              CVV
            </label>
            <input
              type="text"
              id="cvc"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="CVC"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
            Process Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentUI;
