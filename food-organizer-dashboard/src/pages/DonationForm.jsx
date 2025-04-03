import React, { useState } from "react";
import "../styles/DonationForm.css";

const DonationForm = () => {
  const [formData, setFormData] = useState({
    foodType: "",
    donationType: "",
    donatedItemName: "",
    description: "",
    timeOfPreparation: "",
    timeOfExpiry: "",
  });

  const foodTypes = ["Vegetarian", "Non-Vegetarian", "Vegan", "Others"];
  const donationTypes = ["Perishable", "Non-Perishable", "Cooked", "Raw"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Donation Submitted Successfully!");
  };

  return (
    <div className="donation-form-container">
      <h2>Donate Food</h2>
      <form onSubmit={handleSubmit} className="donation-form">
        {/* Food Type */}
        <label>Food Type</label>
        <select
          name="foodType"
          value={formData.foodType}
          onChange={handleChange}
          required
        >
          <option value="">Select Food Type</option>
          {foodTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Donation Type */}
        <label>Donation Type</label>
        <select
          name="donationType"
          value={formData.donationType}
          onChange={handleChange}
          required
        >
          <option value="">Select Donation Type</option>
          {donationTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Donated Item Name */}
        <label>Donated Item Name</label>
        <input
          type="text"
          name="donatedItemName"
          value={formData.donatedItemName}
          onChange={handleChange}
          placeholder="Enter item name"
          required
        />

        {/* Description */}
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the donated item"
          rows="4"
          required
        ></textarea>

        {/* Time of Preparation */}
        <label>Time of Preparation</label>
        <input
          type="datetime-local"
          name="timeOfPreparation"
          value={formData.timeOfPreparation}
          onChange={handleChange}
          required
        />

        {/* Time of Expiry */}
        <label>Time of Expiry</label>
        <input
          type="datetime-local"
          name="timeOfExpiry"
          value={formData.timeOfExpiry}
          onChange={handleChange}
          required
        />

        {/* Submit Button */}
        <button type="submit">Submit Donation</button>
      </form>
    </div>
  );
};

export default DonationForm;
