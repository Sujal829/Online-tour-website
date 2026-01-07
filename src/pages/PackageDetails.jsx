import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, Star, Clock, Users, MapPin, Check, X } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { addToRecentlyViewed } from '@/features/packages/packagesSlice';
import { startBooking } from '@/features/bookings/bookingsSlice';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.packages);
  const pkg = items.find((p) => p.id === id);

  useEffect(() => { if (pkg) dispatch(addToRecentlyViewed(pkg.id)); }, [pkg, dispatch]);

  if (!pkg) return <MainLayout><div className="container mx-auto px-4 py-20 text-center">Package not found</div></MainLayout>;

  const handleBookNow = () => {
    dispatch(startBooking({ packageId: pkg.id, packageName: pkg.name, packagePrice: pkg.price, packageImage: pkg.image }));
    navigate('/booking');
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <img src={pkg.image} alt={pkg.name} className="w-full h-96 object-cover rounded-2xl mb-6" />
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-primary" /><span className="text-muted-foreground">{pkg.destination}</span>
              <Badge variant="secondary">{pkg.category}</Badge>
            </div>
            <h1 className="font-display text-3xl font-bold mb-4">{pkg.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1"><Star className="w-5 h-5 fill-secondary text-secondary" /><span className="font-medium">{pkg.rating}</span><span className="text-muted-foreground">({pkg.reviewsCount} reviews)</span></div>
              <div className="flex items-center gap-1 text-muted-foreground"><Clock className="w-4 h-4" />{pkg.duration}</div>
              <div className="flex items-center gap-1 text-muted-foreground"><Users className="w-4 h-4" />Max {pkg.maxGroupSize}</div>
            </div>

            <Tabs defaultValue="overview">
              <TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="itinerary">Itinerary</TabsTrigger><TabsTrigger value="includes">Inclusions</TabsTrigger></TabsList>
              <TabsContent value="overview" className="mt-6"><p className="text-muted-foreground mb-6">{pkg.description}</p><h3 className="font-semibold mb-3">Highlights</h3><ul className="space-y-2">{pkg.highlights.map((h, i) => <li key={i} className="flex items-center gap-2"><Check className="w-4 h-4 text-success" />{h}</li>)}</ul></TabsContent>
              <TabsContent value="itinerary" className="mt-6 space-y-4">{pkg.itinerary.map((day) => <div key={day.day} className="border rounded-xl p-4"><div className="font-semibold">Day {day.day}: {day.title}</div><ul className="mt-2 text-sm text-muted-foreground">{day.activities.map((a, i) => <li key={i}>• {a}</li>)}</ul></div>)}</TabsContent>
              <TabsContent value="includes" className="mt-6 grid md:grid-cols-2 gap-6"><div><h3 className="font-semibold mb-3 text-success">Included</h3><ul className="space-y-2">{pkg.inclusions.map((i, idx) => <li key={idx} className="flex items-center gap-2"><Check className="w-4 h-4 text-success" />{i}</li>)}</ul></div><div><h3 className="font-semibold mb-3 text-destructive">Not Included</h3><ul className="space-y-2">{pkg.exclusions.map((e, idx) => <li key={idx} className="flex items-center gap-2"><X className="w-4 h-4 text-destructive" />{e}</li>)}</ul></div></TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border rounded-2xl p-6">
              <div className="mb-4">{pkg.hasDiscount && <span className="text-muted-foreground line-through mr-2">Rs:-{pkg.originalPrice}</span>}<span className="font-display text-3xl font-bold text-primary">Rs:-{pkg.price}</span><span className="text-muted-foreground">/person</span></div>
              <Button className="w-full" size="lg" onClick={handleBookNow}>Book Now</Button>
              <p className="text-center text-sm text-muted-foreground mt-4">Free cancellation up to 24 hours before</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PackageDetails;
