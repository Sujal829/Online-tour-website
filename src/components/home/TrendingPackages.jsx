import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PackageCard from '@/components/cards/PackageCard';

const TrendingPackages = () => {
  const { items } = useSelector((state) => state.packages);
  const trendingPackages = [...items]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 6);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-flex items-center gap-1 text-primary font-medium">
              <Sparkles className="w-4 h-4" />
              Popular
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
              Trending Tour Packages
            </h2>
            <p className="text-muted-foreground mt-2 max-w-md">
              Explore our most booked packages with amazing deals
            </p>
          </div>
          <Link to="/packages">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Packages
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingPackages;
