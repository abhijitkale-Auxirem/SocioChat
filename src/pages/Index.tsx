import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/features/HeroSection';
import StatsSection from '@/components/features/StatsSection';
import FeaturesSection from '@/components/features/FeaturesSection';
import AppPreviewSection from '@/components/features/AppPreviewSection';
import HowItWorks from '@/components/features/HowItWorks';
import CommunitiesShowcase from '@/components/features/CommunitiesShowcase';
import CreatorSection from '@/components/features/CreatorSection';
import TestimonialsSection from '@/components/features/TestimonialsSection';
import PricingSection from '@/components/features/PricingSection';
import BlogSection from '@/components/features/BlogSection';
import CTASection from '@/components/features/CTASection';

export default function Index() {
  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <AppPreviewSection />
      <HowItWorks />
      <CommunitiesShowcase />
      <CreatorSection />
      <TestimonialsSection />
      <PricingSection />
      <BlogSection />
      <CTASection />
      <Footer />
    </div>
  );
}
