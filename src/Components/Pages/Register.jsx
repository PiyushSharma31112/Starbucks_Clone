import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser } from "../auth/auth.js";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, mobile, password, confirmPassword } = formData;
    if (!name.trim()) {
      return "Please enter your name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return "Please enter a valid email address.";
    }
    if (!/^\d{10}$/.test(mobile.trim())) {
      return "Please enter a valid 10-digit mobile number.";
    }
    if (!/^(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.*\d).{8,}$/.test(password)) {
      return "Password must be at least 8 characters and include an uppercase letter, a number, and a symbol.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return false;
    }

    setError("");
    setIsSubmitting(true);
    try {
      await registerUser(formData);
      toast.success("Your account has been created. Please log in.");
      navigate("/login", { replace: true, state: { email: formData.email.trim() } });
    } catch (submitError) {
      setError(submitError.message || "We couldn't create your account. Please try again.");
      toast.error(submitError.message || "We couldn't create your account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-[65vh] bg-gray-50 px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg sm:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-starbucks-green">Create your Starbucks account</h1>
          <p className="mt-2 text-sm text-gray-600">All fields are required.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="register-name" className="mb-1 block text-sm font-medium text-gray-700">Full name</label>
            <input id="register-name" name="name" type="text" autoComplete="name" required maxLength={100} value={formData.name} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" />
          </div>
          <div>
            <label htmlFor="register-email" className="mb-1 block text-sm font-medium text-gray-700">Email address</label>
            <input id="register-email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" />
          </div>
          <div>
            <label htmlFor="register-mobile" className="mb-1 block text-sm font-medium text-gray-700">Mobile number</label>
            <input id="register-mobile" name="mobile" type="tel" inputMode="numeric" autoComplete="tel-national" required maxLength={10} pattern="[0-9]{10}" value={formData.mobile} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" />
          </div>
          <div>
            <label htmlFor="register-password" className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input id="register-password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" required value={formData.password} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 pr-11 focus:outline-none focus:ring-2 focus:ring-green-600" />
              <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((visible) => !visible)} className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">At least 8 characters, including an uppercase letter, number, and symbol.</p>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="register-confirm-password" className="mb-1 block text-sm font-medium text-gray-700">Confirm password</label>
            <div className="relative">
              <input id="register-confirm-password" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} autoComplete="new-password" required value={formData.confirmPassword} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 pr-11 focus:outline-none focus:ring-2 focus:ring-green-600" />
              <button type="button" aria-label={showConfirmPassword ? "Hide confirmation password" : "Show confirmation password"} onClick={() => setShowConfirmPassword((visible) => !visible)} className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {error && <p role="alert" className="text-sm text-red-600 sm:col-span-2">{error}</p>}

          <button type="submit" disabled={isSubmitting} className="rounded-full bg-green-700 px-5 py-3 font-medium text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2">
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="font-medium text-green-700 underline">Log in</Link>
        </p>
      </div>
    </section>
  );
}

export default Register