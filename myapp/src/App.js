import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  
  const [language, setLanguage] = useState('en');
  
  const [translations, setTranslations] = useState({});

  
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/${language}.json`);
        if (!response.ok) {
          throw new Error(`Response failed: ${response.status}`);
        }
        const translations = await response.json();
        setTranslations(translations);
        console.log("Translations loaded:", translations);
      } catch (error) {
        console.error("Error loading the translation file:", error);
      }
    };

    loadTranslations();
  }, [language]);

  
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    console.log("Language changed to:", event.target.value); 
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* Displaying text based on the current translations */}
        <p>
          {translations['header_subtitle'] || 'Find, register, and manage your courses.'}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {translations['button_my_cart'] || 'My Cart'}

        </a>
        {/* Language selection dropdown */}
        <select value={language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="fr">French</option>
          {/* Add other languages as needed */}
        </select>
      </header>
    </div>
  );
}

export default App;

