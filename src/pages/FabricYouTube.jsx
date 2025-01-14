import React, { useState, useEffect } from 'react';

const FabricYouTube = () => {
  // State for text or YouTube input
  const [inputValue, setInputValue] = useState('');
  // Toggle between multiline input or YouTube
  const [isYouTube, setIsYouTube] = useState(false);

  // Toggle between Summarize or Extract Wisdom
  const [actionType, setActionType] = useState('summarize');

  // For loading UI
  const [loading, setLoading] = useState(false);
  // Store response
  const [response, setResponse] = useState(null);
  // Server alive check
  const [serverAlive, setServerAlive] = useState(false);

  // Adjust these to match your back-end
  const hostname = 'localhost';
  const port = 5052;

  // Check if backend is alive
  useEffect(() => {
    const checkServerAlive = async () => {
      const url = `http://${hostname}:${port}/health`;
      console.log('Checking server health at:', url);
      try {
        const res = await fetch(url);
        setServerAlive(res.status === 200);
      } catch (error) {
        console.error('Error checking server health:', error.message);
        setServerAlive(false);
      }
    };
    checkServerAlive();
  }, []);

  // Toggle input type: multiline vs YouTube
  const toggleInputType = () => {
    setIsYouTube((prev) => !prev);
  };

  // Toggle action: summarize vs wisdom
  const toggleActionType = () => {
    setActionType((prev) => (prev === 'summarize' ? 'wisdom' : 'summarize'));
  };

  // Determine which endpoint to call based on toggles
  const getEndpointAndBody = () => {
    if (isYouTube) {
      // For YouTube
      if (actionType === 'summarize') {
        return {
          endpoint: `http://${hostname}:${port}/summarize_youtube`,
          body: { youtube_url: inputValue },
        };
      } else {
        return {
          endpoint: `http://${hostname}:${port}/extract_wisdom_youtube`,
          body: { youtube_url: inputValue },
        };
      }
    } else {
      // For text input
      if (actionType === 'summarize') {
        return {
          endpoint: `http://${hostname}:${port}/summarize`,
          body: { text_input: inputValue },
        };
      } else {
        return {
          endpoint: `http://${hostname}:${port}/extract_wisdom`,
          body: { text_input: inputValue },
        };
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResponse(null);

    try {
      const { endpoint, body } = getEndpointAndBody();
      console.log('Sending request to:', endpoint, 'with body:', body);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log('Response received:', data);

      setResponse(data);
      alert('Submitted successfully');
    } catch (error) {
      console.error('Error submitting:', error.message);
      alert('Error submitting: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      const url = `http://${hostname}:${port}/reset`;
      console.log('Sending reset request to:', url);
      await fetch(url, { method: 'POST' });
      alert('Server reset successfully');
    } catch (error) {
      console.error('Error resetting server:', error.message);
      alert('Error resetting server: ' + error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Fabric App</h1>
      
      {/* 1. TOGGLE INPUT TYPE (Multiline vs YouTube) */}
      <div className="flex items-center mb-4">
        <span className="mr-2">Text</span>
        <label className="switch">
          <input type="checkbox" checked={isYouTube} onChange={toggleInputType} />
          <span className="slider round"></span>
        </label>
        <span className="ml-2">YouTube</span>
      </div>
      
      {/* 2. TOGGLE ACTION (Summarize vs Extract Wisdom) */}
      <div className="flex items-center mb-4">
        <span className="mr-2">Summarize</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={actionType === 'wisdom'}
            onChange={toggleActionType}
          />
          <span className="slider round"></span>
        </label>
        <span className="ml-2">Wisdom</span>
      </div>

      {/* 3. INPUT FIELD (Either Multiline or Single-line YouTube) */}
      {isYouTube ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter YouTube URL"
          className="p-2 border border-gray-300 rounded mr-2 w-full block"
          style={{ color: 'black' }}
        />
      ) : (
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your text here"
          className="p-2 border border-gray-300 rounded mr-2 w-full h-64 block"
          style={{ color: 'black' }}
        />
      )}

      {/* 4. SUBMIT BUTTON */}
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Submit'}
      </button>

      {/* 4.5 RESET BUTTON */}
      <button
        onClick={handleReset}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mt-2"
      >
        Reset Server
      </button>

      {/* 5. RENDER RESPONSE */}
      {response && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <h2 className="text-xl font-bold mb-2">Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {/* 6. SERVER HEALTH STATUS */}
      <div className={`mt-4 ${serverAlive ? 'text-green-500' : 'text-red-500'}`}>
        Server is {serverAlive ? 'alive' : 'not alive'}
      </div>

      {/* 7. STYLING FOR SWITCHES */}
      <style>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
          border-radius: 34px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #2196F3;
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }

        .p-4 {
          color: white;
        }
      `}</style>
    </div>
  );
};

export default FabricYouTube;
