import { createSlice } from '@reduxjs/toolkit';
import { promoCodesData } from '../../data/promoCodes';

const loadBookingsFromStorage = () => {
  try {
    const saved = localStorage.getItem('bookings');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const initialState = {
  items: loadBookingsFromStorage(),
  currentBooking: null,
  bookingStep: 1,
  appliedPromoCode: null,
  promoDiscount: 0,
  loading: false,
  error: null,
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.items = action.payload;
    },
    startBooking: (state, action) => {
      state.currentBooking = {
        packageId: action.payload.packageId,
        packageName: action.payload.packageName,
        packagePrice: action.payload.packagePrice,
        packageImage: action.payload.packageImage,
        travelers: 1,
        travelDate: '',
        contactInfo: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        },
        specialRequests: '',
        totalPrice: action.payload.packagePrice,
      };
      state.bookingStep = 1;
      state.appliedPromoCode = null;
      state.promoDiscount = 0;
    },
    updateBookingDetails: (state, action) => {
      state.currentBooking = { ...state.currentBooking, ...action.payload };
      // Recalculate total price
      if (state.currentBooking) {
        const basePrice = state.currentBooking.packagePrice * state.currentBooking.travelers;
        const taxes = basePrice * 0.1;
        const discount = state.promoDiscount ? basePrice * (state.promoDiscount / 100) : 0;
        state.currentBooking.totalPrice = basePrice + taxes - discount;
      }
    },
    setBookingStep: (state, action) => {
      state.bookingStep = action.payload;
    },
    applyPromoCode: (state, action) => {
      const code = action.payload.toUpperCase();
      const promo = promoCodesData.find(p => p.code === code && p.isActive);
      if (promo) {
        state.appliedPromoCode = promo;
        state.promoDiscount = promo.discount;
        // Recalculate total price with discount
        if (state.currentBooking) {
          const basePrice = state.currentBooking.packagePrice * state.currentBooking.travelers;
          const taxes = basePrice * 0.1;
          const discount = basePrice * (promo.discount / 100);
          state.currentBooking.totalPrice = basePrice + taxes - discount;
        }
      } else {
        state.error = 'Invalid or expired promo code';
      }
    },
    removePromoCode: (state) => {
      state.appliedPromoCode = null;
      state.promoDiscount = 0;
      if (state.currentBooking) {
        const basePrice = state.currentBooking.packagePrice * state.currentBooking.travelers;
        const taxes = basePrice * 0.1;
        state.currentBooking.totalPrice = basePrice + taxes;
      }
    },
    confirmBooking: (state) => {
      if (state.currentBooking) {
        const newBooking = {
          id: `BK${Date.now()}`,
          ...state.currentBooking,
          status: 'confirmed',
          bookedAt: new Date().toISOString(),
        };
        state.items.push(newBooking);
        localStorage.setItem('bookings', JSON.stringify(state.items));
        state.currentBooking = null;
        state.bookingStep = 1;
        state.appliedPromoCode = null;
        state.promoDiscount = 0;
      }
    },
    cancelBooking: (state, action) => {
      const index = state.items.findIndex(b => b.id === action.payload);
      if (index !== -1) {
        state.items[index].status = 'cancelled';
        localStorage.setItem('bookings', JSON.stringify(state.items));
      }
    },
    updateBookingStatus: (state, action) => {
      const { bookingId, status } = action.payload;
      const index = state.items.findIndex(b => b.id === bookingId);
      if (index !== -1) {
        state.items[index].status = status;
        localStorage.setItem('bookings', JSON.stringify(state.items));
      }
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
      state.bookingStep = 1;
      state.appliedPromoCode = null;
      state.promoDiscount = 0;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setBookings,
  startBooking,
  updateBookingDetails,
  setBookingStep,
  applyPromoCode,
  removePromoCode,
  confirmBooking,
  cancelBooking,
  updateBookingStatus,
  clearCurrentBooking,
  clearError,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;
