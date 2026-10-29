import { useState } from 'react'
import { toast } from "react-toastify"
import { NavLink } from 'react-router-dom'
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import { loginUser } from "../auth/auth.js";


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
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault()
    setError("");
    setIsSubmitting(true);
    try {
      await loginUser({ email: userLogin.username, password: userLogin.password });
      toast.success("You’re signed in.");
      setIsOpen(false);
      setUserLogin({ username: "", password: "" });
    } catch (submitError) {
      setError(submitError.message || "We couldn't sign you in. Please try again.");
      toast.error(submitError.message || "We couldn't sign you in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserLogin((previous) => ({ ...previous, [name]: value }))
    setError("");
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
            <form action="" className='grid lg:grid-cols-2 gap-8 lg:gap-[30px] cursor-auto mt-4 p-5 lg:mt-8' onSubmit={submitForm}>
              <div className='form-control'>
                <p className='uppercase text-black font-light'>username</p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  value={userLogin.username}
                  name="username"
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className='form-control'>
                <p className='uppercase text-black font-light'>Password</p>
                <div className='flex justify-between items-center relative'>
                  <input
                    type={password ? "password" : "text"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={userLogin.password}
                    name="password"
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                  <button type="button" aria-label={password ? "Show password" : "Hide password"} onClick={handleClick} className='absolute right-2 text-gray-600'>
                    {password ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                <p className='text-[10px] text-black'>Don&apos;t have an account? <NavLink className={`text-stabucks font-medium text-[14px]`} to='/register' onClick={togglePopup} >SignUp</NavLink></p>
              </div>
              {error && <p role="alert" className="text-sm text-red-600 lg:col-span-2">{error}</p>}
              <div className='flex justify-center items-center w-full'>
                <button type='submit' disabled={isSubmitting} className='px-20 text-white bg-stabucks hover:bg-green-700 font-medium py-2 mt-4 mb-2 rounded-3xl disabled:opacity-60'>
                  {isSubmitting ? "Signing in..." : "Login"}
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