import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedDestinations from '@/components/home/FeaturedDestinations';
import TrendingPackages from '@/components/home/TrendingPackages';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedDestinations />
      <TrendingPackages />
      <WhyChooseUs />
      <Testimonials />
    </MainLayout>
  );
};

export default Index;
