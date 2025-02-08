import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash  } from "react-icons/fa";

// For input box

const InputField = ({ placeholder, type, name, value, onChange }) => {
  return (<input 
    name= {name}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    type={type} 
    className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
  />
)}


function Register() {

  // for hide and show pass functionallty

  const [passWord, setPassWord] = useState(true)

  const handleClick = () => {
    setPassWord(!passWord);
  } 

  const [confirmPassWord, setConfirmPassWord] = useState(true)

  const handleClickConfirm = () => {
    setConfirmPassWord(!confirmPassWord);
  } 

  // Form setUp

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobile: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { email, mobile, password, confirmPassword } = formData;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!mobile.match(/^\d{10}$/)) {
      setError("Please enter a valid 10-digit mobile number.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long, contain 1 uppercase letter, 1 symbol, and 1 number."
      );
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Registration successful!");
      console.log("Form Data Submitted:", formData);
    } else {
      toast.error(error || "Validation failed.");
    }

    setFormData({
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      mobile: ""
    })
  }

  return (
    <div className='min-h-screen w-full bg-starbucks-green flex flex-col items-center justify-center px-4'>

      <div className='w-full bg-white rounded-t-xl h-auto p-5'>
        
        <div className='mt-4 px-10 mb-6'>
          <div className='flex justify-between items-center'>
            <div className='w-8 h-8 bg-green-600 text-white flex items-center justify-center rounded-full'>1</div>
            <div className='flex-1 h-1 bg-green-300 mx-2'></div>
            <div className='w-8 h-8 bg-green-600 text-white flex items-center justify-center rounded-full'>2</div>
            <div className='flex-1 h-1 bg-gray-300 mx-2'></div>
            <div className='w-8 h-8 bg-green-600 text-white flex items-center justify-center rounded-full'>3</div>
            <div className='flex-1 h-1 bg-gray-300 mx-2'></div>
          </div>
        </div>

      {/* Form Section */}

        <div className='bg-white p-8 rounded-lg shadow-lg w-full '>
          <div className='mb-6 text-center'>
            <h2 className='text-2xl font-semibold'>Login to Starbucks</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

              {/* Email Input */}

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email ID</label>

                <InputField 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email ID"
                />
              </div>

              {/* Mobile Number Input */}

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Mobile no</label>

                <InputField 
                  type="Number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                />
              </div>

              {/* Password Input */}

              <div className=''>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Enter Password</label>

                <div className='relative flex w-[100%] items-center justify-between'>
                  <InputField 
                    type={passWord ? "password" : "text"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                  />
                  <div className='absolute right-2'>
                    {
                      passWord ? <FaEye onClick={handleClick} />  : <FaEyeSlash onClick={handleClick} />
                    }
                  </div>
                </div>
              </div>

                {/* Confirm Password Input */}

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Confirm Password</label>

                <div className='relative flex w-[100%] items-center justify-between'>
                  <InputField 
                    type={confirmPassWord ? "password" : "text"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-Enter Password"
                  />
                  <div className='absolute right-2'>
                    {
                      confirmPassWord ? <FaEye onClick={handleClickConfirm} />  : <FaEyeSlash onClick={handleClickConfirm} />
                    }
                  </div>
                </div>
              </div>
            </div>
            {/* Error Message */}
            
            {
              error && <p className='text-red-500 text-sm mt-4'>{error}</p>
            }

            {/* Submit Button */}
            <div className='flex justify-center items-center w-full h-auto p-2'>
              <button type='submit' className='w-auto mt-6 bg-green-600 text-white py-2 px-4 rounded-3xl hover:bg-green-700 focus:ring-2 focus:ring-green-500'>
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register