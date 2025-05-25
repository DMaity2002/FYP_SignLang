import React, { useState, useEffect } from 'react';
import './LearningPage.css';

const LearningPage = () => {
  const [activeTab, setActiveTab] = useState('alphabet');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Check online status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  // Alphabet data
  const alphabetSigns = [
    { letter: 'A', description: 'Closed fist with thumb resting on the side' },
    { letter: 'B', description: 'Open palm with fingers together and thumb tucked' },
    { letter: 'C', description: 'Curved hand forming a C shape' },
    { letter: 'D', description: 'Index finger pointing up, other fingers and thumb form a circle' },
    { letter: 'E', description: 'Fingers curled in, thumb tucked under fingers' },
    { letter: 'F', description: 'Index and thumb form a circle, other fingers extended' },
    { letter: 'G', description: 'Index finger and thumb extended in an L shape, pointing sideways' },
    { letter: 'H', description: 'Index and middle fingers extended together, others closed' },
    { letter: 'I', description: 'Pinky finger extended, others closed' },
    { letter: 'J', description: 'Pinky extended and traced in a J shape' },
    { letter: 'K', description: 'Index finger, middle finger and thumb extended upward' },
    { letter: 'L', description: 'Index finger and thumb extended in an L shape' },
    { letter: 'M', description: 'Three fingers folded over the palm' },
    { letter: 'N', description: 'Index and middle fingers folded over the palm' },
    { letter: 'O', description: 'Fingers and thumb form an O shape' },
    { letter: 'P', description: 'Index finger pointing down, thumb and middle finger form a circle' },
    { letter: 'Q', description: 'Index finger and thumb form a downward pointing circle' },
    { letter: 'R', description: 'Index and middle fingers crossed' },
    { letter: 'S', description: 'Closed fist with thumb over fingers' },
    { letter: 'T', description: 'Index finger tucked between middle and thumb' },
    { letter: 'U', description: 'Index and middle fingers extended together upward' },
    { letter: 'V', description: 'Index and middle fingers in a V shape' },
    { letter: 'W', description: 'Index, middle, and ring fingers in a W shape' },
    { letter: 'X', description: 'Index finger bent in a hook shape' },
    { letter: 'Y', description: 'Thumb and pinky extended, other fingers closed' },
    { letter: 'Z', description: 'Index finger traces a Z shape' }
  ];

  // Common phrases data
  const commonPhrases = [
    { phrase: 'Hello', description: 'Open palm near forehead, moved away in an arc' },
    { phrase: 'Thank you', description: 'Flat hand starting at lips, moving forward and down' },
    { phrase: 'Please', description: 'Circular motion with flat hand on chest' },
    { phrase: 'Sorry', description: 'Closed fist circled over heart' },
    { phrase: 'Yes', description: 'Hand shaped like an S, nodding up and down' },
    { phrase: 'No', description: 'Index and middle finger extended, moving side to side' },
    { phrase: 'Help', description: 'Closed fist with thumb up, placed on open palm moving upward' },
    { phrase: 'Understand', description: 'Index finger moving from forehead outward' },
    { phrase: 'Name', description: 'Index and middle fingers of both hands touching' },
    { phrase: 'Learn', description: 'Hand moving from chin outward while opening' }
  ];

  // About ISL content
  const aboutISL = [
    {
      title: 'What is Indian Sign Language?',
      content: 'Indian Sign Language (ISL) is the sign language used by the deaf community in India. It is a visual-spatial language with its own grammar and syntax, distinct from spoken languages in India. ISL is not a direct translation of any spoken Indian language but has evolved naturally within deaf communities.'
    },
    {
      title: 'History of ISL',
      content: 'The formal study of ISL began in the 1970s, although the language has been in use for much longer. The Indian Sign Language Research and Training Center (ISLRTC) was established in 2011 to promote research, training, and teaching of ISL.'
    },
    {
      title: 'Characteristics of ISL',
      content: 'ISL uses hand shapes, movements, facial expressions, and body postures to convey meaning. It has its own grammar that differs from spoken Indian languages. For example, ISL typically follows a Subject-Object-Verb order, unlike the Subject-Verb-Object order common in English.'
    },
    {
      title: 'Regional Variations',
      content: 'Like many sign languages, ISL has regional variations across different parts of India. However, there is enough mutual intelligibility for users from different regions to communicate effectively.'
    },
    {
      title: 'ISL Recognition',
      content: 'In 2017, the Indian government recognized ISL as a language in its own right, which was a significant milestone for the deaf community in India. This recognition has led to increased efforts to promote ISL education and accessibility.'
    }
  ];

  // Interactive quiz questions
  const quizQuestions = [
    {
      question: 'Which hand shape represents the letter A in ISL?',
      options: [
        'Open palm with fingers spread',
        'Closed fist with thumb resting on the side',
        'Index finger pointing up',
        'Thumb and pinky extended'
      ],
      correctAnswer: 1
    },
    {
      question: 'What is the sign for "Thank you" in ISL?',
      options: [
        'Waving hand side to side',
        'Tapping chest twice',
        'Flat hand starting at lips, moving forward and down',
        'Thumbs up gesture'
      ],
      correctAnswer: 2
    },
    {
      question: 'ISL follows which grammatical order?',
      options: [
        'Subject-Verb-Object (SVO)',
        'Subject-Object-Verb (SOV)',
        'Verb-Subject-Object (VSO)',
        'Object-Subject-Verb (OSV)'
      ],
      correctAnswer: 1
    },
    {
      question: 'When was ISL officially recognized by the Indian government?',
      options: [
        '2005',
        '2010',
        '2017',
        '2020'
      ],
      correctAnswer: 2
    },
    {
      question: 'Which organization was established in 2011 for ISL research and training?',
      options: [
        'Indian Sign Language Association (ISLA)',
        'National Institute for the Deaf (NID)',
        'Indian Sign Language Research and Training Center (ISLRTC)',
        'Sign Language Council of India (SLCI)'
      ],
      correctAnswer: 2
    }
  ];

  // State for quiz
  const [quizAnswers, setQuizAnswers] = useState(Array(quizQuestions.length).fill(null));
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Handle quiz answer selection
  const handleAnswerSelect = (questionIndex, optionIndex) => {
    if (quizSubmitted) return;
    
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = optionIndex;
    setQuizAnswers(newAnswers);
  };

  // Submit quiz
  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    // In a real app, we might save results or show detailed feedback
  };

  // Reset quiz
  const resetQuiz = () => {
    setQuizAnswers(Array(quizQuestions.length).fill(null));
    setQuizSubmitted(false);
  };

  // Calculate quiz score
  const calculateScore = () => {
    if (!quizSubmitted) return null;
    
    let correct = 0;
    quizAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correctAnswer) {
        correct++;
      }
    });
    
    return {
      correct,
      total: quizQuestions.length,
      percentage: Math.round((correct / quizQuestions.length) * 100)
    };
  };

  const score = calculateScore();

  return (
    <div className="learning-container">
      <h2>Learn Indian Sign Language</h2>
      
      {isOffline && (
        <div className="offline-indicator">
          <span>⚠️ You are offline. All learning content is available offline.</span>
        </div>
      )}
      
      <div className="learning-tabs">
        <button 
          className={`tab-button ${activeTab === 'alphabet' ? 'active' : ''}`}
          onClick={() => setActiveTab('alphabet')}
          aria-label="Alphabet tab"
        >
          Alphabet
        </button>
        <button 
          className={`tab-button ${activeTab === 'phrases' ? 'active' : ''}`}
          onClick={() => setActiveTab('phrases')}
          aria-label="Common Phrases tab"
        >
          Common Phrases
        </button>
        <button 
          className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
          aria-label="About ISL tab"
        >
          About ISL
        </button>
        <button 
          className={`tab-button ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
          aria-label="Quiz tab"
        >
          Quiz
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'alphabet' && (
          <div className="alphabet-grid">
            <h3>Indian Sign Language Alphabet</h3>
            <p className="tab-description">
              Learn the hand shapes for each letter in the Indian Sign Language alphabet.
              Click on a letter to see more details.
            </p>
            
            <div className="alphabet-cards">
              {alphabetSigns.map((sign) => (
                <div key={sign.letter} className="alphabet-card" tabIndex="0">
                  <div className="letter">{sign.letter}</div>
                  <div className="description">{sign.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'phrases' && (
          <div className="phrases-section">
            <h3>Common Phrases in ISL</h3>
            <p className="tab-description">
              These common phrases are useful for basic communication in Indian Sign Language.
            </p>
            
            <div className="phrases-list">
              {commonPhrases.map((item, index) => (
                <div key={index} className="phrase-item">
                  <h4>{item.phrase}</h4>
                  <p>{item.description}</p>
                  <div className="phrase-placeholder">
                    {/* In a real implementation, this would be an image or animation */}
                    <span className="placeholder-text">{item.phrase}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'about' && (
          <div className="about-section">
            <h3>About Indian Sign Language</h3>
            <p className="tab-description">
              Learn about the history, characteristics, and importance of Indian Sign Language.
            </p>
            
            <div className="about-content">
              {aboutISL.map((section, index) => (
                <div key={index} className="about-item">
                  <h4>{section.title}</h4>
                  <p>{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'quiz' && (
          <div className="quiz-section">
            <h3>Test Your Knowledge</h3>
            <p className="tab-description">
              Take this quiz to test your understanding of Indian Sign Language.
            </p>
            
            {quizSubmitted && score && (
              <div className={`quiz-results ${score.percentage >= 70 ? 'good-score' : 'needs-improvement'}`}>
                <h4>Your Score: {score.correct}/{score.total} ({score.percentage}%)</h4>
                <p>
                  {score.percentage >= 70 
                    ? 'Great job! You have a good understanding of ISL.' 
                    : 'Keep learning! Review the material and try again.'}
                </p>
                <button 
                  className="reset-quiz-button"
                  onClick={resetQuiz}
                  aria-label="Reset quiz"
                >
                  Try Again
                </button>
              </div>
            )}
            
            <div className="quiz-questions">
              {quizQuestions.map((q, qIndex) => (
                <div key={qIndex} className="quiz-question">
                  <h4>Question {qIndex + 1}: {q.question}</h4>
                  <div className="quiz-options">
                    {q.options.map((option, oIndex) => (
                      <div 
                        key={oIndex} 
                        className={`quiz-option ${quizAnswers[qIndex] === oIndex ? 'selected' : ''} ${
                          quizSubmitted 
                            ? oIndex === q.correctAnswer 
                              ? 'correct' 
                              : quizAnswers[qIndex] === oIndex 
                                ? 'incorrect' 
                                : ''
                            : ''
                        }`}
                        onClick={() => handleAnswerSelect(qIndex, oIndex)}
                      >
                        <span className="option-letter">{String.fromCharCode(65 + oIndex)}</span>
                        <span className="option-text">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {!quizSubmitted && (
                <button 
                  className="submit-quiz-button"
                  onClick={handleQuizSubmit}
                  disabled={quizAnswers.includes(null)}
                  aria-label="Submit quiz"
                >
                  Submit Answers
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPage;
