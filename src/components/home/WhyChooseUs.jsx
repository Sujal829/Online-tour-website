import { Shield, Clock, Award, Headphones, CreditCard, Globe } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Best Price Guarantee',
    description: 'Find a lower price? We\'ll match it and give you 10% off.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock assistance wherever you are in the world.',
  },
  {
    icon: Award,
    title: 'Handpicked Experiences',
    description: 'Every tour is personally vetted by our travel experts.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Travel Guide',
    description: 'Expert local guides who know every hidden gem.',
  },
  {
    icon: CreditCard,
    title: 'Flexible Payment',
    description: 'Pay in installments with no extra fees or interest.',
  },
  {
    icon: Globe,
    title: 'Sustainable Travel',
    description: 'We partner with eco-friendly hotels and operators.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-secondary font-medium">Our Promise</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
            Why Choose TravelWorld
          </h2>
          <p className="text-primary-foreground/70 mt-2 max-w-md mx-auto">
            We go above and beyond to make your travel dreams a reality
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-4 p-6 rounded-2xl bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-primary-foreground/70 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
