import { createSlice } from '@reduxjs/toolkit';
import { packagesData } from '../../data/packages';

const loadWishlistFromStorage = () => {
  try {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const initialState = {
  items: packagesData,
  filteredItems: packagesData,
  wishlist: loadWishlistFromStorage(),
  recentlyViewed: [],
  filters: {
    category: '',
    priceRange: { min: 0, max: 20000 },
    duration: '',
    rating: 0,
    search: '',
  },
  sortBy: 'popularity',
  currentPage: 1,
  itemsPerPage: 6,
  loading: false,
  error: null,
};

const packagesSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    setPackages: (state, action) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredItems = applyFilters(state.items, state.filters, state.sortBy);
      state.currentPage = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.filteredItems = applyFilters(state.items, state.filters, state.sortBy);
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.sortBy = 'popularity';
      state.filteredItems = state.items;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    toggleWishlist: (state, action) => {
      const packageId = action.payload;
      const index = state.wishlist.indexOf(packageId);
      if (index === -1) {
        state.wishlist.push(packageId);
      } else {
        state.wishlist.splice(index, 1);
      }
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    },
    addToRecentlyViewed: (state, action) => {
      const packageId = action.payload;
      state.recentlyViewed = [
        packageId,
        ...state.recentlyViewed.filter(id => id !== packageId),
      ].slice(0, 5);
    },
    addPackage: (state, action) => {
      state.items.push(action.payload);
      state.filteredItems = applyFilters(state.items, state.filters, state.sortBy);
    },
    updatePackage: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        state.filteredItems = applyFilters(state.items, state.filters, state.sortBy);
      }
    },
    deletePackage: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
      state.filteredItems = applyFilters(state.items, state.filters, state.sortBy);
    },
    togglePackageStatus: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload);
      if (index !== -1) {
        state.items[index].isActive = !state.items[index].isActive;
        state.filteredItems = applyFilters(state.items, state.filters, state.sortBy);
      }
    },
  },
});

const applyFilters = (items, filters, sortBy) => {
  let result = [...items];

  if (filters.category) {
    result = result.filter(item => item.category.toLowerCase() === filters.category.toLowerCase());
  }

  if (filters.priceRange) {
    result = result.filter(
      item => item.price >= filters.priceRange.min && item.price <= filters.priceRange.max
    );
  }

  if (filters.duration) {
    result = result.filter(item => item.duration === filters.duration);
  }

  if (filters.rating) {
    result = result.filter(item => item.rating >= filters.rating);
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    result = result.filter(
      item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.destination.toLowerCase().includes(searchLower)
    );
  }

  // Only show active packages for regular users
  result = result.filter(item => item.isActive !== false);

  switch (sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'duration':
      result.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'popularity':
    default:
      result.sort((a, b) => b.popularity - a.popularity);
      break;
  }

  return result;
};

export const {
  setPackages,
  setFilter,
  setSortBy,
  clearFilters,
  setCurrentPage,
  toggleWishlist,
  addToRecentlyViewed,
  addPackage,
  updatePackage,
  deletePackage,
  togglePackageStatus,
} = packagesSlice.actions;

export default packagesSlice.reducer;
