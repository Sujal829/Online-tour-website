import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, Tag, Trash2 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateBookingDetails, setBookingStep, applyPromoCode, removePromoCode, confirmBooking, clearError } from '@/features/bookings/bookingsSlice';

const steps = ['Travel Details', 'Contact Info', 'Review & Pay'];

const Booking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentBooking, bookingStep, appliedPromoCode, promoDiscount, error } = useSelector((state) => state.bookings);
  const [promoInput, setPromoInput] = useState('');

  if (!currentBooking) { navigate('/packages'); return null; }

  const handleNext = () => { if (bookingStep < 3) dispatch(setBookingStep(bookingStep + 1)); };
  const handleBack = () => { if (bookingStep > 1) dispatch(setBookingStep(bookingStep - 1)); };
  
  const handleConfirm = () => {
    dispatch(confirmBooking());
    navigate('/dashboard');
  };

  const handleApplyPromo = () => {
    dispatch(clearError());
    dispatch(applyPromoCode(promoInput));
    setPromoInput('');
  };

  const basePrice = currentBooking.packagePrice * currentBooking.travelers;
  const taxes = basePrice * 0.1;
  const discount = promoDiscount ? basePrice * (promoDiscount / 100) : 0;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center justify-center gap-4 mb-12">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${bookingStep > i + 1 ? 'bg-success text-success-foreground' : bookingStep === i + 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                {bookingStep > i + 1 ? <Check className="w-5 h-5" /> : i + 1}
              </div>
              <span className="ml-2 hidden sm:inline text-sm">{step}</span>
              {i < 2 && <ChevronRight className="w-5 h-5 mx-4 text-muted-foreground" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-card border rounded-2xl p-6">
            {bookingStep === 1 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-semibold mb-4">Travel Details</h2>
                <div><Label>Travel Date</Label><Input type="date" value={currentBooking.travelDate} onChange={(e) => dispatch(updateBookingDetails({ travelDate: e.target.value }))} /></div>
                <div><Label>Number of Travelers</Label><Input type="number" min="1" max="10" value={currentBooking.travelers} onChange={(e) => dispatch(updateBookingDetails({ travelers: parseInt(e.target.value) || 1 }))} /></div>
                <div><Label>Special Requests</Label><Input value={currentBooking.specialRequests} onChange={(e) => dispatch(updateBookingDetails({ specialRequests: e.target.value }))} placeholder="Any special requirements?" /></div>
              </div>
            )}
            {bookingStep === 2 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-semibold mb-4">Contact Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>First Name</Label><Input value={currentBooking.contactInfo.firstName} onChange={(e) => dispatch(updateBookingDetails({ contactInfo: { ...currentBooking.contactInfo, firstName: e.target.value } }))} /></div>
                  <div><Label>Last Name</Label><Input value={currentBooking.contactInfo.lastName} onChange={(e) => dispatch(updateBookingDetails({ contactInfo: { ...currentBooking.contactInfo, lastName: e.target.value } }))} /></div>
                </div>
                <div><Label>Email</Label><Input type="email" value={currentBooking.contactInfo.email} onChange={(e) => dispatch(updateBookingDetails({ contactInfo: { ...currentBooking.contactInfo, email: e.target.value } }))} /></div>
                <div><Label>Phone</Label><Input value={currentBooking.contactInfo.phone} onChange={(e) => dispatch(updateBookingDetails({ contactInfo: { ...currentBooking.contactInfo, phone: e.target.value } }))} /></div>
              </div>
            )}
            {bookingStep === 3 && (
              <div>
                <h2 className="font-display text-xl font-semibold mb-4">Review Your Booking</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Package</span><span>{currentBooking.packageName}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>{currentBooking.travelDate || 'Not selected'}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Travelers</span><span>{currentBooking.travelers}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span>{currentBooking.contactInfo.firstName} {currentBooking.contactInfo.lastName}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span>{currentBooking.contactInfo.email}</span></div>
                </div>
              </div>
            )}
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handleBack} disabled={bookingStep === 1}>Back</Button>
              {bookingStep < 3 ? <Button onClick={handleNext}>Continue</Button> : <Button onClick={handleConfirm}>Confirm Booking</Button>}
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-6 h-fit">
            <img src={currentBooking.packageImage} alt={currentBooking.packageName} className="w-full h-32 object-cover rounded-xl mb-4" />
            <h3 className="font-semibold mb-4">{currentBooking.packageName}</h3>
            <div className="space-y-2 text-sm border-t pt-4">
              <div className="flex justify-between"><span>Base price × {currentBooking.travelers}</span><span>Rs:-{basePrice}</span></div>
              <div className="flex justify-between"><span>Taxes & fees</span><span>Rs:-{taxes.toFixed(2)}</span></div>
              {promoDiscount > 0 && <div className="flex justify-between text-success"><span>Discount ({promoDiscount}%)</span><span>-Rs:-{discount.toFixed(2)}</span></div>}
              <div className="flex justify-between font-bold text-lg pt-2 border-t"><span>Total</span><span className="text-primary">Rs:-{currentBooking.totalPrice?.toFixed(2)}</span></div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <Label>Promo Code</Label>
              {appliedPromoCode ? (
                <div className="flex items-center justify-between bg-success/10 p-2 rounded mt-1"><span className="text-success text-sm"><Tag className="w-4 h-4 inline mr-1" />{appliedPromoCode.code}</span><Button variant="ghost" size="sm" onClick={() => dispatch(removePromoCode())}><Trash2 className="w-4 h-4" /></Button></div>
              ) : (
                <div className="flex gap-2 mt-1"><Input value={promoInput} onChange={(e) => setPromoInput(e.target.value)} placeholder="Enter code" /><Button variant="outline" onClick={handleApplyPromo}>Apply</Button></div>
              )}
              {error && <p className="text-destructive text-xs mt-1">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Booking;
