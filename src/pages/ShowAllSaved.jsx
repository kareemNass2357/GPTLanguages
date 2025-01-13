import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowAllSaved = () => {
  const [savedEntries, setSavedEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [filteredEntries, setFilteredEntries] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    console.log('Username entered:', username);
    try {
      console.log('Sending request to:', `${import.meta.env.VITE_DB_SERVER_URL}/savedData`);
      const response = await axios.get(`${import.meta.env.VITE_DB_SERVER_URL}/savedData`);
      console.log('Response received:', response);
      const entries = response.data.filter(entry => entry.username && entry.username.toLowerCase() === username.toLowerCase());
      console.log('Filtered entries:', entries);
      setSavedEntries(entries);
      setFilteredEntries(entries);
    } catch (error) {
      console.error('Error fetching saved entries:', error);
      setError('Error fetching saved entries. Please try again.');
    } finally {
      setLoading(false);
      console.log('Loading state set to false');
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Saved Entries</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && filteredEntries.length > 0 && (
        <ul className="list-disc pl-5">
          {filteredEntries.map((entry, index) => (
            <li key={index} className="mb-2">
              <h2 className="text-lg font-semibold">{entry.title}</h2>
              <p>{entry.paragraph}</p>
              <p className="text-sm text-gray-500">{formatDate(entry.timestamp)}</p>
              <p className="text-sm text-gray-500">Username: {entry.username}</p>
            </li>
          ))}
        </ul>
      )}
      {!loading && !error && filteredEntries.length === 0 && (
        <p>No entries found for the username: {username}</p>
      )}
    </div>
  );
};

export default ShowAllSaved;
