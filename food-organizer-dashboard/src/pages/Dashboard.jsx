import React, { useEffect, useState } from "react";
import "../styles/dash.css";
import { supabase } from "../supabaseClient";

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [temperature, setTemperature] = useState(32);
  const [humidity, setHumidity] = useState(42);
  const [lastUpdateTime, setLastUpdateTime] = useState("1/4/2025, 08:21:58 PM");

  useEffect(() => {
    const channel = supabase
      .channel("food-bin-watch")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "FoodBinReadings" },
        (payload) => {
          console.log(payload);
          setLastUpdateTime((prev) => {
            return new Date(payload["commit_timestamp"]).toLocaleString(
              "en-IN",
              { timeZone: "Asia/Kolkata" }
            );
          });
          setHumidity((prev) => {
            return payload["new"]["Humidity"];
          });
          setTemperature((prev) => {
            return payload["new"]["Temperature"];
          });
          setMessages((prev) => {
            return payload["new"];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const bins = [
    {
      location: "Samayapuram",
      foodSpoiled: false,
      foodWeight: 1.5,
      humidity: 80,
      temperature: 150,
    },
    {
      location: "No.1 Tollgate",
      foodSpoiled: false,
      foodWeight: 0.5,
      humidity: 40,
      temperature: 30,
    },
    {
      location: "Irungalur",
      foodSpoiled: false,
      foodWeight: 1.1,
      humidity: 60,
      temperature: 50,
    },
    // {
    //   location: "Industrial Zone",
    //   foodSpoiled: 20,
    //   foodWeight: 220,
    //   humidity: 70,
    //   temperature: 135,
    // },
    // {
    //   location: "Residential District",
    //   foodSpoiled: 60,
    //   foodWeight: 210,
    //   humidity: 90,
    //   temperature: 155,
    // },
  ];

  const [selectedBin, setSelectedBin] = useState(bins[0]);

  const handleBinClick = (bin) => {
    setSelectedBin(bin);
  };

  return (
    <>
      <nav className="navbar">
        <h1>Food Bank Dashboard</h1>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Reports</a>
          </li>
          <li>
            <a href="#">Settings</a>
          </li>
        </ul>
      </nav>
      <div className="dashboard-container">
        <aside className="sidebar">
          <h2>Bin Locations</h2>
          <ul>
            {bins.map((bin, index) => (
              <li key={index} onClick={() => handleBinClick(bin)}>
                {bin.location}
              </li>
            ))}
          </ul>
        </aside>
        <main className="dashboard-details">
          <div className="dashboard-card">
            <h2>{selectedBin.location}</h2>
            <h3>{"Last Update : " + lastUpdateTime}</h3>
            <div className="grid">
              <div className="info-section">
                <div className="info-box">
                  <h3>Food Spoiled</h3>
                  <p>{selectedBin.foodSpoiled.toString()}</p>
                </div>
              </div>
              <div className="info-section">
                <div className="info-box">
                  <h3>Food Weight</h3>
                  <p>{selectedBin.foodWeight} kg</p>
                </div>
              </div>
              <div className="info-section">
                <div className="info-box">
                  <h3>Humidity</h3>
                  <p>{humidity}%</p>
                </div>
              </div>
              <div className="info-section">
                <div className="info-box">
                  <h3>Temperature</h3>
                  <p>{temperature}°C</p>
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
