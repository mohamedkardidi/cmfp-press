import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './actions/itemActions';

const store = configureStore({
  reducer: {
    items: itemReducer,
  },
});

export default store;
