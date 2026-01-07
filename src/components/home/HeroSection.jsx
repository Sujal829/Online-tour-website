import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    destination: '',
    date: '',
    budget: '',
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchData.destination) params.set('search', searchData.destination);
    if (searchData.budget) params.set('budget', searchData.budget);
    navigate(`/packages?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920"
          alt="Travel background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary-foreground rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            ✈️ Discover 500+ Destinations
          </span>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Explore the World's
            <span className="block text-secondary">Most Amazing Places</span>
          </h1>
          
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg">
            From pristine beaches to mountain peaks, find your perfect adventure with our curated travel packages designed for every type of traveler.
          </p>

          {/* Search Module */}
          <form onSubmit={handleSearch} className="bg-background rounded-2xl p-4 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  Destination
                </label>
                <Input
                  placeholder="Where to?"
                  value={searchData.destination}
                  onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                  className="border-0 bg-muted"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Travel Date
                </label>
                <Input
                  type="date"
                  value={searchData.date}
                  onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                  className="border-0 bg-muted"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="w-4 h-4" />
                  Budget
                </label>
                <Select
                  value={searchData.budget}
                  onValueChange={(value) => setSearchData({ ...searchData, budget: value })}
                >
                  <SelectTrigger className="border-0 bg-muted">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1000">Under Rs:-1,000</SelectItem>
                    <SelectItem value="1000-2000">Rs:-1,000 - Rs:-2,000</SelectItem>
                    <SelectItem value="2000-5000">Rs:-2,000 - Rs:-5,000</SelectItem>
                    <SelectItem value="5000+">Rs:-5,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button type="submit" className="w-full h-10" size="lg">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </form>

          {/* Stats */}
          <div className="flex gap-8 mt-8">
            <div>
              <div className="font-display text-3xl font-bold text-primary-foreground">500+</div>
              <div className="text-primary-foreground/70 text-sm">Destinations</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-primary-foreground">10K+</div>
              <div className="text-primary-foreground/70 text-sm">Happy Travelers</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-primary-foreground">4.9</div>
              <div className="text-primary-foreground/70 text-sm">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
