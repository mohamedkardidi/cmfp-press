import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './actions/itemActions'; // Correct import

const store = configureStore({
  reducer: {
    items: itemReducer,
  },
});

export default store;
