import React, { useState } from 'react';
import './App.css';
import SignToTextPage from './components/SignToText/SignToTextPage';
import TextToSignPage from './components/TextToSign/TextToSignPage';
import LearningPage from './components/Learning/LearningPage';

function App() {
  const [currentPage, setCurrentPage] = useState('signToText');

  const renderPage = () => {
    switch (currentPage) {
      case 'signToText':
        return <SignToTextPage />;
      case 'textToSign':
        return <TextToSignPage />;
      case 'learning':
        return <LearningPage />;
      default:
        return <SignToTextPage />;
    }
  };

  return (
    <div className="app">
      <nav className="app-nav">
        <div className="app-logo">Indian Sign Language Translator</div>
        <ul className="nav-links">
          <li>
            <button 
              className={currentPage === 'signToText' ? 'active' : ''} 
              onClick={() => setCurrentPage('signToText')}
              aria-current={currentPage === 'signToText' ? 'page' : undefined}
            >
              Sign to Text
            </button>
          </li>
          <li>
            <button 
              className={currentPage === 'textToSign' ? 'active' : ''} 
              onClick={() => setCurrentPage('textToSign')}
              aria-current={currentPage === 'textToSign' ? 'page' : undefined}
            >
              Text to Sign
            </button>
          </li>
          <li>
            <button 
              className={currentPage === 'learning' ? 'active' : ''} 
              onClick={() => setCurrentPage('learning')}
              aria-current={currentPage === 'learning' ? 'page' : undefined}
            >
              Learning
            </button>
          </li>
        </ul>
      </nav>
      
      <main className="app-content">
        {renderPage()}
      </main>
      
      <footer className="app-footer">
        <p>Indian Sign Language Translator &copy; 2025</p>
        <div className="accessibility-controls">
          <button className="font-size-toggle" aria-label="Increase font size">A+</button>
          <button className="font-size-toggle" aria-label="Decrease font size">A-</button>
          <button className="contrast-toggle" aria-label="Toggle high contrast mode">
            High Contrast
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
