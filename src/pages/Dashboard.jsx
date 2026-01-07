import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Calendar, Package, User, LogOut, X } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { logout } from '@/features/auth/authSlice';
import { cancelBooking } from '@/features/bookings/bookingsSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items: bookings } = useSelector((state) => state.bookings);

  if (!isAuthenticated) { navigate('/auth'); return null; }

  const userBookings = bookings.filter((b) => b.contactInfo?.email === user?.email || true);
  const statusColors = { confirmed: 'bg-success', pending: 'bg-warning', cancelled: 'bg-destructive' };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="bg-card border rounded-2xl p-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"><User className="w-10 h-10 text-primary" /></div>
            <h2 className="font-display font-semibold text-xl text-center">{user?.firstName} {user?.lastName}</h2>
            <p className="text-muted-foreground text-center text-sm">{user?.email}</p>
            <Button variant="outline" className="w-full mt-6" onClick={() => { dispatch(logout()); navigate('/'); }}><LogOut className="w-4 h-4 mr-2" />Logout</Button>
          </div>

          <div className="lg:col-span-3">
            <h1 className="font-display text-2xl font-bold mb-6">My Bookings</h1>
            {userBookings.length === 0 ? (
              <div className="text-center py-16 bg-muted/50 rounded-2xl"><Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" /><p className="text-muted-foreground">No bookings yet</p><Button className="mt-4" onClick={() => navigate('/packages')}>Explore Packages</Button></div>
            ) : (
              <div className="space-y-4">
                {userBookings.map((booking) => (
                  <div key={booking.id} className="bg-card border rounded-xl p-4 flex flex-col md:flex-row gap-4">
                    <img src={booking.packageImage} alt={booking.packageName} className="w-full md:w-32 h-24 object-cover rounded-lg" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between"><h3 className="font-semibold">{booking.packageName}</h3><Badge className={statusColors[booking.status]}>{booking.status}</Badge></div>
                      <div className="flex gap-4 mt-2 text-sm text-muted-foreground"><span><Calendar className="w-4 h-4 inline mr-1" />{new Date(booking.travelDate).toLocaleDateString()}</span><span>{booking.travelers} travelers</span></div>
                      <div className="flex items-center justify-between mt-3"><span className="font-bold text-primary">Rs:-{booking.totalPrice?.toFixed(2)}</span>{booking.status !== 'cancelled' && <Button variant="ghost" size="sm" className="text-destructive" onClick={() => dispatch(cancelBooking(booking.id))}><X className="w-4 h-4 mr-1" />Cancel</Button>}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
