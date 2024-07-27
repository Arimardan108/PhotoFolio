import React, { useEffect, useState } from 'react';
import './Imageslist.css';
import { db } from '../../firebaseinit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  onSnapshot,
  deleteDoc,
  } from 'firebase/firestore';

export default function Imageslist({ albumId, onBackClick }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState([]);
  const [editImageId, setEditImageId] = useState(null);

  const handleToggleForm = () => {
    setShowForm(!showForm);
    setEditImageId(null); // Reset editImageId when toggling the form
  };

  const handleAddImage = async () => {
    try {
      if (editImageId) {
        // If editImageId is not null, update the existing image
        await setDoc(doc(db, 'images', editImageId), {
          albumId,
          title,
          imageUrl,
        });
        toast.success('Image updated successfully!');
      } else {
        // Otherwise, add a new image
        await addDoc(collection(db, 'images'), {
          albumId,
          title,
          imageUrl,
        });
        toast.success('Image added successfully!');
      }
      setTitle('');
      setImageUrl('');
      setEditImageId(null); // Reset editImageId after successful add/update
    } catch (error) {
      console.error('Error adding/updating image to Firebase: ', error);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await deleteDoc(doc(db, 'images', imageId));
      toast.success('Image Delete successfully!');
    } catch (error) {
      console.error('Error deleting image from Firebase: ', error);
    }
  };

  const handleEditImage = (image) => {
    setTitle(image.title);
    setImageUrl(image.imageUrl);
    setEditImageId(image.id);
    setShowForm(true);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'images'), (querySnapshot) => {
      const imagesData = querySnapshot.docs
        .filter((doc) => doc.data().albumId === albumId)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      setImages(imagesData);
    });

    return () => {
      unsubscribe();
    };
  }, [albumId]);

  return (
    <>
      <div className="imageslistmain">
        {showForm && (
          <div className="imageslistform">
            <h1>{editImageId ? 'Edit Image' : 'Add Image to Album'}</h1>
            <input
              type="text"
              placeholder="Title"
              className="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <input
              type="text"
              className="imgurl"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <div className="imageslistbtn">
              <button
                className="clear"
                onClick={() => {
                  setTitle('');
                  setImageUrl('');
                  setEditImageId(null);
                }}
              >
                Clear
              </button>
              <button className="add" onClick={handleAddImage}>
                {editImageId ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        )}

        <div className="top">
          <img
            src="https://cdn-icons-png.flaticon.com/128/2099/2099238.png"
            alt="back"
            className="back"
            onClick={onBackClick} // Invoke the onBackClick callback
          />
          <h1>{images.length === 0 ? `No images in Album ` : `Images in Album`}</h1>
          <button className="addingimg" onClick={handleToggleForm}>
            {showForm ? 'Cancel' : 'Add Image'}
          </button>
        </div>

        <div className="showimg">
          {images.map((image, index) => (
            <div className="bottom">
            <div key={image.id} className="card">
              <div className="hover">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1828/1828911.png"
                  alt="edit"
                  className="edit"
                  onClick={() => handleEditImage(image)}
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png"
                  alt="delete"
                  className="delete"
                  onClick={() => handleDeleteImage(image.id)}
                />
              </div>
              <img src={image.imageUrl} alt="" className="bottomimg" />
              <h1>{image.title}</h1>
            </div>
            </div>
          ))}
          </div>
        
      </div>
      <ToastContainer /> {/* Include ToastContainer to display toast messages */}
    </>
  );
}
