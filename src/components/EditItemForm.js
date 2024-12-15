import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateItem } from '../actions/itemActions'; // Correct import
import { useNavigate, useParams } from 'react-router-dom';

const EditItemForm = () => {
  const { id } = useParams();
  const item = useSelector((state) =>
    state.items.items.find((item) => item.id === parseInt(id))
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState(item?.title || '');
  const [description, setDescription] = useState(item?.description || '');
  const [image, setImage] = useState(item?.image || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedItem = { id: parseInt(id), title, description, image };
    dispatch(updateItem(updatedItem)); // Dispatch update action
    navigate('/'); // Use navigate instead of history.push
  };

  useEffect(() => {
    if (!item) {
      navigate('/'); // Use navigate instead of history.push
    }
  }, [item, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit">Update Item</button>
    </form>
  );
};

export default EditItemForm;
