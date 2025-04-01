// import React from "react";
// import "../styles/dash.css";

// const Dashboard = () => {
//   const data = {
//     FoodSpoiled: 100,
//     FoodWeight: 100,
//     Humidity: 110,
//     Temperature: 200,
//   };

//   return (
//     <div className="grid">
//       {Object.entries(data).map(([key, value]) => (
//         <div key={key} className="grid-item">
//           <h2>{key}</h2>
//           <p>{value}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Dashboard;

// import React from "react";
// import "../styles/dash.css";

// const Dashboard = () => {
//   const data = {
//     FoodSpoiled: 100,
//     FoodWeight: 100,
//     Humidity: 110,
//     Temperature: 200,
//   };

//   return (
//     <>
//       <nav className="navbar">
//         <h1>Food Bank Dashboard</h1>
//         <ul>
//           <li>
//             <a href="#">Home</a>
//           </li>
//           <li>
//             <a href="#">Reports</a>
//           </li>
//           <li>
//             <a href="#">Settings</a>
//           </li>
//         </ul>
//       </nav>
//       <div className="grid">
//         {Object.entries(data).map(([key, value]) => (
//           <div key={key} className="grid-item">
//             <h2>{key}</h2>
//             <p>{value}</p>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Dashboard;

/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/
// import React from "react";
// import "../styles/Dash.css";

// const Dashboard = () => {
//   const data = {
//     FoodSpoiled: 100,
//     FoodWeight: 100,
//     Humidity: 110,
//     Temperature: 200,
//   };

//   const binLocations = [
//     "Bin 1 - Samayapuram",
//     "Bin 2 - No. 1 tollgate ",
//     "Bin 3 - Irungaluru",
//   ];

//   return (
//     <>
//       <nav className="navbar">
//         <h1>Food Bank Dashboard</h1>
//         <ul>
//           <li>
//             <a href="#">Home</a>
//           </li>
//           <li>
//             <a href="#">Reports</a>
//           </li>
//           <li>
//             <a href="#">Settings</a>
//           </li>
//         </ul>
//       </nav>
//       <div className="dashboard-container">
//         <aside className="sidebar">
//           <h2>Bin Locations</h2>
//           <ul>
//             {binLocations.map((bin, index) => (
//               <li key={index}>{bin}</li>
//             ))}
//           </ul>
//         </aside>
//         <main className="grid">
//           {Object.entries(data).map(([key, value]) => (
//             <div key={key} className="grid-item">
//               <h2>{key}</h2>
//               <p>{value}</p>
//             </div>
//           ))}
//         </main>
//       </div>
//     </>
//   );
// };

// export default Dashboard;
// import React, { useState } from "react";
// import "../styles/Dash.css";

// const Dashboard = () => {
//   const bins = [
//     {
//       location: "Downtown",
//       foodSpoiled: 50,
//       foodWeight: 200,
//       humidity: 80,
//       temperature: 150,
//     },
//     {
//       location: "City Center",
//       foodSpoiled: 30,
//       foodWeight: 180,
//       humidity: 75,
//       temperature: 140,
//     },
//     {
//       location: "Suburb Area",
//       foodSpoiled: 40,
//       foodWeight: 190,
//       humidity: 85,
//       temperature: 145,
//     },
//     {
//       location: "Industrial Zone",
//       foodSpoiled: 20,
//       foodWeight: 220,
//       humidity: 70,
//       temperature: 135,
//     },
//     {
//       location: "Residential District",
//       foodSpoiled: 60,
//       foodWeight: 210,
//       humidity: 90,
//       temperature: 155,
//     },
//   ];

//   const [selectedBin, setSelectedBin] = useState(bins[0]);

//   const handleBinClick = (bin) => {
//     setSelectedBin(bin);
//   };

