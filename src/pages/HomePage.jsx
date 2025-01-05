import React, { useState, useEffect } from 'react';
import "../styles/HomePage.css"; 

const HomePage = () => {
  const [newThisWeek, setNewThisWeek] = useState([]);
  const [trendingNow, setTrendingNow] = useState([]);

  // Simulate fetching data from the backend
  useEffect(() => {
    // Example of dynamic data (replace with your backend fetch logic)
    const fetchData = async () => {
      const newWeekData = [
        { id: 1, title: 'The Mother', thumbnail: '/path/to/avatar.jpg' },
        { id: 2, title: 'RRR', thumbnail: '/path/to/rrr.jpg' },
        { id: 3, title: 'Perfection', thumbnail: '/path/to/perfection.jpg' },
        { id: 4, title: 'American Sniper', thumbnail: '/path/to/sniper.jpg' },
        { id: 5, title: 'LIFE', thumbnail: '/path/to/life.jpg' },
      ];

      const trendingData = [
        { id: 1, title: 'Extraction', thumbnail: '../path/to/extraction.jpg' },
        { id: 2, title: 'Bloodlust', thumbnail: '../path/to/bloodlust.jpg' },
        { id: 3, title: 'Batman', thumbnail: '../path/to/batman.jpg' },
        { id: 4, title: 'Pathaan', thumbnail: '/path/to/pathaan.jpg' },
        { id: 5, title: 'Echoes', thumbnail: '/path/to/echoes.jpg' },
      ];

      setNewThisWeek(newWeekData);
      setTrendingNow(trendingData);
    };

    fetchData();
  }, []);

  return (
    <div className="app-container" style={{ backgroundColor: '#240046', color: 'white' }}>
      <div className="sidebar">
        <ul>
          <button className='SearchBtn'> <img></img></button>
          <button className='HomeBtn'></button>
          <button className='MoviesBtn'></button>
          <button className='WebSeriesBtn'></button>
          <button className='NotificationBtn'></button>
        </ul>
      </div>
      <div className="main-content">
        {/* Banner Section */}
        <div className="banner">
          <div className="banner-main">
            <img src="../path/to/american.jpg" alt="Main Banner" />
            <div className="banner-buttons">
              <button>Play</button>
              <button>Watch Trailer</button>
            </div>
          </div>
          <div className="banner-side">
            <img src="/path/to/side-banner.jpg" alt="Side Banner" />
          </div>
        </div>
        {/* Sections */}
        <div className="section">
          <h2>New this week</h2>
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
