import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, SlidersHorizontal } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import DestinationCard from '@/components/cards/DestinationCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { setFilter, setSortBy } from '@/features/destinations/destinationsSlice';

const Destinations = () => {
  const dispatch = useDispatch();
  const { filteredItems, filters, sortBy } = useSelector((state) => state.destinations);
  const [searchValue, setSearchValue] = useState(filters.search);

  const countries = useMemo(() => {
    const unique = [...new Set(filteredItems.map((d) => d.country))];
    return unique.sort();
  }, [filteredItems]);

  const handleSearch = (value) => {
    setSearchValue(value);
    dispatch(setFilter({ search: value }));
  };

  return (
    <MainLayout>
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Explore Destinations</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">Discover amazing places around the world</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search destinations..." value={searchValue} onChange={(e) => handleSearch(e.target.value)} className="pl-10" />
          </div>
          <Select value={filters.country} onValueChange={(value) => dispatch(setFilter({ country: value === 'all' ? '' : value }))}>
            <SelectTrigger className="w-full md:w-48"><SelectValue placeholder="All Countries" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {countries.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(value) => dispatch(setSortBy(value))}>
            <SelectTrigger className="w-full md:w-48"><SelectValue placeholder="Sort by" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Most Popular</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((destination) => <DestinationCard key={destination.id} destination={destination} />)}
        </div>
        {filteredItems.length === 0 && <div className="text-center py-16 text-muted-foreground">No destinations found.</div>}
      </div>
    </MainLayout>
  );
};

export default Destinations;
