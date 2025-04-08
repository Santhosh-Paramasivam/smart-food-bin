import React, { useState } from "react";
import "../styles/DonationForm.css";

const DonationForm = () => {
  const [formData, setFormData] = useState({
    donorName: "",
    emailId: "",
    phoneNumber: "",
    foodType: "",
    donationType: "",
    donatedItemName: "",
    description: "",
    timeOfPreparation: "",
    timeOfExpiry: "",
  });

  const foodTypes = ["Solid", "Liquid"];
  const donationTypes = [
    "Perishable",
    "Non-Perishable",
    "Cooked Meals",
    "Canned Goods",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Thank you for your donation!");
  };

  return (
    <div className="form-wrapper">
      <div className="donation-form-container">
        <h2>Food Donation Form</h2>
        <form onSubmit={handleSubmit} className="donation-form">
          <div className="form-group">
            <label>Donor Name</label>
            <input
              type="text"
              name="donorName"
              value={formData.donorName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-group">
            <label>Email ID</label>
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              placeholder="Enter your email address"
            />
          </div>

          <div className="form-group">
            <label>Food Type</label>
            <select
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Food Type --</option>
              {foodTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Donation Category</label>
            <select
              name="donationType"
              value={formData.donationType}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Category --</option>
              {donationTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Donated Item Name</label>
            <input
              type="text"
              name="donatedItemName"
              value={formData.donatedItemName}
              onChange={handleChange}
              placeholder="E.g. Pack of biscuits, Curry"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the item (quantity, packaging, etc.)"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Time of Preparation</label>
            <input
              type="datetime-local"
              name="timeOfPreparation"
              value={formData.timeOfPreparation}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Time of Expiry</label>
            <input
              type="datetime-local"
              name="timeOfExpiry"
              value={formData.timeOfExpiry}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Submit Donation</button>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;
