import { createSlice } from '@reduxjs/toolkit';
import { destinationsData } from '../../data/destinations';

const initialState = {
  items: destinationsData,
  filteredItems: destinationsData,
  filters: {
    country: '',
    budgetRange: { min: 0, max: 10000 },
    duration: '',
    search: '',
  },
  sortBy: 'popularity',
  loading: false,
  error: null,
};

const destinationsSlice = createSlice({
  name: 'destinations',
  initialState,
  reducers: {
    setDestinations: (state, action) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredItems = applyFilters(state.items, state.filters, state.sortBy);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.filteredItems = applyFilters(state.items, state.filters, state.sortBy);
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.sortBy = 'popularity';
      state.filteredItems = state.items;
    },
    addDestination: (state, action) => {
      state.items.push(action.payload);
      state.filteredItems = applyFilters(state.items, state.filters, state.sortBy);
    },
    updateDestination: (state, action) => {
      const index = state.items.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        state.filteredItems = applyFilters(state.items, state.filters, state.sortBy);
      }
    },
    deleteDestination: (state, action) => {
      state.items = state.items.filter(d => d.id !== action.payload);
      state.filteredItems = applyFilters(state.items, state.filters, state.sortBy);
    },
  },
});

const applyFilters = (items, filters, sortBy) => {
  let result = [...items];

  if (filters.country) {
    result = result.filter(item => item.country.toLowerCase() === filters.country.toLowerCase());
  }

  if (filters.budgetRange) {
    result = result.filter(
      item => item.startingPrice >= filters.budgetRange.min && item.startingPrice <= filters.budgetRange.max
    );
  }

  if (filters.duration) {
    result = result.filter(item => item.duration === filters.duration);
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    result = result.filter(
      item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.country.toLowerCase().includes(searchLower)
    );
  }

  switch (sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.startingPrice - b.startingPrice);
      break;
    case 'price-desc':
      result.sort((a, b) => b.startingPrice - a.startingPrice);
      break;
    case 'duration':
      result.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
      break;
    case 'popularity':
    default:
      result.sort((a, b) => b.popularity - a.popularity);
      break;
  }

  return result;
};

export const {
  setDestinations,
  setFilter,
  setSortBy,
  clearFilters,
  addDestination,
  updateDestination,
  deleteDestination,
} = destinationsSlice.actions;

export default destinationsSlice.reducer;
