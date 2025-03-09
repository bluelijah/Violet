import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewCoursePage() {
  const [course, setCourse] = useState('');
  const [depth, setDepth] = useState(5); // Default slider value
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    // Record the data (here we're logging and alerting the values)
    console.log('Course:', course, 'Depth:', depth);
    // alert(`Course: ${course}\nDepth: ${depth}`);
    try {
      const response = await fetch("http://localhost:8000/capture_course_query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course, depth })
      });
      const data = await response.json();
      console.log("Server response:", data);
      setIsLoading(false);
      navigate('/dashboard');
      alert(`Server response: ${data.message}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting course query.");
    }
  };

return (
    <div style={{ 
      padding: '20px',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, #FBECFA, #9C009F)'
    }}>
      <form 
        onSubmit={handleSubmit} 
        style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '10px', 
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' 
        }}
      >
        <div style={{ marginBottom: '15px' }}>
          <label>
            What would you like to learn?
            <br />
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="What would you like to learn?"
              style={{ width: '300px', padding: '8px', marginTop: '5px' }}
              disabled={isLoading}
            />
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Depth: {depth}
            <br />
            <input
              type="range"
              min="1"
              max="10"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              style={{ width: '300px', marginTop: '5px' }}
              disabled={isLoading}
            />
          </label>
        </div>
        <button           
          type="submit" 
          style={{ padding: '8px 16px' }}
          disabled={isLoading}
        >
          {isLoading ? 'Generating course content...' : 'Submit'}
        </button>
        
        {isLoading && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p>Gemini is creating your course content. This may take a moment...</p>
            <div className="loading-spinner" style={{
              display: 'inline-block',
              width: '40px',
              height: '40px',
              border: '4px solid rgba(0, 0, 0, 0.1)',
              borderLeftColor: '#000',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}
      </form>
    </div>
  );

}
export default NewCoursePage;



  