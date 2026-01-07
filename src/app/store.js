import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import destinationsReducer from '../features/destinations/destinationsSlice';
import packagesReducer from '../features/packages/packagesSlice';
import bookingsReducer from '../features/bookings/bookingsSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    destinations: destinationsReducer,
    packages: packagesReducer,
    bookings: bookingsReducer,
    ui: uiReducer,
  },
});

export default store;
