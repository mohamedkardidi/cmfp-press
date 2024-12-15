import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the asyncThunk to fetch items from the API
export const fetchData = createAsyncThunk('items/fetchData', async () => {
  const response = await axios.get('/api/items');
  return response.data; // Fetched items
});

// Define the slice to manage items
const itemSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload); // Adds new item to the list
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload); // Deletes item by ID
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        state.items[index] = action.payload; // Updates the existing item
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true; // Loading state
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false; // Reset loading state
        state.items = action.payload; // Store fetched items
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false; // Reset loading state on failure
        state.error = action.error.message; // Store error message
      });
  },
});

// Export the action creators (synchronous actions)
export const { addItem, deleteItem, updateItem } = itemSlice.actions;

// Export the reducer to be included in the store
export default itemSlice.reducer;
