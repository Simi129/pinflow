import Navigation from '../components/Navigation';
import Hero from '../components/landing/Hero';
import Pricing from '../components/landing/Pricing';
import { DashboardPreview, Features, FAQ, Footer } from '../components/landing/index';
import ChatWidget from '../components/shared/ChatWidget';

export default function LandingPage() {
  return (
    <div className="bg-white">
      <Navigation />
      <div className="pt-24">
        <Hero />
        <DashboardPreview />
        <Features />
        <Pricing />
        <FAQ />
        <Footer />
      </div>
      <ChatWidget />
    </div>
  );
}