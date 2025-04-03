import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Phone } from "lucide-react";
import "../styles/signUp.css";

export default function Login() {
  const [formData, setFormData] = useState({
    phoneOrEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <div className="signup-container">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="signup-card enlarged-form-container">
          <h2 className="signup-title">Login</h2>
          <div className="signup-content">
            <form onSubmit={handleSubmit} className="signup-form enlarged-form">
              <div className="input-group">
                <Phone className="input-icon" />
                <input
                  type="text"
                  name="phoneOrEmail"
                  placeholder="Phone Number or Email"
                  value={formData.phoneOrEmail}
                  onChange={handleChange}
                  required
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
                Login
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
