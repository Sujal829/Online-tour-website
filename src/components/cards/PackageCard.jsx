import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Star, Clock, Users, MapPin, Tag, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toggleWishlist } from '@/features/packages/packagesSlice';

const PackageCard = ({ pkg }) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.packages);
  const isWishlisted = wishlist.includes(pkg.id);

  const {
    id,
    name,
    destination,
    image,
    price,
    originalPrice,
    duration,
    rating,
    reviewsCount,
    category,
    hasDiscount,
    isLimitedOffer,
    maxGroupSize,
  } = pkg;

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(id));
  };

  const discountPercent = hasDiscount && originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <Link to={`/packages/${id}`} className="group block">
      <div className="bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {hasDiscount && (
              <Badge className="bg-destructive text-destructive-foreground">
                <Tag className="w-3 h-3 mr-1" />
                {discountPercent}% OFF
              </Badge>
            )}
            {isLimitedOffer && (
              <Badge className="bg-warning text-warning-foreground">
                <Timer className="w-3 h-3 mr-1" />
                Limited Time
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background ${
              isWishlisted ? 'text-destructive' : 'text-muted-foreground'
            }`}
            onClick={handleWishlistClick}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </Button>

          {/* Category */}
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Location */}
          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>{destination}</span>
          </div>

          {/* Title */}
          <h3 className="font-display font-semibold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Rating & Duration */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              <span className="font-medium">{rating}</span>
              <span className="text-muted-foreground text-sm">({reviewsCount})</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {duration}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {maxGroupSize}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              {hasDiscount && originalPrice && (
                <span className="text-muted-foreground line-through text-sm mr-2">
                  Rs:-{originalPrice}
                </span>
              )}
              <span className="font-display font-bold text-2xl text-primary">Rs:-{price}</span>
              <span className="text-muted-foreground text-sm">/person</span>
            </div>
            <Button size="sm">Book Now</Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;
