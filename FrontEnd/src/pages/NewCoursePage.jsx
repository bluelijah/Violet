import React, { useState } from 'react';

function NewCoursePage() {
  const [course, setCourse] = useState('');
  const [depth, setDepth] = useState(5); // Default slider value

  const handleSubmit = (e) => {
    e.preventDefault();
    // Record the data (here we're logging and alerting the values)
    console.log('Course:', course, 'Depth:', depth);
    alert(`Course: ${course}\nDepth: ${depth}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
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
            />
          </label>
        </div>
        <button type="submit" style={{ padding: '8px 16px' }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewCoursePage;
