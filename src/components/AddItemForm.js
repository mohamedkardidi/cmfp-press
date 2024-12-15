import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addItem } from '../actions/itemActions';
import './AddItemForm.css';

const AddItemForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form with data:', { title, description, image, author, date });
    const newItem = {
      id: Date.now(),
      title,
      content: description,
      urlToImage: image,
      author,
      publishedAt: date
    };
    axios.post('http://localhost:3002/local-news', newItem)
      .then(response => {
        console.log('Item added:', response.data);
        dispatch(addItem(newItem));
      })
      .catch(error => {
        console.error('Error adding item:', error);
      });
    setTitle('');
    setDescription('');
    setImage('');
    setAuthor('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Image URL</label>
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Author</label>
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn-submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
