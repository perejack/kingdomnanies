import ApplicationForm from "@/components/ApplicationForm";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import StatCard from "@/components/StatCard";
import { Heart, Home, Baby, Users, Trophy, Clock, Phone, Mail, MapPin, CheckCircle, Star, Briefcase, Menu, X, Shield, Award, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import kenyaHeroImage from "@/assets/kenya-hero.jpg";
import caregiverImage from "@/assets/caregiver-service.jpg";
import housekeeperImage from "@/assets/housekeeper-service.jpg";
import nannyImage from "@/assets/nanny-service.jpg";

const Index = () => {
  const scrollToApplication = () => {
    document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Stylish Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo & Brand */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-kenya-gold to-warm-orange rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-kenya-gold to-warm-orange bg-clip-text text-transparent">
                  CareConnect
                </h1>
                <p className="text-xs text-gray-600 font-medium hidden sm:block">Kenya's #1 Care Jobs</p>
              </div>
            </div>
            
            {/* Center Navigation - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-kenya-gold font-medium transition-colors duration-200 relative group"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-kenya-gold transition-all duration-200 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-700 hover:text-kenya-gold font-medium transition-colors duration-200 relative group"
              >
                Success Stories
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-kenya-gold transition-all duration-200 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => scrollToSection('application')}
                className="text-gray-700 hover:text-kenya-gold font-medium transition-colors duration-200 relative group"
              >
                Apply Now
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-kenya-gold transition-all duration-200 group-hover:w-full"></span>
              </button>
            </div>
            
            {/* Right Side - Contact & CTA */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Trust Badges */}
              <div className="hidden lg:flex items-center gap-3 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Verified</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-blue-500" />
                  <span>Licensed</span>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 text-kenya-gold" />
                <span className="font-medium text-xs sm:text-sm">+254 715 009 829</span>
              </div>
              
              {/* CTA Button */}
              <Button 
                onClick={scrollToApplication}
                size="sm"
                className="bg-gradient-to-r from-kenya-gold to-warm-orange hover:from-kenya-gold/90 hover:to-warm-orange/90 text-white font-semibold px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <span className="hidden sm:inline">🚀 Quick Apply</span>
                <span className="sm:hidden">Apply</span>
              </Button>
              
              {/* Mobile Menu Button */}
              <button className="md:hidden p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Animated Progress Bar */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-kenya-gold via-warm-orange to-kenya-gold animate-pulse"></div>
        
        {/* Floating Action Notification */}
        <div className="absolute -bottom-6 sm:-bottom-8 right-2 sm:right-4 hidden sm:block">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-2 sm:px-3 py-1 rounded-full shadow-lg animate-bounce">
            ✨ 500+ Jobs Available!
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-14 sm:pt-16">
        {/* Enhanced Background with Better Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-[20s] ease-linear hover:scale-110"
          style={{ backgroundImage: `url(${kenyaHeroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-hero/60"></div>
        </div>
        
        {/* Floating Elements for Visual Interest */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-kenya-gold/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-32 h-32 bg-warm-orange/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-8 sm:py-12 lg:py-20 mt-4 sm:mt-8">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="text-white">
              {/* Enhanced Badge with Urgency */}
              <div className="flex items-center gap-2 mb-6 animate-slide-in-left">
                <div className="w-3 h-3 bg-kenya-gold rounded-full animate-ping"></div>
                <div className="w-2 h-2 bg-kenya-gold rounded-full animate-pulse absolute"></div>
                <span className="text-kenya-gold font-semibold tracking-wide">🏠 KENYA'S MOST TRUSTED CARE PLATFORM</span>
                <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-bounce">VERIFIED</div>
              </div>
              
              {/* Improved Headline with Better Typography */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight animate-fade-in">
                <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                  Find Your
                </span>
                <span className="text-kenya-gold block animate-slide-in-right bg-gradient-to-r from-kenya-gold to-yellow-400 bg-clip-text text-transparent">
                  Dream Job
                </span>
              </h1>
              
              {/* Enhanced Value Proposition */}
              <div className="mb-6 sm:mb-8 animate-fade-in">
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl mb-4 sm:mb-6 leading-relaxed text-white/95 font-medium">
                  Join Kenya's most trusted families as a professional 
                  <span className="font-bold text-kenya-gold"> caregiver, nanny, housekeeper, or cook</span>. 
                  Start your rewarding career today with competitive pay and supportive employers.
                </p>
                <div className="grid grid-cols-1 gap-2 sm:gap-3 text-white/90 text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span>Caregiving: <span className="font-bold text-kenya-gold">KES 6,000 - 15,000</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span>Housekeeping: <span className="font-bold text-kenya-gold">KES 5,000 - 13,000</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span>Cooking/chef: <span className="font-bold text-kenya-gold">KES 2,000/plate + KES 1,500/day</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span>Trusted, supportive families</span>
                  </div>
                </div>
              </div>
              
              {/* Enhanced CTA Section */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 animate-slide-in-left">
                <Button 
                  onClick={scrollToApplication}
                  size="lg" 
                  className="bg-gradient-to-r from-warm-orange to-red-500 hover:from-warm-orange/90 hover:to-red-500/90 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse-glow relative overflow-hidden group"
                >
                  <span className="relative z-10">🚀 Apply Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-foreground py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300"
                >
                  👥 Meet Our Families
                </Button>
              </div>
              
              {/* Trust & Opportunity Banner */}
              <div className="bg-gradient-to-r from-green-600/90 to-blue-600/90 backdrop-blur-sm rounded-lg p-4 mb-8 border border-green-400/50 animate-fade-in">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-ping"></div>
                  <span className="text-white font-semibold">✨ New Opportunity: </span>
                  <span className="text-green-200">Premium families actively hiring this week!</span>
                </div>
              </div>
              
              {/* Enhanced Stats with Social Proof */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 animate-fade-in">
                <StatCard icon={Users} number="8,500+" label="Success Stories" />
                <StatCard icon={Trophy} number="98.5%" label="Job Placement" />
                <StatCard icon={Clock} number="<24hrs" label="Quick Start" />
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-4 text-white/70 text-xs sm:text-sm animate-fade-in">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Verified Platform</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4 text-blue-400" />
                  <span>Licensed Agency</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-in-right mt-8 lg:mt-0">
              {/* Enhanced Right Panel with Better Visual Hierarchy */}
              <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/30 shadow-2xl relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-kenya-gold/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-warm-orange/10 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center gap-2 bg-kenya-gold/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1 sm:py-2 mb-3 sm:mb-4">
                      <div className="w-2 h-2 bg-kenya-gold rounded-full animate-pulse"></div>
                      <span className="text-kenya-gold font-semibold text-xs sm:text-sm">TRENDING NOW</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                      🔥 Hottest Jobs
                    </h3>
                    <p className="text-white/80 text-sm sm:text-base">Premium positions with immediate start</p>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    <div className="group bg-gradient-to-r from-white/15 to-white/5 hover:from-white/25 hover:to-white/10 rounded-xl p-5 border border-white/20 hover:border-kenya-gold/50 transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-kenya-gold to-yellow-400 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                            <Heart className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                          </div>
                          <div>
                            <span className="text-white font-bold text-sm sm:text-base lg:text-lg">Caregiver</span>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-2 w-2 sm:h-3 sm:w-3 text-yellow-400 fill-current" />
                              <span className="text-white/70 text-xs">Children 0-16yrs</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-kenya-gold font-bold text-sm sm:text-base lg:text-xl">KES 6K-15K</div>
                          <div className="text-green-400 text-xs font-semibold">✓ Child Care Expert</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="group bg-gradient-to-r from-white/15 to-white/5 hover:from-white/25 hover:to-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 border border-white/20 hover:border-kenya-gold/50 transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                            <Home className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                          </div>
                          <div>
                            <span className="text-white font-bold text-sm sm:text-base lg:text-lg">Housekeeper</span>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-2 w-2 sm:h-3 sm:w-3 text-yellow-400 fill-current" />
                              <span className="text-white/70 text-xs">Cleaning • Laundry • Compound</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-kenya-gold font-bold text-sm sm:text-base lg:text-xl">KES 5K-13K</div>
                          <div className="text-green-400 text-xs font-semibold">✓ Full Service</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="group bg-gradient-to-r from-white/15 to-white/5 hover:from-white/25 hover:to-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 border border-white/20 hover:border-kenya-gold/50 transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                            <ChefHat className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                          </div>
                          <div>
                            <span className="text-white font-bold text-sm sm:text-base lg:text-lg">Cook/Chef</span>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-2 w-2 sm:h-3 sm:w-3 text-yellow-400 fill-current" />
                              <span className="text-white/70 text-xs">African • Western Cuisine</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-kenya-gold font-bold text-sm sm:text-base lg:text-xl">KES 2K/plate</div>
                          <div className="text-green-400 text-xs font-semibold">✓ +1.5K/day</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Success Story Snippet */}
                  <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-green-400/30">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs sm:text-sm">MK</span>
                      </div>
                      <div>
                        <p className="text-white/90 text-xs sm:text-sm italic">
                          "Got hired in 3 days! Now earning KES 42,000 monthly with a lovely family in Karen."
                        </p>
                        <p className="text-green-300 text-xs mt-1 font-semibold">- Mary K., Caregiver</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={scrollToApplication}
                    className="w-full bg-gradient-to-r from-kenya-gold to-yellow-400 hover:from-kenya-gold/90 hover:to-yellow-400/90 text-black font-bold py-3 sm:py-4 text-base sm:text-lg shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">🎆 Claim Your Spot Now!</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </Button>
                  
                  <div className="text-center mt-3 sm:mt-4">
                    <p className="text-white/60 text-xs">
                      ⏱️ Average application time: <span className="text-kenya-gold font-semibold">2 minutes</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Positions */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-3 sm:mb-4 animate-fade-in">
              Available Positions
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in px-4">
              Choose from high-demand careers that offer stability, growth, and the satisfaction of helping others
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <ServiceCard
              icon={Heart}
              title="Caregiver"
              description="Professional childcare for children aged 0-16 years, providing loving care, educational support, and developmental activities in a safe environment."
              benefits={[
                "KES 6,000 - 15,000 monthly",
                "Infant care (0-2 years)",
                "Toddler supervision (2-5 years)",
                "School-age support (6-16 years)",
                
              ]}
              image={caregiverImage}
              salary="KES 6,000+"
              onApply={scrollToApplication}
            />
            <ServiceCard
              icon={Home}
              title="Housekeeper"
              description="Complete home maintenance services including deep cleaning, laundry, compound care, and garage services to keep living spaces spotless."
              benefits={[
                "KES 5,000 - 13,000 monthly",
                "cleaning & daily maintenance",
                "Laundry & ironing services",
                "House compound maintenance",
                "Garage & outdoor area service"
              ]}
              image={housekeeperImage}
              salary="KES 5,000+"
              onApply={scrollToApplication}
            />
            <ServiceCard
              icon={ChefHat}
              title="Cook/Chef"
              description="Expert culinary services featuring traditional African cuisine and Western dishes, with meal planning and special dietary accommodations."
              benefits={[
                "KES 2,000 per plate + KES 1,500/day",
                "Traditional African cuisine",
                "Western & international dishes",
                "Special dietary requirements",
                "General meal preparation"
              ]}
              image={nannyImage}
              salary="KES 2,000/plate"
              onApply={scrollToApplication}
            />
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section id="services" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-32 h-32 sm:w-64 sm:h-64 bg-kenya-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-warm-orange/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-3 sm:mb-4 animate-fade-in">
              Our <span className="bg-gradient-to-r from-kenya-gold to-warm-orange bg-clip-text text-transparent">Premium Services</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in px-4">
              Professional home care services tailored to meet your family's unique needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Caregiver Service */}
            <div className="group bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-kenya-gold/30">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-kenya-gold to-yellow-400 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-3 sm:mb-4 group-hover:text-kenya-gold transition-colors">
                Caregiver Services
              </h3>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-kenya-gold mb-3 sm:mb-4">
                KES 6,000 - 15,000
              </div>
              <p className="text-muted-foreground mb-6">
                Professional childcare for children aged 0-16 years with experienced, loving caregivers.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Infant care (0-2 years)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Toddler supervision (2-5 years)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>School-age support (6-16 years)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span></span>
                </li>
              </ul>
            </div>
            
            {/* Housekeeping Service */}
            <div className="group bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Home className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors">
                Housekeeping Services
              </h3>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-3 sm:mb-4">
                KES 5,000 - 13,000
              </div>
              <p className="text-muted-foreground mb-6">
                Complete home maintenance services to keep your living space spotless and organized.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span> cleaning & daily maintenance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Laundry & ironing services</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>House compound maintenance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Garage & outdoor area service</span>
                </li>
              </ul>
            </div>
            
            {/* Cooking Service */}
            <div className="group bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-orange-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <ChefHat className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-3 sm:mb-4 group-hover:text-orange-600 transition-colors">
                Cooking Services
              </h3>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 mb-3 sm:mb-4">
                KES 2,000/plate<br/>
                <span className="text-base sm:text-lg">+ KES 1,500/day staff</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Expert culinary services featuring diverse cuisines prepared by skilled chefs.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Traditional African cuisine</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Western dishes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Special dietary foods</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>general food preparation</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-16">
            <Button 
              onClick={scrollToApplication}
              size="lg"
              className="bg-gradient-to-r from-kenya-gold to-warm-orange hover:from-kenya-gold/90 hover:to-warm-orange/90 text-white font-bold py-4 px-12 text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              🚀 Start Your Career Today
            </Button>
            <p className="text-muted-foreground mt-4">
              Join thousands of professionals earning competitive rates with trusted families
            </p>
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-in">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground animate-fade-in">
              Real experiences from our community
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Grace Wanjiku"
              role="Caregiver, Nairobi"
              content="Within 2 weeks of applying, I found an amazing family to work with. The support and training I received helped me excel in my role. I now earn KES 12,000 monthly!"
              rating={5}
              image="https://namati.org/wp-content/uploads/2023/03/ProfilePicturePhoto-Wanjiku-Mwangi.jpg"
            />
            <TestimonialCard
              name="Mary Akinyi"
              role="Housekeeper, Mombasa"
              content="This platform changed my life! I love keeping homes clean and organized and now I have a stable income of KES 8,000 while doing what I'm passionate about."
              rating={5}
              image="https://www.afritech.xyz/uploads/1/2/0/0/120003203/akinyi-headshot-cropped_1_orig.jpg"
            />
            <TestimonialCard
              name="Jane Muthoni"
              role="Cook/Chef, Kisumu"
              content="Professional, reliable, and supportive. The families here really value good cooking. I've been with my current family for 2 years and they love my African dishes!"
              rating={5}
              image="https://static.wixstatic.com/media/f66537_2cc9e23c5d7a49bda01da08bd46c4d84~mv2.png/v1/fill/w_376,h_376,al_c/CLARA%20MUTHONI%20NJERU.png"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-in">
              Why Thousands Choose Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
              We're Kenya's most trusted platform connecting skilled professionals with amazing families
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: CheckCircle, title: "Verified Employers", desc: "All families are background checked" },
              { icon: Briefcase, title: "Immediate Placement", desc: "Start earning within days" },
              { icon: Star, title: "Top Salaries", desc: "Competitive pay rates in Kenya" },
              { icon: Users, title: "Ongoing Support", desc: "24/7 help when you need it" }
            ].map((feature, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-medium hover:shadow-large transition-all duration-300 animate-fade-in">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section id="application" className="py-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in">
                Ready to Start?
              </h2>
              <p className="text-xl mb-8 leading-relaxed animate-fade-in">
                Join thousands of successful professionals who found their dream jobs through our platform. 
                Application takes less than 2 minutes!
              </p>
              
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-kenya-gold" />
                  <span className="text-lg">Instant application review</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-kenya-gold" />
                  <span className="text-lg">Direct employer connections</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-kenya-gold" />
                  <span className="text-lg">24-hour response guarantee</span>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-in-right">
              <ApplicationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-white text-center">
            <div className="flex items-center justify-center gap-3">
              <Phone className="h-6 w-6 text-kenya-gold" />
              <div>
                <div className="font-semibold">Call Us</div>
                <div className="text-white/80">+254 700 000 000</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Mail className="h-6 w-6 text-kenya-gold" />
              <div>
                <div className="font-semibold">Email Us</div>
                <div className="text-white/80">jobs@careconnect.co.ke</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <MapPin className="h-6 w-6 text-kenya-gold" />
              <div>
                <div className="font-semibold">Visit Us</div>
                <div className="text-white/80">Nairobi, Kenya</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/95 text-white py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/80 mb-4">
            🇰🇪 Proudly serving Kenyan families and professionals since 2020
          </p>
          <p className="text-white/60 text-sm">
            © 2024 CareConnect Kenya. Building better lives through meaningful work.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/254715009829"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-2 px-3 sm:py-3 sm:px-5 rounded-full shadow-2xl flex items-center gap-2 sm:gap-3 transform hover:scale-110 transition-all duration-300 group"
      >
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLRTH3UPKrM2wvqPFgRerHarOjQa8KmqqmadJZUTsUMO0dyUIURnfpakoVViN3nFicsQc&usqp=CAU" 
          alt="WhatsApp" 
          className="w-6 h-6 sm:w-8 sm:h-8 group-hover:rotate-12 transition-transform"
        />
        <div className="relative">
          <span className="text-sm sm:text-base">Talk to us</span>
          <div className="absolute top-0 -right-2 sm:-right-3 flex items-center">
            <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-green-400 border border-white sm:border-2"></span>
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Index;