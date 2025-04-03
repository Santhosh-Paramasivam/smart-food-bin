import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone } from "lucide-react";
import "../styles/signUp.css";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", formData);
  };

  return (
    <div className="signup-container">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="signup-card enlarged-form-container">
          <h2 className="signup-title">Sign Up</h2>
          <div className="signup-content">
            <form onSubmit={handleSubmit} className="signup-form enlarged-form">
              <div className="input-group">
                <User className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <Phone className="input-icon" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <Mail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email (Optional)"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <Lock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="signup-button">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
