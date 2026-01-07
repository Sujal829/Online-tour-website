import { Star, Quote } from 'lucide-react';
import { testimonialsData } from '@/data/testimonials';

const Testimonials = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium">Testimonials</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
            What Our Travelers Say
          </h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Real experiences from real travelers who explored with us
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              
              <p className="text-muted-foreground mb-6 line-clamp-4">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
