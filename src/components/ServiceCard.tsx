import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  image: string;
  salary: string;
  onApply?: () => void;
}

const ServiceCard = ({ icon: Icon, title, description, benefits, image, salary, onApply }: ServiceCardProps) => {
  return (
    <Card className="group border-0 bg-gradient-card backdrop-blur-sm shadow-medium hover:shadow-large transition-all duration-500 hover:-translate-y-2 animate-fade-in overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-kenya-gold text-foreground font-bold">{salary}</Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
        </div>
        
        <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
        
        <div className="space-y-2 mb-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-foreground">
              <div className="w-1.5 h-1.5 bg-kenya-green rounded-full"></div>
              {benefit}
            </div>
          ))}
        </div>
        
        <Button 
          onClick={onApply}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Apply for {title} Role
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;