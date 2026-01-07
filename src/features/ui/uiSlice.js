import { createSlice } from '@reduxjs/toolkit';

const loadThemeFromStorage = () => {
  try {
    return localStorage.getItem('theme') || 'light';
  } catch (e) {
    return 'light';
  }
};

const initialState = {
  loading: false,
  theme: loadThemeFromStorage(),
  currency: 'USD',
  language: 'en',
  sidebarOpen: false,
  mobileMenuOpen: false,
  modalOpen: null,
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
      if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
      if (action.payload === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
    openModal: (state, action) => {
      state.modalOpen = action.payload;
    },
    closeModal: (state) => {
      state.modalOpen = null;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  toggleTheme,
  setTheme,
  setCurrency,
  setLanguage,
  toggleSidebar,
  toggleMobileMenu,
  closeMobileMenu,
  openModal,
  closeModal,
  addNotification,
  removeNotification,
} = uiSlice.actions;

export default uiSlice.reducer;
