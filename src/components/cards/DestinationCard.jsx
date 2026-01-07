import { Link } from 'react-router-dom';
import { MapPin, Clock, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const DestinationCard = ({ destination }) => {
  const { id, name, country, image, startingPrice, duration, featured } = destination;

  return (
    <Link to={`/destinations/${id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          
          {featured && (
            <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-primary-foreground">
          <div className="flex items-center gap-1 text-sm mb-1 opacity-90">
            <MapPin className="w-4 h-4" />
            <span>{country}</span>
          </div>
          <h3 className="font-display font-bold text-xl mb-2">{name}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm opacity-90">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <div>
              <span className="text-sm opacity-80">From </span>
              <span className="font-bold text-lg">Rs:-{startingPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
