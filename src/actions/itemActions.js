import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk('items/fetchData', async () => {
  const response = await axios.get('/api/items');
  return response.data; 
});


const itemSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload); 
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload); 
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        state.items[index] = action.payload; 
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true; 
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false; 
        state.items = action.payload; 
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.error.message; 
      });
  },
});

// Export the action creators (synchronous actions)
export const { addItem, deleteItem, updateItem } = itemSlice.actions;

// Export the reducer to be included in the store
export default itemSlice.reducer;
