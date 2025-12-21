import React from "react";
import { Check, Users, Target, Calendar, Dumbbell, CreditCard, Shield, Star } from "lucide-react";
import { Element } from "react-scroll";
import { IMAGE_PATHS } from "../common/ImageConstant";

export default function LandingPage() {
  const bgColor = "bg-[#EFF6FF]";

  // Hero Section
  const Hero = () => (
    <section className={`${bgColor} min-h-screen flex items-center py-16 md:py-24`}>
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-[64px] font-anton font-bold leading-tight">
              <span className="block">Manage</span>
              <span className="block">Your Gym</span>
              <span className="block">
                <span style={{ color: "#0661F3" }}>Smarter</span> With
              </span>
              <span className="block">JyaanBanau</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              All-in-one gym management for owners, coaches, and members. Streamline operations and grow your business.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full md:w-auto font-medium transition">
              Get Started
            </button>
          </div>

          <div className="rounded-lg overflow-hidden aspect-square md:aspect-auto md:h-[500px] flex items-center justify-center">
            <img
              src={IMAGE_PATHS.landingimage}
              alt="jyaanbanau"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );





// Features Section
const features = [
    { icon: Users, title: "Membership Management", description: "Easy membership registration, renewal, and tracking" },
    { icon: Target, title: "Personalized Tracking", description: "Advanced workout tracking and fitness analytics" },
    { icon: Calendar, title: "Class Scheduling", description: "Schedule classes, manage bookings effortlessly" },
    { icon: Dumbbell, title: "Trainer Management", description: "Manage trainer profiles, schedules, and performance" },
    { icon: CreditCard, title: "Billing and Payments", description: "Seamless payment processing and invoicing" },
    { icon: Shield, title: "Users and Roles", description: "Role-based access control for secure operations" },
  ];
  
  const Features = () => (
    <Element name="features">
      <section
        className="flex items-center py-12 md:py-20"
        style={{ backgroundColor: "#EFF6FF" }}
      >
        <div className="max-w-7xl mx-auto px-4 w-full">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Powerful Features Built For Gyms
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to run your gym efficiently
            </p>
          </div>
  
          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 md:p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-blue-100 rounded-full mb-4 md:mb-6">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2 md:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Element>
  );
  





  // Steps Section (How it Works)
  const steps = [
    { number: 1, title: "Sign up", description: "Create your JyaanBanau account in minutes" },
    { number: 2, title: "Add Gym Details", description: "Configure your gym information and management settings" },
    { number: 3, title: "Start Managing", description: "Begin managing members, classes, and gym operations" },
  ];
  const Steps = () => (
    <Element name="steps">
      <section className={`${bgColor} min-h-screen flex flex-col justify-center py-16 md:py-24`}>
        <div className="max-w-7xl mx-auto px-4 w-full">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Get Started In Three Simple Steps
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Setting up your gym management is simple, fast, and efficient
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 md:gap-20 items-start">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-extrabold mb-6 shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #0661F3, #42A5F5)",
                    color: "white",
                  }}
                >
                  {step.number}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-base md:text-lg">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Element>
  );




  
  // Pricing Section
  const plans = [
    { name: "Basic", price: "2999", description: "Perfect for new gyms", features: ["Basic Members", "No Trainer Plan", "Limited Access", "No Payment Plan"] },
    { name: "Standard", price: "4999", description: "Most popular", featured: true, features: ["Up to 200 Members", "Trainer Management", "Class Scheduling", "Payment Support", "Priority Support"] },
    { name: "Premium", price: "8999", description: "For large gyms", features: ["Unlimited Members", "Full Trainer", "Custom Management", "Advanced Analytics", "Premium Support"] },
  ];
  const Pricing = () => (
    <Element name="pricing">
      <section className={`${bgColor} py-16 md:py-24`}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl">
              Choose the plan that fits your gym
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-12">
            {plans.map((plan) => {
              const isFeatured = plan.featured;
              return (
                <div
                  key={plan.name}
                  className={`flex-1 max-w-xs p-10 rounded-2xl shadow-lg transform transition-all duration-300 flex flex-col justify-between ${
                    isFeatured
                      ? "bg-[#0661F3] text-white scale-105 hover:scale-110 hover:shadow-2xl"
                      : "bg-white text-foreground hover:shadow-xl"
                  }`}
                >
                  {/* Plan Title */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3">{plan.name}</h3>
                    <p className={`text-sm md:text-base mb-8 ${isFeatured ? "text-white/80" : "text-muted-foreground"}`}>
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-8">
                      <span className="text-3xl md:text-4xl font-extrabold">Rs {plan.price}</span>
                      <span className={`text-sm md:text-base ${isFeatured ? "text-white/80" : "text-muted-foreground"}`}>
                        /month
                      </span>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <Check className={`w-4 h-4 ${isFeatured ? "text-white" : "text-blue-600"}`} />
                          <span className={`${isFeatured ? "text-white" : "text-foreground"}`}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    className={`mt-8 w-full px-6 py-3 rounded-lg font-semibold transition ${
                      isFeatured
                        ? "bg-white text-[#0661F3] hover:bg-white/90"
                        : "bg-[#0661F3] text-white hover:bg-blue-700"
                    }`}
                  >
                    Start Free Trial
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Element>
  );





  // Testimonials Section
  const testimonials = [
    { 
      name: "Rohit Oli", 
      rating: 5, 
      quote: "Workflow Gym team has seen 3x more member interactions by accessing JyaanBanau. Awesome without calling the gym.", 
      avatar: IMAGE_PATHS.avatar1,
    },
    { 
      name: "Raj lama", 
      rating: 5, 
      quote: "The solution is clear and well put together exactly as I needed. I would be confident in my daily use.", 
      avatar: IMAGE_PATHS.avatar2,
    },
    { 
      name: "Ram kc", 
      rating: 5, 
      quote: "I love the product. It was an excellent and transformative system. Time can be redeemed...", 
      avatar: IMAGE_PATHS.avatar3,
    },
  ];

  const Testimonials = () => (
    <Element name="testimonials">
      <section className={`${bgColor} py-20 md:py-32`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground text-center mb-16">
            Testimonials
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 flex flex-col items-center text-center"
              >
                <img
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-blue-100"
                />

                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating).fill(0).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-600 italic mb-6 text-lg">"{testimonial.quote}"</p>
                <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Element>
  );

  return (
    <div className={bgColor}>
      <Hero />
      <Features />
      <Steps />
      <Pricing />
      <Testimonials />
    </div>
  );
}






