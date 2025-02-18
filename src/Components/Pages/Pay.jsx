import React, { useRef, useState } from 'react'
import { toast } from "react-toastify"
import { NavLink } from 'react-router-dom'
import { FaEye, FaEyeSlash  } from "react-icons/fa";


const InputField = ({type, placeholder, value, name, onChange }) => {
  return (
    <input
      type = {type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
    />
  );
};

function Pay() {

  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState(true)

  const handleClick = () => {
    setPassword(!password)
  }

  // Function to toggle the popup
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // this is for form


  const [userLogin, setUserLogin] = useState({
    username: "",
    password: ""
  })

  const submitForm = (e) => {
    e.preventDefault()
    console.log(userLogin)

    setUserLogin({
      username: "",
      password: ""
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserLogin({ ...userLogin, [name]: value })
}


  // ${close ? "hidden" : "flex"} = This will go in section

  return (
    <div className="h-auto flex flex-col items-center justify-center">
      {/* Button to Open Popup */}
      <button
        onClick={togglePopup}
        className="font-light text-lg text-gray-500 py-2 hover:text-stabucks"
      >
        Pay
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#f2f0eb] rounded-lg shadow-lg w-11/12 md:w-1/3">
            
            {/* Popup Header */}
            <div className="flex justify-between items-center border-b px-4 py-2">
              <h3 className="text-lg font-bold text-starbucks-green">Login</h3>
              <button
                onClick={togglePopup}
                className="text-gray-600 hover:text-red-500"
              >
                &times;
              </button>
            </div>

            {/* Form */}
            <form action="" className='grid, lg:grid-cols-2 gap-8 lg:gap-[30px] cursor-auto mt-4 p-5 lg:mt-8' onSubmit={submitForm}>
              <div className='form-control'>
                <p className='uppercase text-black font-light'>username</p>
                <InputField
                  type= "text"
                  placeholder="Enter your email"
                  value={userLogin.username}
                  name="username"
                  onChange={handleChange}
                />
              </div>

              <div className='form-control'>
                <p className='uppercase text-black font-light'>Password</p>
                <div className='flex justify-between items-center relative'>
                  <InputField
                    type= {password ? "password" : "text"}
                    placeholder="Enter your password"
                    value={userLogin.password}
                    name="password"
                    onChange={handleChange}
                  />
                  <div className='absolute right-2'>
                    {
                      password ? <FaEye onClick={handleClick} /> : <FaEyeSlash onClick={handleClick} />
                    }
                  </div>
                </div>
                <p className='text-[10px] text-black'>Don't have an account? <NavLink className={`text-stabucks font-medium text-[14px]`} to='/register' onClick={togglePopup} >SignUp</NavLink></p>
              </div>
              <div className='flex justify-center items-center w-full'>
                <button type='submit' className='px-20 text-white bg-stabucks hover:bg-green-700 font-medium py-2 mt-4 mb-2 rounded-3xl'>
                  Login
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pay