import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const itemSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setItems, setLoading, setError } = itemSlice.actions;

export const fetchItems = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get('http://localhost:3002/local-news');
    dispatch(setItems(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addItem = (item) => async (dispatch) => {
  console.log('Adding item:', item);
  try {
    const response = await axios.post('http://localhost:3002/local-news', item);
    console.log('Post response:', response.data);
    dispatch(fetchItems());
  } catch (error) {
    console.error('Error adding item:', error);
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateItem = (id, updatedItem) => async (dispatch) => {
  try {
    await axios.put(`/api/items/${id}`, updatedItem);
    dispatch(fetchItems());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const deleteItem = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/items/${id}`);
    dispatch(fetchItems());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default itemSlice.reducer;
