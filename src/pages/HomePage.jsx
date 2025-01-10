import React, { useState, useEffect } from "react";
import "../styles/HomePage.css"; 
import Sidebar from "../components/SideBar.jsx";

// Import images from the assets folder
import american from "../assets/american.jpg";
import avatar from "../assets/avatar.jpg";
import Batman from "../assets/Batman.png";
import pulpFiction from "../assets/pulp-fiction.jpg";
import spiderMan from "../assets/spiderman.jpg";
import theGood from "../assets/TheGood.jpg";

const HomePage = () => {
  const [mainContent, setMainContent] = useState([]);
  const [newThisWeek, setNewThisWeek] = useState([]);
  const [trendingNow, setTrendingNow] = useState([]);

  // Simulate fetching data from the backend
  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { id: 1, title: "American", thumbnail: american },
        { id: 2, title: "Avatar", thumbnail: avatar },
        { id: 3, title: "Batman", thumbnail: Batman },
        { id: 4, title: "Pulp Fiction", thumbnail: pulpFiction },
        { id: 5, title: "Spider-Man", thumbnail: spiderMan },
      ];

      const trendingData = [
        { id: 1, title: "The Good", thumbnail: theGood },
        { id: 2, title: "Avatar", thumbnail: avatar },
        { id: 3, title: "Batman", thumbnail: Batman },
        { id: 4, title: "Pulp Fiction", thumbnail: pulpFiction },
        { id: 5, title: "Spider-Man", thumbnail: spiderMan },
      ];

      setMainContent(data);
      setNewThisWeek(data);
      setTrendingNow(trendingData);
    };

    fetchData();
  }, []);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="main-content">

        {/* Banner Section */}
        <div className="banner">
        <div className="carousel">
          <div className="banner-main">
       
            {mainContent.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <img src={movie.thumbnail} alt={movie.title} />
        
              </div>
            ))}
          </div>
          </div>
          <div className="banner-buttons"><button>Play</button>
          <button>Watch Trailer</button></div>
            
        </div>

        {/* Sections */}
        <div className="section">
          <h2>New This Week</h2>
          <div className="carousel">
            {newThisWeek.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <img src={movie.thumbnail} alt={movie.title} />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>Trending Now</h2>
          <div className="carousel">
            {trendingNow.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <img src={movie.thumbnail} alt={movie.title} />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
