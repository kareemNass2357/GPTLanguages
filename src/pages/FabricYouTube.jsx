import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FabricYouTube = () => {
  const [inputValue, setInputValue] = useState('');
  const [isYouTube, setIsYouTube] = useState(true);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [serverAlive, setServerAlive] = useState(false);
  const hostname = 'localhost';
  const port = 5006;
  const apiUrl = `http://${hostname}:${port}/extract_wisdom`;

  useEffect(() => {
    const checkServerAlive = async () => {
      try {
        const res = await axios.get(`http://${hostname}:${port}/alive`);
        setServerAlive(res.status === 200);
      } catch (error) {
        setServerAlive(false);
      }
    };
    checkServerAlive();
  }, [hostname, port]);

  const handleSubmit = async () => {
    setLoading(true);
    setResponse(null);
    try {
      let body = {};
      if (isYouTube) {
        let url = inputValue;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          url = 'https://' + url;
        }
        body = { url };
      } else {
        body = { input_text: inputValue };
      }
      console.log('Sending request to:', apiUrl, 'with body:', body);
      const res = await axios.post(apiUrl, body);
      console.log('Response received:', res.data);
      setResponse(res.data);
      alert('Submitted successfully: ' + res.data);
    } catch (error) {
      console.error('Error submitting:', error.message);
      alert('Error submitting: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleInputType = () => {
    setIsYouTube(!isYouTube);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Fabric YouTube</h1>
      <div className="flex items-center mb-4">
        <span className="mr-2">Input</span>
        <label className="switch">
          <input type="checkbox" checked={isYouTube} onChange={toggleInputType} />
          <span className="slider round"></span>
        </label>
        <span className="ml-2">YouTube</span>
      </div>
      {serverAlive ? (
        <>
          {isYouTube ? (
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter YouTube URL"
              className="p-2 border border-gray-300 rounded mr-2 w-full"
            />
          ) : (
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter Input"
              className="p-2 border border-gray-300 rounded mr-2 w-full h-64"
            />
          )}
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
          {response && (
            <div className="mt-4 p-4 border border-gray-300 rounded">
              <h2 className="text-xl font-bold mb-2">Response:</h2>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
        </>
      ) : (
        <div className="text-red-500">Server is not alive</div>
      )}
      <style jsx>{`
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
          transition: .4s;
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
          transition: .4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #2196F3;
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }
      `}</style>
    </div>
  );
};

export default FabricYouTube;