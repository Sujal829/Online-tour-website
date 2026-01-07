import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DestinationCard from '@/components/cards/DestinationCard';

const FeaturedDestinations = () => {
  const { items } = useSelector((state) => state.destinations);
  const featuredDestinations = items.filter((d) => d.featured).slice(0, 4);

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-primary font-medium">Explore</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
              Featured Destinations
            </h2>
            <p className="text-muted-foreground mt-2 max-w-md">
              Discover our handpicked destinations loved by travelers worldwide
            </p>
          </div>
          <Link to="/destinations">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
