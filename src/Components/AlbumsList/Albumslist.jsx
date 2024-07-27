import React, { useState, useEffect } from 'react';
import './Albumslist.css';
import Albumform from '../AlbumForm/Albumform';
import { db } from '../../firebaseinit';
import Imageslist from "../ImagesList/Imageslist"
import {
  collection,
  addDoc,
  getDocs,
 
} from 'firebase/firestore';


export default function Albumslist() {
  const [showForm, setShowForm] = useState(false);
  const [ setAlbumName] = useState('');
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  // Fetch albums from the Firestore database
  const fetchAlbums = async () => {
    const querySnapshot = await getDocs(collection(db, 'albums'));
    const albumsData = [];
    querySnapshot.forEach((doc) => {
      albumsData.push({ id: doc.id, name: doc.data().name });
    });
    setAlbums(albumsData);
  };

  // Toggle the visibility of the album creation form
  const handleAddAlbum = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  // Create a new album in the Firestore database
  const handleAlbumCreate = async (name) => {
    try {
     await addDoc(collection(db, 'albums'), {
        name: name,
      });
      setAlbumName(name);
      fetchAlbums(); // Fetch albums again to update the UI
    } catch (error) {
      console.error('Error creating album:', error);
    }
  };

  // Handle the click event when an album is clicked
  const handleAlbumClick = (albumId) => {
    setSelectedAlbumId(albumId);
    setShowForm(false); // Hide the form when clicking on an album
  };

  // Handle the click event when the back button is clicked
  const handleBackClick = () => {
    setSelectedAlbumId(null);
  };

  return (
    <>
      {showForm && <Albumform onAlbumCreate={handleAlbumCreate} />}
      {!selectedAlbumId && (
        <div className="albumslistmain">
          <h2 className="text">Your Albums</h2>
          <button className="addbtn" onClick={handleAddAlbum}>
            {showForm ? 'Cancel' : 'Add Album'}
          </button>
        </div>
      )}

      {!selectedAlbumId && albums.length > 0 && (
        <div className="grid">
          {albums.map((album) => (
            <div
              className="container"
              key={album.id}
              onClick={() => handleAlbumClick(album.id)}
            >
              <img src="https://cdn-icons-png.flaticon.com/128/2659/2659360.png" alt="album" />
              <span>{album.name}</span>
            </div>
          ))}
        </div>
      )}

      {selectedAlbumId && (
        <Imageslist albumId={selectedAlbumId} onBackClick={handleBackClick} />
      )}
    </>
  );
}
