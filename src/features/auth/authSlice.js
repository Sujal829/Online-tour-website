import { createSlice } from '@reduxjs/toolkit';

const loadAuthFromStorage = () => {
  try {
    const saved = localStorage.getItem('auth');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading auth from storage:', e);
  }
  return null;
};

const savedAuth = loadAuthFromStorage();

const initialState = {
  user: savedAuth?.user || null,
  role: savedAuth?.role || 'user',
  isAuthenticated: savedAuth?.isAuthenticated || false,
  rememberMe: savedAuth?.rememberMe || false,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      state.rememberMe = action.payload.rememberMe;
      if (action.payload.rememberMe) {
        localStorage.setItem('auth', JSON.stringify({
          user: action.payload.user,
          role: action.payload.role,
          isAuthenticated: true,
          rememberMe: true,
        }));
      } else {
        sessionStorage.setItem('auth', JSON.stringify({
          user: action.payload.user,
          role: action.payload.role,
          isAuthenticated: true,
        }));
      }
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.role = 'user';
      state.isAuthenticated = false;
      state.rememberMe = false;
      state.error = null;
      localStorage.removeItem('auth');
      sessionStorage.removeItem('auth');
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      if (state.rememberMe) {
        localStorage.setItem('auth', JSON.stringify({
          user: state.user,
          role: state.role,
          isAuthenticated: true,
          rememberMe: true,
        }));
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerSuccess,
  updateProfile,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
