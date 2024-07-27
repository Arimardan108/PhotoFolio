import React, { useState } from 'react';
import './albumform.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Albumform({ onAlbumCreate }) {
  // State for storing the album name
  const [albumName, setAlbumName] = useState('');

  // Event handler for input change
  const handleInputChange = (e) => {
    setAlbumName(e.target.value);
  };

  // Event handler for creating an album
  const handleCreateAlbum = () => {
    if (albumName.trim() === '') {
      // Show an error toast if the album name is empty
      toast.error('Please enter an album name');
    } else {
      // Call the onAlbumCreate function passed from the parent component
      onAlbumCreate(albumName);
      // Show a success toast after creating the album
      toast.success('Album created successfully');
      // Clear the album name input field
      setAlbumName('');
    }
  };

  // Event handler for clearing the album name input field
  const handleClear = () => {
    setAlbumName('');
  };

  return (
    <>
      <div className="form">
        <h1>Create an album</h1>
        <div className="input">
          <input
            type="text"
            placeholder="Album name"
            value={albumName}
            onChange={handleInputChange}
            autoFocus
          />
          <button className="clear" onClick={handleClear}>
            Clear
          </button>
          <button className="create" onClick={handleCreateAlbum}>
            Create
          </button>
        </div>
      </div>
      <ToastContainer /> {/* Add this component to display toast messages */}
    </>
  );
}