//   return (
//     <>
//       <nav className="navbar">
//         <h1>Food Bank Dashboard</h1>
//         <ul>
//           <li>
//             <a href="#">Home</a>
//           </li>
//           <li>
//             <a href="#">Reports</a>
//           </li>
//           <li>
//             <a href="#">Settings</a>
//           </li>
//         </ul>
//       </nav>
//       <div className="dashboard-container">
//         <main className="dashboard-details">
//           <div className="grid-item">
//             <h2>{selectedBin.location}</h2>
//             <p>Food Spoiled: {selectedBin.foodSpoiled} kg</p>
//             <p>Food Weight: {selectedBin.foodWeight} kg</p>
//             <p>Humidity: {selectedBin.humidity}%</p>
//             <p>Temperature: {selectedBin.temperature}°C</p>
//           </div>
//         </main>
//         <aside className="sidebar">
//           <h2>Bin Locations</h2>
//           <ul>
//             {bins.map((bin, index) => (
//               <li key={index} onClick={() => handleBinClick(bin)}>
//                 {bin.location}
//               </li>
//             ))}
//           </ul>
//         </aside>
//       </div>
//     </>
//   );
// };

// export default Dashboard;

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

// import React, { useState } from "react";
// import "../styles/Dash.css";

// const Dashboard = () => {
//   const bins = [
//     {
//       location: "Downtown",
//       foodSpoiled: 50,
//       foodWeight: 200,
//       humidity: 80,
//       temperature: 150,
//     },
//     {
//       location: "City Center",
//       foodSpoiled: 30,
//       foodWeight: 180,
//       humidity: 75,
//       temperature: 140,
//     },
//     {
//       location: "Suburb Area",
//       foodSpoiled: 40,
//       foodWeight: 190,
//       humidity: 85,
//       temperature: 145,
//     },
//     {
//       location: "Industrial Zone",
//       foodSpoiled: 20,
//       foodWeight: 220,
//       humidity: 70,
//       temperature: 135,
//     },
//     {
//       location: "Residential District",
//       foodSpoiled: 60,
//       foodWeight: 210,
//       humidity: 90,
//       temperature: 155,
//     },
//   ];

//   const [selectedBin, setSelectedBin] = useState(bins[0]);

//   const handleBinClick = (bin) => {
//     setSelectedBin(bin);
//   };

//   return (
//     <>
//       <nav className="navbar">
//         <h1>Food Bank Dashboard</h1>
//         <ul>
//           <li>
//             <a href="#">Home</a>
//           </li>
//           <li>
//             <a href="#">Reports</a>
//           </li>
//           <li>
//             <a href="#">Settings</a>
//           </li>
//         </ul>
//       </nav>
//       <div className="dashboard-container">
//         <aside className="sidebar">
//           <h2>Bin Locations</h2>
//           <ul>
//             {bins.map((bin, index) => (
//               <li key={index} onClick={() => handleBinClick(bin)}>
//                 {bin.location}
//               </li>
//             ))}
//           </ul>
//         </aside>
//         <main className="dashboard-details">
//           <div className="grid-item">
//             <h2>{selectedBin.location}</h2>
//             <p>Food Spoiled: {selectedBin.foodSpoiled} kg</p>
//             <p>Food Weight: {selectedBin.foodWeight} kg</p>
//             <p>Humidity: {selectedBin.humidity}%</p>
//             <p>Temperature: {selectedBin.temperature}°C</p>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default Dashboard;

import React, { useState } from "react";
import "../styles/Dash.css";

const Dashboard = () => {
  const bins = [
    {
      location: "Samayapuram",
      foodSpoiled: 50,
      foodWeight: 200,
      humidity: 80,
      temperature: 150,
    },
    {
      location: "No.1 Tollgate",
      foodSpoiled: 30,
      foodWeight: 180,
      humidity: 75,
      temperature: 140,
    },
    {
      location: "Irungaluru",
      foodSpoiled: 40,
      foodWeight: 190,
      humidity: 85,
      temperature: 145,
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
            <div className="grid">
              <div className="info-section">
                <div className="info-box">
                  <h3>Food Spoiled</h3>
                  <p>{selectedBin.foodSpoiled} kg</p>
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
                  <p>{selectedBin.humidity}%</p>
                </div>
              </div>
              <div className="info-section">
                <div className="info-box">
                  <h3>Temperature</h3>
                  <p>{selectedBin.temperature}°C</p>
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
