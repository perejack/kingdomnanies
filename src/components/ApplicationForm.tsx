import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Heart, Home, Baby, CheckCircle, Phone, Mail, User, 
  ArrowRight, ArrowLeft, Calendar, MapPin, Clock, 
  GraduationCap, Award, Languages, FileText, Star,
  DollarSign, Users, Shield, Briefcase, Bell
} from "lucide-react";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: ""
  });

  // Extended form data for multi-step application
  const [extendedFormData, setExtendedFormData] = useState({
    // Step 1: Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    emergencyContact: "",
    emergencyPhone: "",
    
    // Step 2: Professional Experience
    role: "",
    experience: "",
    education: "",
    certifications: "",
    languages: "",
    previousEmployer: "",
    reasonForLeaving: "",
    references: "",
    skills: "",
    
    // Step 3: Availability & Preferences
    availability: "",
    startDate: "",
    workSchedule: "",
    hourlyRate: "",
    transportation: "",
    workLocation: "",
    specialRequirements: "",
    additionalInfo: "",
    backgroundCheck: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDetailedForm, setShowDetailedForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showLoader, setShowLoader] = useState(false);
  const [loaderStep, setLoaderStep] = useState(0);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [matchedEmployers, setMatchedEmployers] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState<any>(null);
  const [showVerificationPrompt, setShowVerificationPrompt] = useState(false);
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [verificationPhone, setVerificationPhone] = useState("");
  const [bookingData, setBookingData] = useState({
    preferredDate: "",
    preferredTime: "",
    interviewType: "",
    message: ""
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed' | 'cancelled'>('idle');
  const [paymentError, setPaymentError] = useState("");
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const totalSteps = 3;

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.role) {
      toast.error("Please fill in all fields to complete your application");
      return;
    }

    // Pre-populate extended form with basic data
    setExtendedFormData(prev => ({
      ...prev,
      firstName: formData.name.split(' ')[0] || formData.name,
      lastName: formData.name.split(' ').slice(1).join(' ') || "",
      email: formData.email,
      phone: formData.phone,
      role: formData.role
    }));

    // Open detailed form immediately
    setShowDetailedForm(true);
    setCurrentStep(1);
  };

  const findMatchingEmployers = (workLocation: string, role: string) => {
    const location = workLocation.toLowerCase();
    let locationEmployers: any = {};
    
    // Find employers based on location keywords
    if (location.includes('nairobi') || location.includes('westlands') || location.includes('karen') || location.includes('kilimani') || location.includes('upper hill')) {
      locationEmployers = employerDatabase.nairobi;
    } else if (location.includes('mombasa') || location.includes('nyali') || location.includes('diani')) {
      locationEmployers = employerDatabase.mombasa;
    } else if (location.includes('kisumu') || location.includes('milimani') || location.includes('mamboleo')) {
      locationEmployers = employerDatabase.kisumu;
    } else {
      // Default to Nairobi if location not found
      locationEmployers = employerDatabase.nairobi;
    }
    
    // Get employers for the specific role
    const roleEmployers = locationEmployers[role] || locationEmployers.caregiver || [];
    
    // Return 2 random employers for the role and update their location to match user preference
    const shuffled = [...roleEmployers].sort(() => 0.5 - Math.random());
    const selectedEmployers = shuffled.slice(0, 2);
    
    // Update employer locations to match user's preferred location
    return selectedEmployers.map(employer => ({
      ...employer,
      location: workLocation // Use the exact location the user entered
    }));
  };

  const runLoader = async () => {
    setShowLoader(true);
    setLoaderStep(0);
    
    for (let i = 0; i < loaderSteps.length; i++) {
      setLoaderStep(i);
      await new Promise(resolve => setTimeout(resolve, loaderSteps[i].duration));
    }
    
    // Find matching employers based on role and location
    const employers = findMatchingEmployers(
      extendedFormData.workLocation || "nairobi", 
      extendedFormData.role || "caregiver"
    );
    setMatchedEmployers(employers);
    
    setShowLoader(false);
    setShowCongratulations(true);
  };

  const handleDetailedSubmit = async () => {
    // Validate current step
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      return;
    }

    setIsSubmitting(true);
    setShowDetailedForm(false);
    
    // Start the loader sequence
    await runLoader();
    
    setIsSubmitting(false);
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!extendedFormData.firstName || !extendedFormData.lastName || !extendedFormData.email || !extendedFormData.phone) {
          toast.error("Please fill in all required fields in Step 1");
          return false;
        }
        break;
      case 2:
        if (!extendedFormData.role || !extendedFormData.experience) {
          toast.error("Please fill in all required fields in Step 2");
          return false;
        }
        break;
      case 3:
        if (!extendedFormData.availability || !extendedFormData.startDate) {
          toast.error("Please fill in all required fields in Step 3");
          return false;
        }
        break;
    }
    return true;
  };

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateExtendedFormData = (field: string, value: string | boolean) => {
    setExtendedFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBookAppointment = (employer: any) => {
    setSelectedEmployer(employer);
    setShowBookingForm(true);
    setShowCongratulations(false);
  };

  const handleBookingSubmit = () => {
    if (!bookingData.preferredDate || !bookingData.preferredTime || !bookingData.interviewType) {
      toast.error("Please select your preferred date, time, and interview type");
      return;
    }
    
    // Show verification prompt instead of booking
    setShowBookingForm(false);
    setShowVerificationPrompt(true);
  };

  const handleProceedToVerify = () => {
    setShowVerificationPrompt(false);
    setShowPaymentScreen(true);
  };

  const handleProceedToPayment = () => {
    setShowPaymentScreen(false);
    setShowPhoneVerification(true);
  };

  const handleCompleteVerification = async () => {
    if (!verificationPhone || verificationPhone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsProcessingPayment(true);
    setPaymentStatus('processing');
    setPaymentError("");

    try {
      // Format phone number to 254 format
      let formattedPhone = verificationPhone.replace(/\s/g, '');
      if (formattedPhone.startsWith('0')) {
        formattedPhone = '254' + formattedPhone.substring(1);
      } else if (formattedPhone.startsWith('+254')) {
        formattedPhone = formattedPhone.substring(1);
      } else if (!formattedPhone.startsWith('254')) {
        formattedPhone = '254' + formattedPhone;
      }

      // Generate unique reference
      const reference = `KINGDOM-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      // Save application data first
      try {
        await fetch('/api/submit-application', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...extendedFormData,
            phone: formattedPhone,
            paymentReference: reference
          })
        });
        console.log('Application data saved');
      } catch (err) {
        console.error('Failed to save application:', err);
        // Continue with payment anyway
      }

      // Initiate payment
      const response = await fetch('/api/initiate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: formattedPhone,
          amount: 120,
          email: extendedFormData.email || 'applicant@kingdomnannies.com',
          reference: reference,
        }),
      });

      const result = await response.json();

      if (result.success === true) {
        const transactionId = result.data?.requestId || result.data?.transactionRequestId;
        
        if (!transactionId) {
          throw new Error('No transaction ID received from payment service');
        }
        
        // Start polling for payment status
        pollPaymentStatus(transactionId);
      } else {
        throw new Error(result.error || 'Failed to initiate payment');
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      setIsProcessingPayment(false);
      setPaymentStatus('failed');
      setPaymentError(error instanceof Error ? error.message : 'Failed to initiate payment');
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  const pollPaymentStatus = async (transactionId: string) => {
    let attempts = 0;
    const maxAttempts = 24; // 2 minutes (5 second intervals)

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/check-status-db?transaction_request_id=${transactionId}`);
        const data = await response.json();

        console.log('Payment status check:', data);

        if (data.success && data.payment) {
          const status = data.payment.status;

          if (status === 'success') {
            // Payment successful
            setIsProcessingPayment(false);
            setPaymentStatus('success');
            setShowPhoneVerification(false);
            setShowPaymentSuccess(true);
            return;
          } else if (status === 'failed' || status === 'cancelled') {
            // Payment failed or cancelled
            setIsProcessingPayment(false);
            setPaymentStatus(status === 'cancelled' ? 'cancelled' : 'failed');
            const errorMsg = status === 'cancelled' 
              ? 'Payment cancelled by user. Please try again.' 
              : 'Payment failed. Please try again.';
            setPaymentError(errorMsg);
            toast.error(errorMsg);
            return;
          }
        }

        // Continue polling if still pending
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, 5000); // Check every 5 seconds
        } else {
          // Timeout
          setIsProcessingPayment(false);
          setPaymentStatus('failed');
          setPaymentError('Payment timeout. Please try again.');
          toast.error("Payment timeout. Please try again.");
        }
      } catch (error) {
        console.error('Status check error:', error);
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, 5000);
        } else {
          setIsProcessingPayment(false);
          setPaymentStatus('failed');
          setPaymentError('Unable to verify payment status.');
          toast.error("Unable to verify payment status.");
        }
      }
    };

    checkStatus();
  };

  const roles = [
    { value: "caregiver", label: "Caregiver", icon: Heart, description: "Care for elderly & disabled" },
    { value: "housekeeper", label: "Housekeeper", icon: Home, description: "Home cleaning & maintenance" },
    { value: "nanny", label: "Nanny/Childcare", icon: Baby, description: "Childcare & development" }
  ];

  // Employer database with role and location-based matching
  const employerDatabase = {
    "nairobi": {
      "caregiver": [
        {
          id: 1,
          name: "The Johnson Family",
          location: "Westlands, Nairobi",
          avatar: "👨‍👩‍👧‍👦",
          rating: 4.9,
          reviews: 127,
          salary: "KSH 45,000 - 65,000",
          type: "Full-time",
          description: "Loving family seeking a dedicated caregiver for elderly grandmother. Modern home with excellent facilities.",
          requirements: ["Experience with elderly care", "First aid knowledge preferred", "Live-in position available"],
          benefits: ["Health insurance", "Paid holidays", "Performance bonuses", "Training provided"]
        },
        {
          id: 2,
          name: "Golden Years Care Home",
          location: "Karen, Nairobi",
          avatar: "🏥",
          rating: 4.7,
          reviews: 94,
          salary: "KSH 42,000 - 58,000",
          type: "Full-time",
          description: "Professional care facility seeking compassionate caregivers for elderly residents. Excellent working environment.",
          requirements: ["Patience and empathy", "Basic medical knowledge", "Professional certification preferred"],
          benefits: ["Medical coverage", "Professional development", "Retirement benefits", "Flexible shifts"]
        }
      ],
      "nanny": [
        {
          id: 3,
          name: "The Williams Family",
          location: "Kilimani, Nairobi",
          avatar: "👶",
          rating: 4.8,
          reviews: 156,
          salary: "KSH 40,000 - 55,000",
          type: "Full-time",
          description: "Young professional family with 2 children (ages 3 and 6) seeking experienced nanny. Modern apartment with play area.",
          requirements: ["Childcare experience", "Educational activities", "Swimming supervision"],
          benefits: ["Health insurance", "Paid vacation", "Performance bonus", "Child development training"]
        },
        {
          id: 4,
          name: "Sunshine Kids Academy",
          location: "Westlands, Nairobi",
          avatar: "🎨",
          rating: 4.9,
          reviews: 203,
          salary: "KSH 38,000 - 52,000",
          type: "Part-time",
          description: "Premium daycare center looking for qualified nannies. Focus on early childhood development and creative learning.",
          requirements: ["Early childhood education", "Creative skills", "First aid certified"],
          benefits: ["Professional growth", "Training programs", "Staff discounts", "Flexible hours"]
        }
      ],
      "housekeeper": [
        {
          id: 5,
          name: "Riverside Gardens Estate",
          location: "Karen, Nairobi",
          avatar: "🏡",
          rating: 4.8,
          reviews: 89,
          salary: "KSH 35,000 - 48,000",
          type: "Part-time",
          description: "Premium residential estate looking for professional housekeepers. Multiple positions available.",
          requirements: ["Attention to detail", "Reliable and trustworthy", "Flexible schedule"],
          benefits: ["Competitive salary", "Transport allowance", "Staff meals", "Career growth"]
        },
        {
          id: 6,
          name: "Executive Towers",
          location: "Upper Hill, Nairobi",
          avatar: "🏢",
          rating: 4.6,
          reviews: 67,
          salary: "KSH 32,000 - 45,000",
          type: "Full-time",
          description: "High-end residential complex seeking dedicated housekeepers for luxury apartments. Professional environment.",
          requirements: ["Hotel housekeeping experience", "Professional appearance", "English proficiency"],
          benefits: ["Uniform provided", "Medical insurance", "Annual bonus", "Skills training"]
        }
      ]
    },
    "mombasa": {
      "caregiver": [
        {
          id: 7,
          name: "Coastal Care Center",
          location: "Nyali, Mombasa",
          avatar: "🏖️",
          rating: 4.7,
          reviews: 64,
          salary: "KSH 38,000 - 50,000",
          type: "Full-time",
          description: "Beachfront care facility seeking dedicated caregivers for elderly residents. Beautiful coastal environment.",
          requirements: ["Elderly care experience", "Swimming ability helpful", "Heat tolerance"],
          benefits: ["Beachfront location", "Health coverage", "Annual bonus", "Vacation time"]
        },
        {
          id: 8,
          name: "The Ahmed Family",
          location: "Diani, Mombasa",
          avatar: "👴",
          rating: 4.6,
          reviews: 87,
          salary: "KSH 35,000 - 48,000",
          type: "Live-in",
          description: "Caring family seeking live-in caregiver for elderly father. Peaceful beachside villa with modern facilities.",
          requirements: ["Experience with mobility assistance", "Medication management", "Compassionate nature"],
          benefits: ["Beachside accommodation", "Medical insurance", "Family atmosphere", "Paid holidays"]
        }
      ],
      "nanny": [
        {
          id: 9,
          name: "The Patel Residence",
          location: "Nyali, Mombasa",
          avatar: "🏖️",
          rating: 4.8,
          reviews: 134,
          salary: "KSH 40,000 - 55,000",
          type: "Full-time",
          description: "Beachfront family home seeking experienced nanny for two young children. Beautiful coastal location with pool.",
          requirements: ["Childcare experience", "Swimming ability required", "Educational activities"],
          benefits: ["Beachfront accommodation", "Health coverage", "Performance bonus", "Water sports training"]
        },
        {
          id: 10,
          name: "Little Waves Nursery",
          location: "Diani, Mombasa",
          avatar: "🌊",
          rating: 4.9,
          reviews: 156,
          salary: "KSH 36,000 - 50,000",
          type: "Part-time",
          description: "Coastal nursery school looking for qualified nannies. Focus on beach-based learning and water safety.",
          requirements: ["Early childhood education", "Water safety certification", "Creative teaching"],
          benefits: ["Beach location", "Professional development", "Flexible hours", "Skills training"]
        }
      ],
      "housekeeper": [
        {
          id: 11,
          name: "Ocean View Villa",
          location: "Diani, Mombasa",
          avatar: "🌊",
          rating: 4.9,
          reviews: 156,
          salary: "KSH 42,000 - 58,000",
          type: "Live-in",
          description: "Luxury beachfront villa requiring dedicated housekeeper. Excellent working conditions and benefits package.",
          requirements: ["Hotel/hospitality experience", "English proficiency", "Professional appearance"],
          benefits: ["Luxury accommodation", "Medical insurance", "Performance incentives", "Skills training"]
        },
        {
          id: 12,
          name: "Coral Beach Resort",
          location: "Nyali, Mombasa",
          avatar: "🏨",
          rating: 4.7,
          reviews: 203,
          salary: "KSH 38,000 - 52,000",
          type: "Full-time",
          description: "Premium beach resort seeking experienced housekeepers for guest villas. High standards required.",
          requirements: ["Resort housekeeping experience", "Attention to detail", "Team player"],
          benefits: ["Resort facilities access", "Staff meals", "Career advancement", "Training programs"]
        }
      ]
    },
    "kisumu": {
      "caregiver": [
        {
          id: 13,
          name: "Lakeside Family Home",
          location: "Milimani, Kisumu",
          avatar: "🏞️",
          rating: 4.6,
          reviews: 43,
          salary: "KSH 35,000 - 48,000",
          type: "Full-time",
          description: "Peaceful lakeside home seeking caring individual for elderly care. Serene environment with modern amenities.",
          requirements: ["Patience and compassion", "Basic medical knowledge", "Local language helpful"],
          benefits: ["Peaceful environment", "Health benefits", "Paid training", "Family atmosphere"]
        },
        {
          id: 14,
          name: "Sunset Care Home",
          location: "Mamboleo, Kisumu",
          avatar: "🌅",
          rating: 4.5,
          reviews: 67,
          salary: "KSH 32,000 - 45,000",
          type: "Part-time",
          description: "Community care home overlooking Lake Victoria. Seeking compassionate caregivers for elderly residents.",
          requirements: ["Elderly care experience", "Local language skills", "Physical fitness"],
          benefits: ["Lake view workplace", "Flexible schedule", "Community impact", "Skills development"]
        }
      ],
      "nanny": [
        {
          id: 15,
          name: "The Ochieng Family",
          location: "Milimani, Kisumu",
          avatar: "👨‍👩‍👧‍👦",
          rating: 4.7,
          reviews: 89,
          salary: "KSH 33,000 - 46,000",
          type: "Full-time",
          description: "Professional family with 3 children seeking dedicated nanny. Focus on educational development and outdoor activities.",
          requirements: ["Childcare experience", "Educational background", "Outdoor activity skills"],
          benefits: ["Health insurance", "Educational support", "Performance bonus", "Family trips"]
        },
        {
          id: 16,
          name: "Lakeside Learning Center",
          location: "Mamboleo, Kisumu",
          avatar: "📚",
          rating: 4.8,
          reviews: 124,
          salary: "KSH 30,000 - 42,000",
          type: "Part-time",
          description: "Educational center by the lake seeking qualified nannies. Emphasis on nature-based learning and local culture.",
          requirements: ["Early childhood education", "Cultural awareness", "Nature activity skills"],
          benefits: ["Beautiful location", "Professional growth", "Cultural exchange", "Flexible hours"]
        }
      ],
      "housekeeper": [
        {
          id: 17,
          name: "Green Gardens Residence",
          location: "Mamboleo, Kisumu",
          avatar: "🌿",
          rating: 4.8,
          reviews: 72,
          salary: "KSH 36,000 - 52,000",
          type: "Part-time",
          description: "Modern family home with beautiful gardens seeking professional housekeeper. Flexible working arrangements.",
          requirements: ["Housekeeping experience", "Garden maintenance skills", "Reliable transport"],
          benefits: ["Flexible hours", "Transport allowance", "Skill development", "Bonus payments"]
        },
        {
          id: 18,
          name: "Lake View Apartments",
          location: "Milimani, Kisumu",
          avatar: "🏠",
          rating: 4.6,
          reviews: 95,
          salary: "KSH 34,000 - 47,000",
          type: "Full-time",
          description: "Upscale apartment complex overlooking Lake Victoria. Seeking reliable housekeepers for resident services.",
          requirements: ["Apartment cleaning experience", "Professional demeanor", "Time management"],
          benefits: ["Lake view workplace", "Medical coverage", "Annual bonus", "Career growth"]
        }
      ]
    }
  };

  const loaderSteps = [
    { text: "Reviewing your application...", icon: "📋", duration: 2000 },
    { text: "Analyzing personal details...", icon: "👤", duration: 1500 },
    { text: "Checking education background...", icon: "🎓", duration: 1500 },
    { text: "Reviewing availability...", icon: "📅", duration: 1500 },
    { text: "Finding employers in your area...", icon: "🔍", duration: 2000 },
    { text: "Matching your profile...", icon: "✨", duration: 1500 }
  ];

  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
      <Card className="shadow-large border-0 bg-gradient-card backdrop-blur-sm animate-fade-in">
        <CardHeader className="text-center pb-6 sm:pb-8 px-4 sm:px-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-hero rounded-full flex items-center justify-center animate-pulse-glow">
            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Apply Now
          </CardTitle>
          <CardDescription className="text-muted-foreground text-base sm:text-lg">
            Start your rewarding career today
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <form onSubmit={handleQuickSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-semibold flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-border focus:ring-primary h-10 sm:h-12 text-sm sm:text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-semibold flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border-border focus:ring-primary h-10 sm:h-12 text-sm sm:text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground font-semibold flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0700 000 000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="border-border focus:ring-primary h-10 sm:h-12 text-sm sm:text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-foreground font-semibold">
                Position You're Applying For
              </Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger className="border-border focus:ring-primary h-10 sm:h-12 text-sm sm:text-lg">
                  <SelectValue placeholder="Choose your preferred position" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => {
                    const IconComponent = role.icon;
                    return (
                      <SelectItem key={role.value} value={role.value} className="py-3">
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-semibold">{role.label}</div>
                            <div className="text-sm text-muted-foreground">{role.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full mt-6 sm:mt-8 bg-gradient-cta hover:opacity-90 text-white font-bold py-3 sm:py-4 text-base sm:text-lg h-12 sm:h-14 transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Submitting Application...
                </>
              ) : (
                "Submit Application Now 🚀"
              )}
            </Button>
          </form>
          
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground px-2">
              ✅ Immediate consideration • ✅ Competitive salary • ✅ Flexible hours
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Multi-Step Detailed Application Dialog */}
      <Dialog open={showDetailedForm} onOpenChange={setShowDetailedForm}>
        <DialogContent className="max-w-2xl w-[95vw] max-h-[95vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Complete Your Application
            </DialogTitle>
            <DialogDescription className="text-center">
              Step {currentStep} of {totalSteps} - Let's get to know you better
            </DialogDescription>
          </DialogHeader>

          {/* Progress Bar */}
          <div className="mb-4 sm:mb-6">
            <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
            <div className="flex justify-between mt-2 text-xs sm:text-sm text-muted-foreground">
              <span className={`${currentStep >= 1 ? "text-primary font-semibold" : ""} truncate`}>Personal</span>
              <span className={`${currentStep >= 2 ? "text-primary font-semibold" : ""} truncate`}>Experience</span>
              <span className={`${currentStep >= 3 ? "text-primary font-semibold" : ""} truncate`}>Availability</span>
            </div>
          </div>

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">First Name *</Label>
                  <Input
                    id="firstName"
                    value={extendedFormData.firstName}
                    onChange={(e) => updateExtendedFormData("firstName", e.target.value)}
                    placeholder="Enter first name"
                    className="h-10 sm:h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={extendedFormData.lastName}
                    onChange={(e) => updateExtendedFormData("lastName", e.target.value)}
                    placeholder="Enter last name"
                    className="h-10 sm:h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={extendedFormData.email}
                    onChange={(e) => updateExtendedFormData("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className="h-10 sm:h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={extendedFormData.phone}
                    onChange={(e) => updateExtendedFormData("phone", e.target.value)}
                    placeholder="0700 000 000"
                    className="h-10 sm:h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="h-4 w-4" />
                    Date of Birth
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={extendedFormData.dateOfBirth}
                    onChange={(e) => updateExtendedFormData("dateOfBirth", e.target.value)}
                    className="h-10 sm:h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="h-4 w-4" />
                    City
                  </Label>
                  <Input
                    id="city"
                    value={extendedFormData.city}
                    onChange={(e) => updateExtendedFormData("city", e.target.value)}
                    placeholder="Your city"
                    className="h-10 sm:h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2 text-sm font-medium">
                  <Home className="h-4 w-4" />
                  Full Address
                </Label>
                <Textarea
                  id="address"
                  value={extendedFormData.address}
                  onChange={(e) => updateExtendedFormData("address", e.target.value)}
                  placeholder="Enter your complete address"
                  rows={2}
                  className="min-h-[60px] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact" className="text-sm font-medium">Emergency Contact Name</Label>
                  <Input
                    id="emergencyContact"
                    value={extendedFormData.emergencyContact}
                    onChange={(e) => updateExtendedFormData("emergencyContact", e.target.value)}
                    placeholder="Contact person name"
                    className="h-10 sm:h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone" className="text-sm font-medium">Emergency Contact Phone</Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    value={extendedFormData.emergencyPhone}
                    onChange={(e) => updateExtendedFormData("emergencyPhone", e.target.value)}
                    placeholder="0700 000 000"
                    className="h-10 sm:h-12"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Professional Experience */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5 text-primary" />
                Professional Experience
              </h3>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">Position Applying For *</Label>
                <Select value={extendedFormData.role} onValueChange={(value) => updateExtendedFormData("role", value)}>
                  <SelectTrigger className="h-10 sm:h-12">
                    <SelectValue placeholder="Choose your preferred position" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => {
                      const IconComponent = role.icon;
                      return (
                        <SelectItem key={role.value} value={role.value} className="py-2 sm:py-3">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <IconComponent className="h-4 w-4 text-primary flex-shrink-0" />
                            <div className="min-w-0">
                              <div className="font-semibold text-sm">{role.label}</div>
                              <div className="text-xs text-muted-foreground hidden sm:block">{role.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience" className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="h-4 w-4" />
                  Years of Experience *
                </Label>
                <Select value={extendedFormData.experience} onValueChange={(value) => updateExtendedFormData("experience", value)}>
                  <SelectTrigger className="h-10 sm:h-12">
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years (Entry Level)</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years (Expert)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="education" className="flex items-center gap-2 text-sm font-medium">
                  <GraduationCap className="h-4 w-4" />
                  Education Level
                </Label>
                <Select value={extendedFormData.education} onValueChange={(value) => updateExtendedFormData("education", value)}>
                  <SelectTrigger className="h-10 sm:h-12">
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary School</SelectItem>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="diploma">Diploma/Certificate</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="languages" className="flex items-center gap-2 text-sm font-medium">
                  <Languages className="h-4 w-4" />
                  Languages Spoken
                </Label>
                <Input
                  id="languages"
                  value={extendedFormData.languages}
                  onChange={(e) => updateExtendedFormData("languages", e.target.value)}
                  placeholder="e.g., English (Native), Swahili (Fluent)"
                  className="h-10 sm:h-12"
                />
              </div>

            </div>
          )}

          {/* Step 3: Availability & Preferences */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                Availability & Preferences
              </h3>

              <div className="space-y-2">
                <Label htmlFor="availability" className="text-sm font-medium">Availability *</Label>
                <Select value={extendedFormData.availability} onValueChange={(value) => updateExtendedFormData("availability", value)}>
                  <SelectTrigger className="h-10 sm:h-12">
                    <SelectValue placeholder="Select your availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time (40+ hours/week)</SelectItem>
                    <SelectItem value="part-time">Part-time (20-39 hours/week)</SelectItem>
                    <SelectItem value="flexible">Flexible hours</SelectItem>
                    <SelectItem value="weekends">Weekends only</SelectItem>
                    <SelectItem value="live-in">Live-in position</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm font-medium">Available Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={extendedFormData.startDate}
                  onChange={(e) => updateExtendedFormData("startDate", e.target.value)}
                  className="h-10 sm:h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workSchedule" className="text-sm font-medium">Preferred Work Schedule</Label>
                <Select value={extendedFormData.workSchedule} onValueChange={(value) => updateExtendedFormData("workSchedule", value)}>
                  <SelectTrigger className="h-10 sm:h-12">
                    <SelectValue placeholder="Select preferred schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning shift (6AM - 2PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon shift (2PM - 10PM)</SelectItem>
                    <SelectItem value="night">Night shift (10PM - 6AM)</SelectItem>
                    <SelectItem value="rotating">Rotating shifts</SelectItem>
                    <SelectItem value="flexible">Flexible schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transportation" className="text-sm font-medium">Transportation</Label>
                <Select value={extendedFormData.transportation} onValueChange={(value) => updateExtendedFormData("transportation", value)}>
                  <SelectTrigger className="h-10 sm:h-12">
                    <SelectValue placeholder="How will you commute to work?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="own-car">Own car</SelectItem>
                    <SelectItem value="public-transport">Public transport</SelectItem>
                    <SelectItem value="walking">Walking distance</SelectItem>
                    <SelectItem value="bicycle">Bicycle</SelectItem>
                    <SelectItem value="employer-transport">Need employer transport</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workLocation" className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="h-4 w-4" />
                  Preferred Work Location
                </Label>
                <Input
                  id="workLocation"
                  value={extendedFormData.workLocation}
                  onChange={(e) => updateExtendedFormData("workLocation", e.target.value)}
                  placeholder="e.g., Nairobi, Westlands, Karen"
                  className="h-10 sm:h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialRequirements" className="text-sm font-medium">Special Requirements or Accommodations</Label>
                <Textarea
                  id="specialRequirements"
                  value={extendedFormData.specialRequirements}
                  onChange={(e) => updateExtendedFormData("specialRequirements", e.target.value)}
                  placeholder="Any special needs, dietary restrictions, or accommodations required"
                  rows={2}
                  className="min-h-[60px] text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo" className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="h-4 w-4" />
                  Additional Information
                </Label>
                <Textarea
                  id="additionalInfo"
                  value={extendedFormData.additionalInfo}
                  onChange={(e) => updateExtendedFormData("additionalInfo", e.target.value)}
                  placeholder="Anything else you'd like us to know about you?"
                  rows={3}
                  className="min-h-[80px] text-sm"
                />
              </div>

              <div className="flex items-start space-x-3 p-3 sm:p-4 bg-muted rounded-lg">
                <input
                  type="checkbox"
                  id="backgroundCheck"
                  checked={extendedFormData.backgroundCheck}
                  onChange={(e) => updateExtendedFormData("backgroundCheck", e.target.checked)}
                  className="rounded mt-0.5 flex-shrink-0"
                />
                <Label htmlFor="backgroundCheck" className="flex items-start gap-2 text-xs sm:text-sm cursor-pointer">
                  <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>I consent to a background check and reference verification</span>
                </Label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 sm:pt-6 border-t gap-3 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 w-full sm:w-auto h-10 sm:h-11 order-2 sm:order-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Back</span>
            </Button>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground order-1 sm:order-2">
              Step {currentStep} of {totalSteps}
            </div>

            <Button
              type="button"
              onClick={currentStep === totalSteps ? handleDetailedSubmit : nextStep}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-gradient-cta hover:opacity-90 w-full sm:w-auto h-10 sm:h-11 order-3"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span className="hidden sm:inline">Submitting...</span>
                  <span className="sm:hidden">Sending...</span>
                </>
              ) : currentStep === totalSteps ? (
                <>
                  <span className="hidden sm:inline">Submit Application</span>
                  <span className="sm:hidden">Submit</span>
                  <CheckCircle className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Interactive Submission Loader */}
      <Dialog open={showLoader} onOpenChange={() => {}}>
        <DialogContent className="max-w-md w-[90vw] p-8 text-center border-0 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="space-y-6">
            <div className="relative">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                <div className="text-3xl animate-bounce">
                  {loaderSteps[loaderStep]?.icon}
                </div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-ping"></div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-800">
                Processing Your Application
              </h3>
              <p className="text-gray-600 font-medium animate-pulse">
                {loaderSteps[loaderStep]?.text}
              </p>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((loaderStep + 1) / loaderSteps.length) * 100}%` }}
              ></div>
            </div>

            <div className="flex justify-center space-x-1">
              {loaderSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index <= loaderStep ? 'bg-blue-500 scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Congratulations & Employer Matching Screen */}
      <Dialog open={showCongratulations} onOpenChange={setShowCongratulations}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto p-6 border-0 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="text-center space-y-6">
            {/* Celebration Header */}
            <div className="relative">
              <div className="text-6xl animate-bounce">🎉</div>
              <div className="absolute -inset-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-10 animate-pulse"></div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Congratulations!
              </h2>
              <p className="text-xl text-gray-700 font-semibold">
                We found {matchedEmployers.length} employers willing to hire you!
              </p>
              <p className="text-gray-600">
                Based on your location preference: <span className="font-semibold text-blue-600">{extendedFormData.workLocation || "Nairobi"}</span>
              </p>
            </div>

            {/* Employer Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {matchedEmployers.map((employer, index) => (
                <div
                  key={employer.id}
                  className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="p-6 space-y-4">
                    {/* Employer Header */}
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{employer.avatar}</div>
                      <div className="flex-1 text-left">
                        <h3 className="text-xl font-bold text-gray-800">{employer.name}</h3>
                        <p className="text-gray-600 flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {employer.location}
                        </p>
                      </div>
                    </div>

                    {/* Rating & Reviews */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(employer.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold">{employer.rating}</span>
                        <span className="text-sm text-gray-500">({employer.reviews} reviews)</span>
                      </div>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {employer.type}
                      </div>
                    </div>

                    {/* Salary */}
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center justify-center space-x-2">
                        <DollarSign className="h-5 w-5 text-blue-600" />
                        <span className="text-lg font-bold text-blue-800">{employer.salary}</span>
                      </div>
                      <p className="text-sm text-blue-600 text-center mt-1">Monthly Salary</p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {employer.description}
                    </p>

                    {/* Requirements */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Requirements
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {employer.requirements.slice(0, 2).map((req, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        Benefits
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {employer.benefits.slice(0, 3).map((benefit, i) => (
                          <span
                            key={i}
                            className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Book Appointment Button */}
                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                      onClick={() => handleBookAppointment(employer)}
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Book Appointment
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCongratulations(false);
                  setFormData({ name: "", email: "", phone: "", role: "" });
                  setExtendedFormData({
                    firstName: "", lastName: "", email: "", phone: "", dateOfBirth: "",
                    address: "", city: "", emergencyContact: "", emergencyPhone: "",
                    role: "", experience: "", education: "", certifications: "", languages: "",
                    previousEmployer: "", reasonForLeaving: "", references: "", skills: "",
                    availability: "", startDate: "", workSchedule: "", hourlyRate: "",
                    transportation: "", workLocation: "", specialRequirements: "", additionalInfo: "",
                    backgroundCheck: false
                  });
                  setCurrentStep(1);
                  setMatchedEmployers([]);
                }}
                className="px-6 py-3 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold rounded-xl"
              >
                Apply for More Positions
              </Button>
              <Button
                onClick={() => {
                  toast.success("🔔 You'll receive notifications about new job opportunities!");
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Bell className="h-5 w-5 mr-2" />
                Get Job Alerts
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Appointment Booking Form */}
      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogContent className="max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto p-4 sm:p-6 border-0 bg-gradient-to-br from-blue-50 to-purple-50">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Book Your Interview
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 text-sm sm:text-base">
              Schedule an appointment with {selectedEmployer?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6 mt-4">
            {/* Employer Info */}
            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="text-2xl sm:text-3xl">{selectedEmployer?.avatar}</div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-gray-800 text-sm sm:text-base truncate">{selectedEmployer?.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{selectedEmployer?.location}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="preferredDate" className="text-sm font-semibold text-gray-700">
                  Preferred Interview Date *
                </Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={bookingData.preferredDate}
                  onChange={(e) => setBookingData({ ...bookingData, preferredDate: e.target.value })}
                  className="h-10 sm:h-12 border-2 border-blue-200 focus:border-blue-500 text-sm sm:text-base"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredTime" className="text-sm font-semibold text-gray-700">
                  Preferred Time *
                </Label>
                <Select value={bookingData.preferredTime} onValueChange={(value) => setBookingData({ ...bookingData, preferredTime: value })}>
                  <SelectTrigger className="h-10 sm:h-12 border-2 border-blue-200 text-sm sm:text-base">
                    <SelectValue placeholder="Select your preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interviewType" className="text-sm font-semibold text-gray-700">
                  Interview Type *
                </Label>
                <Select value={bookingData.interviewType} onValueChange={(value) => setBookingData({ ...bookingData, interviewType: value })}>
                  <SelectTrigger className="h-10 sm:h-12 border-2 border-blue-200 text-sm sm:text-base">
                    <SelectValue placeholder="Choose interview format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">
                      <div className="flex items-center gap-2">
                        <div className="text-blue-600">💻</div>
                        <div>
                          <div className="font-semibold">Online Interview</div>
                          <div className="text-xs text-gray-500">Video call via Zoom/Google Meet</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="physical">
                      <div className="flex items-center gap-2">
                        <div className="text-green-600">🏢</div>
                        <div>
                          <div className="font-semibold">Physical Interview</div>
                          <div className="text-xs text-gray-500">In-person at employer location</div>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>

            {/* Submit Button */}
            <Button
              onClick={handleBookingSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
            >
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Confirm Appointment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Verification Required Prompt */}
      <Dialog open={showVerificationPrompt} onOpenChange={setShowVerificationPrompt}>
        <DialogContent className="max-w-md w-[95vw] max-h-[90vh] overflow-y-auto p-4 sm:p-6 border-0 bg-gradient-to-br from-red-50 to-orange-50">
          <div className="text-center space-y-4 sm:space-y-6">
            {/* Error Icon */}
            <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20">
              <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-ping"></div>
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-red-600">
                Verification Required
              </h3>
              <p className="text-gray-700 font-medium text-sm sm:text-base px-2">
                Could not book appointment. Kindly verify your account to complete the appointment booking.
              </p>
            </div>

            {/* Benefits Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border-2 border-green-200">
              <h4 className="font-bold text-base sm:text-lg text-gray-800 mb-3 sm:mb-4 flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                Verified Account Benefits
              </h4>
              <div className="space-y-2 sm:space-y-3 text-left">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    <span className="font-semibold text-green-600">Guaranteed Employment</span> - Priority consideration for all positions
                  </p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    <span className="font-semibold text-blue-600">Appointment Interview</span> - Direct interview scheduling with employers
                  </p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    <span className="font-semibold text-purple-600">Insurance Cover</span> - Comprehensive health and work insurance
                  </p>
                </div>
              </div>
            </div>

            {/* Verify Button */}
            <Button
              onClick={handleProceedToVerify}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
            >
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Verify Account Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Screen */}
      <Dialog open={showPaymentScreen} onOpenChange={setShowPaymentScreen}>
        <DialogContent className="max-w-md w-[95vw] max-h-[90vh] overflow-y-auto p-4 sm:p-6 border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="text-center space-y-4 sm:space-y-6">
            {/* Success Icon */}
            <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24">
              <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-white animate-bounce" />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Lifetime Verification
              </h3>
              <p className="text-gray-600 text-sm sm:text-base px-2">
                One-time payment for permanent account verification
              </p>
            </div>

            {/* Price Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-2xl border-2 border-green-200">
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-500 mb-2">Processing Fee</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-4xl sm:text-5xl font-bold text-green-600">KSH 120</span>
                </div>
                <p className="text-xs sm:text-sm text-green-600 font-semibold mt-2">✓ Lifetime Access</p>
              </div>

              {/* What's Included */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 space-y-2 sm:space-y-3">
                <p className="font-semibold text-gray-800 text-xs sm:text-sm">What's Included:</p>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Guaranteed employment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Verified badge on profile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Priority job matching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Direct employer contact</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Insurance coverage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>24/7 support access</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Proceed Button */}
            <Button
              onClick={handleProceedToPayment}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
            >
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Proceed to Verify
            </Button>

            <p className="text-xs text-gray-500 px-2">
              🔒 Secure payment • Money-back guarantee
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Phone Verification & Payment */}
      <Dialog open={showPhoneVerification} onOpenChange={setShowPhoneVerification}>
        <DialogContent className="max-w-md w-[95vw] max-h-[90vh] overflow-y-auto p-4 sm:p-6 border-0 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="text-center space-y-4 sm:space-y-6">
            {/* Phone Icon */}
            <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20">
              <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Phone className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                Complete Verification
              </h3>
              <p className="text-gray-600 text-sm sm:text-base px-2">
                Enter your M-Pesa number to complete payment and book your interview
              </p>
            </div>

            {/* Phone Input */}
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                <Label htmlFor="verificationPhone" className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                  M-Pesa Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <Input
                    id="verificationPhone"
                    type="tel"
                    value={verificationPhone}
                    onChange={(e) => setVerificationPhone(e.target.value)}
                    placeholder="0700 000 000"
                    className="h-12 sm:h-14 pl-10 sm:pl-12 text-base sm:text-lg border-2 border-blue-200 focus:border-blue-500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  You'll receive an M-Pesa prompt to complete payment
                </p>
              </div>
            </div>

            {/* Error Message */}
            {paymentError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4">
                <p className="text-red-600 text-xs sm:text-sm text-center">{paymentError}</p>
              </div>
            )}

            {/* Complete Button */}
            <Button
              onClick={handleCompleteVerification}
              disabled={!verificationPhone || isProcessingPayment}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isProcessingPayment ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="hidden sm:inline">Complete Verification & Book Interview</span>
                  <span className="sm:hidden">Complete & Book Interview</span>
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Secure payment via M-Pesa</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Success Screen */}
      <Dialog open={showPaymentSuccess} onOpenChange={setShowPaymentSuccess}>
        <DialogContent className="max-w-md w-[95vw] max-h-[90vh] overflow-y-auto p-4 sm:p-6 border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="text-center space-y-4 sm:space-y-6">
            {/* Success Animation */}
            <div className="relative mx-auto w-24 h-24 sm:w-32 sm:h-32">
              <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-ping"></div>
              <div className="absolute inset-2 bg-green-500 rounded-full opacity-30 animate-pulse"></div>
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-white animate-bounce" />
              </div>
            </div>

            {/* Success Message */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                🎉 Congratulations!
              </h3>
              <div className="space-y-2">
                <p className="text-lg sm:text-xl font-semibold text-gray-800">
                  Payment Successful!
                </p>
                <p className="text-sm sm:text-base text-gray-600 px-2">
                  Your application has been completed and your interview has been scheduled.
                </p>
              </div>
            </div>

            {/* Success Details */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-green-200">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-gray-800">
                    Application Verified
                  </span>
                </div>
                
                <div className="flex items-center justify-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-gray-800">
                    Interview Scheduled
                  </span>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Bell className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-gray-800">
                    Notifications Enabled
                  </span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-6 border border-blue-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">What's Next?</h4>
              <div className="space-y-2 text-sm sm:text-base text-gray-600 text-left">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">1.</span>
                  <span>Check your email for interview details</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">2.</span>
                  <span>Prepare your documents and references</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">3.</span>
                  <span>We'll contact you within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <Button
              onClick={() => {
                setShowPaymentSuccess(false);
                setShowCongratulations(true);
                // Reset form states
                setVerificationPhone("");
                setPaymentError("");
                setPaymentStatus('idle');
              }}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
            >
              <Star className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Continue to Dashboard
            </Button>

            <p className="text-xs text-gray-500 px-2">
              🎉 Welcome to Kingdom Nannies! Your journey starts now.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationForm;