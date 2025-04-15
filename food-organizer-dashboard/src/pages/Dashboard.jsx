import React, { useEffect, useState } from "react";
import "../styles/dash.css";
import { supabase } from "../supabaseClient";
import axios from 'axios';
import { serverUrl } from "../serverCredential";

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [temperature, setTemperature] = useState("loading");
  const [humidity, setHumidity] = useState("loading");
  const [lastUpdateTime, setLastUpdateTime] = useState("loading");
  const [foodWeight, setFoodWeight] = useState("loading");
  const [foodSpoiled, setFoodSpoiled] = useState("loading");

  const [foodBins, setFoodBins] = useState([]);
  const [selectedBin, setSelectedBin] = useState({});

  const handleBinClick = (bin) => {
    setSelectedBin(bin);
  };

  const queryFoodBinDetails = () => {
    if (!selectedBin || !selectedBin.FoodBinID) return;

    axios
      .get(`${serverUrl}/get_food_bin_details?foodbin-id=${selectedBin.FoodBinID}`)
      .then((response) => {
        const data = response.data[0];
        setTemperature(data.Temperature);
        setHumidity(data.Humidity);
        setLastUpdateTime(data.TimeOfMeasurement);
        setFoodWeight(data.FoodWeight);
        setFoodSpoiled(data.FoodSpoiled);
      })
      .catch((err) => {
        console.error("Failed to query food bin details:", err);
      });
  };

  useEffect(() => {
    axios
      .get(`${serverUrl}/getfoodbins`)
      .then((response) => {
        const bins = response.data;
        setFoodBins(bins);
        if (bins.length > 0) {
          setSelectedBin(bins[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching food bins:", error);
      });
  }, []);

  useEffect(() => {
    if (!selectedBin || !selectedBin.FoodBinID) return;
    queryFoodBinDetails();
  }, [selectedBin]);

  useEffect(() => {
    const interval = setInterval(() => {
      queryFoodBinDetails();
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedBin]); 

  return (
    <>
      <nav className="navbar">
        <h1>Food Bank Dashboard</h1>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Reports</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </nav>
      <div className="dashboard-container">
        <aside className="sidebar">
          <h2>Bin Locations</h2>
          <ul>
            {foodBins.map((bin, index) => (
              <li key={index} onClick={() => handleBinClick(bin)}>
                {bin.Nickname}
              </li>
            ))}
          </ul>
        </aside>
        <main className="dashboard-details">
          <div className="dashboard-card">
            <h2>{selectedBin.Nickname}</h2>
            <h3>{"Last Update : " + lastUpdateTime}</h3>
            <div className="grid">
              <div className="info-section">
                <div className="info-box">
                  <h3>Food Spoiled</h3>
                  <p>{foodSpoiled === "loading" ? foodSpoiled : foodSpoiled.toString()}</p>
                </div>
              </div>
              <div className="info-section">
                <div className="info-box">
                  <h3>Food Weight</h3>
                  <p>{foodWeight === "loading" ? foodWeight : foodWeight + " kg"}</p>
                </div>
              </div>
              <div className="info-section">
                <div className="info-box">
                  <h3>Humidity</h3>
                  <p>{humidity === "loading" ? humidity : humidity + " %"}</p>
                </div>
              </div>
              <div className="info-section">
                <div className="info-box">
                  <h3>Temperature</h3>
                  <p>{temperature === "loading" ? temperature : temperature + " C"}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;

