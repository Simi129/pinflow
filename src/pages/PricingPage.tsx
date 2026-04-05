import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { Navbar, Footer } from '../components/Navigation';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for beginners and hobbyists.',
      price: billingCycle === 'monthly' ? 0 : 0,
      features: [
        { text: '1 Pinterest account', included: true },
        { text: '50 pins/mo', included: true },
        { text: 'Analytics', included: false },
      ],
      cta: 'Start Free',
      highlight: false,
    },
    {
      name: 'Pro',
      description: 'The standard for growing influencers.',
      price: billingCycle === 'monthly' ? 29 : 24,
      features: [
        { text: '5 Pinterest accounts', included: true },
        { text: 'Unlimited pins', included: true },
        { text: 'Basic Analytics', included: true },
        { text: 'Priority Support', included: true },
      ],
      cta: 'Go Pro Now',
      highlight: true,
    },
    {
      name: 'Business',
      description: 'Scaling automation for enterprise teams.',
      price: billingCycle === 'monthly' ? 99 : 79,
      features: [
        { text: '25 Pinterest accounts', included: true },
        { text: 'Advanced Analytics', included: true },
        { text: 'API Access', included: true },
        { text: 'Account Manager', included: true },
      ],
      cta: 'Contact Sales',
      highlight: false,
    },
  ];

  const faqs = [
    { q: 'Can I switch plans later?', a: 'Yes, you can upgrade or downgrade your plan at any time. Changes are pro-rated.' },
    { q: 'Is there a free trial for Pro?', a: 'We offer a 14-day free trial for all new users wanting to test our Pro features.' },
    { q: 'What happens if I reach my pin limit?', a: 'Starter accounts will pause scheduling until the next month or until upgraded.' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface mb-6"
            >
              Simple pricing for <span className="text-primary">infinite reach.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-on-surface-variant text-xl max-w-2xl mx-auto mb-12"
            >
              Choose the plan that fits your Pinterest automation needs. From solo creators to global agencies.
            </motion.p>
            
            <div className="flex items-center justify-center gap-4 mb-16">
              <span className={cn("font-medium", billingCycle === 'monthly' ? "text-on-surface" : "text-on-surface-variant")}>Monthly</span>
              <button 
                onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                className="w-14 h-7 bg-surface-container-high rounded-full p-1 cursor-pointer flex items-center transition-all"
              >
                <motion.div 
                  animate={{ x: billingCycle === 'monthly' ? 0 : 28 }}
                  className="w-5 h-5 bg-primary rounded-full shadow-md" 
                />
              </button>
              <span className={cn("font-medium", billingCycle === 'yearly' ? "text-on-surface" : "text-on-surface-variant")}>
                Yearly <span className="text-primary text-xs font-bold bg-primary/10 px-2 py-0.5 rounded-full ml-1">Save 20%</span>
              </span>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            {plans.map((plan, idx) => (
              <motion.div 
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className={cn(
                  "bg-surface-container-lowest rounded-[2rem] p-10 transition-all duration-300 border border-outline-variant/15",
                  plan.highlight ? "scale-105 shadow-2xl ring-4 ring-primary/10 relative" : "hover:-translate-y-2"
                )}
              >
                {plan.highlight && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    BEST VALUE
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-on-surface-variant text-sm">{plan.description}</p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-black font-headline">${plan.price}</span>
                  <span className="text-on-surface-variant">/mo</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className={cn("flex items-center gap-3", !feature.included && "opacity-40")}>
                      {feature.included ? (
                        <CheckCircle2 className="text-primary" size={20} />
                      ) : (
                        <XCircle size={20} />
                      )}
                      <span className={cn("text-on-surface-variant", !feature.included && "line-through")}>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <button className={cn(
                  "w-full py-4 rounded-xl font-bold transition-all",
                  plan.highlight 
                    ? "primary-gradient text-on-primary shadow-xl hover:scale-[1.02] active:scale-95" 
                    : "border border-outline-variant text-on-surface hover:bg-surface-container"
                )}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trust Section */}
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4">
            <div className="md:col-span-2 md:row-span-2 bg-primary rounded-[2rem] p-10 flex flex-col justify-end min-h-[400px] relative overflow-hidden group">
              <div 
                className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 group-hover:scale-110 transition-transform duration-700" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542744094-24638eff58bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')" }}
              />
              <div className="relative z-10">
                <h4 className="text-3xl font-bold text-on-primary mb-4">Trusted by 2,000+ Agencies</h4>
                <p className="text-on-primary/80">Scale your Pinterest presence with infrastructure built for volume.</p>
              </div>
            </div>
            <div className="md:col-span-2 bg-tertiary-container rounded-[2rem] p-10 flex flex-col justify-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle2 className="text-white" size={32} />
              </div>
              <h4 className="text-2xl font-bold text-on-tertiary mb-2">Secure & Compliant</h4>
              <p className="text-on-tertiary/90">Official Pinterest API integration ensuring your accounts remain safe and within terms.</p>
            </div>
            <div className="bg-surface-container rounded-[2rem] p-8 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-black text-primary font-headline">99.9%</span>
              <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Uptime</p>
            </div>
            <div className="bg-surface-container rounded-[2rem] p-8 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-black text-primary font-headline">24/7</span>
              <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Support</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto px-6 pb-32">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-surface-container-low p-6 rounded-xl">
                <h5 className="font-bold mb-2">{faq.q}</h5>
                <p className="text-on-surface-variant text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
