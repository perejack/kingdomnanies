import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

const TestimonialCard = ({ name, role, content, rating, image }: TestimonialProps) => {
  return (
    <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-medium hover:shadow-large transition-all duration-300 animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          {image ? (
            <img 
              src={image} 
              alt={name}
              className="w-12 h-12 rounded-full object-cover border-2 border-kenya-gold/30 shadow-lg"
              onError={(e) => {
                // Fallback to initials if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center text-white font-bold ${image ? 'hidden' : ''}`}>
            {name.charAt(0)}
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{name}</h4>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
        
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < rating ? 'fill-kenya-gold text-kenya-gold' : 'text-gray-300'}`} 
            />
          ))}
        </div>
        
        <p className="text-foreground leading-relaxed italic">"{content}"</p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;