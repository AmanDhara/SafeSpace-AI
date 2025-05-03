import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Star, StarHalf } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import BookingModal from "@/components/BookingModal";
import { Link } from "wouter";

export default function Therapists() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [specialization, setSpecialization] = useState("all");
  const [selectedTherapist, setSelectedTherapist] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Enhanced therapist data with ratings, specialties, profile images, and short descriptions
  const therapists = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Clinical Psychologist",
      specialties: ["anxiety", "depression", "stress"],
      shortDescription: "Specializes in anxiety, depression, and stress management with 12+ years of experience.",
      languages: ["English", "Hindi"],
      experience: "12 years",
      bio: "Specializes in anxiety, depression, and stress management. Helps clients develop coping mechanisms for everyday stressors.",
      availability: "Mon, Wed, Fri",
      rating: 4.8,
      reviews: 48,
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "Dr. Michael Patel",
      specialization: "Psychiatrist",
      specialties: ["trauma", "ptsd", "anxiety"],
      shortDescription: "Focuses on trauma recovery, PTSD, and holistic mental wellbeing approaches.",
      languages: ["English", "Hindi", "Marathi"],
      experience: "15 years",
      bio: "Expert in mood disorders, PTSD, and medication management. Combines medical treatment with holistic wellness approaches.",
      availability: "Tue, Thu, Sat",
      rating: 4.9,
      reviews: 52,
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Dr. Rebecca Chen",
      specialization: "Relationship Counselor",
      specialties: ["relationships", "family", "communication"],
      shortDescription: "Expert in relationship dynamics, family therapy, and interpersonal conflicts.",
      languages: ["English", "Mandarin", "Cantonese"],
      experience: "9 years",
      bio: "Focuses on relationship counseling, family dynamics, and interpersonal conflicts. Creates safe spaces for open dialogue.",
      availability: "Mon, Tue, Thu",
      rating: 4.7,
      reviews: 41,
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialization: "Cognitive Behavioral Therapist",
      specialties: ["cbt", "anxiety", "habits"],
      shortDescription: "Specializes in CBT, anxiety disorders, and behavioral pattern changes.",
      languages: ["English", "Spanish"],
      experience: "10 years",
      bio: "Helps patients overcome behavioral challenges through personalized CBT strategies and evidence-based techniques.",
      availability: "Wed, Fri, Sat",
      rating: 4.6,
      reviews: 36,
      image: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    {
      id: 5,
      name: "Dr. Priya Sharma",
      specialization: "Grief Counselor",
      specialties: ["grief", "loss", "trauma"],
      shortDescription: "Specializes in grief counseling, trauma processing, and emotional healing.",
      languages: ["English", "Hindi", "Telugu"],
      experience: "7 years",
      bio: "Specializes in grief counseling, life transitions, and personal growth. Creates supportive environment for emotional healing.",
      availability: "Tue, Thu, Sat",
      rating: 4.9,
      reviews: 29,
      image: "https://randomuser.me/api/portraits/women/39.jpg"
    },
    {
      id: 6,
      name: "Dr. David Martinez",
      specialization: "Addiction Specialist",
      specialties: ["addiction", "recovery", "substance-abuse"],
      shortDescription: "Expert in addiction recovery, relapse prevention, and emotional wellbeing.",
      languages: ["English", "Spanish"],
      experience: "11 years",
      bio: "Expert in substance abuse recovery, behavioral addictions, and relapse prevention. Provides compassionate and non-judgmental care.",
      availability: "Mon, Wed, Fri",
      rating: 4.7,
      reviews: 37,
      image: "https://randomuser.me/api/portraits/men/4.jpg"
    },
  ];

  // Create list of unique specializations for filter
  const uniqueSpecializations = Array.from(new Set(therapists.map(t => t.specialization)));
  const specializations = ["All Specializations", ...uniqueSpecializations];

  // Filter therapists based on selected specialization
  const filteredTherapists = specialization === "all" 
    ? therapists 
    : therapists.filter(t => t.specialization === specialization);

  // Generate star rating display
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const stars = [];
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    return (
      <div className="flex items-center">
        <div className="flex mr-1">{stars}</div>
        <span className="text-sm text-gray-600">({rating.toFixed(1)})</span>
      </div>
    );
  };

  const handleBookSession = (therapist: any) => {
    setSelectedTherapist(therapist);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTherapist(null);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t("therapistsTitle")}</h1>
          <p className="text-gray-600 mb-6">
            {t("therapistsSubtitle")}
          </p>
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {/* Filter section */}
            <div>
              <div className="mb-2 font-medium">{t("filterBySpecialization")}</div>
              <Select 
                onValueChange={(value) => setSpecialization(value)} 
                defaultValue="all"
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder={t("allSpecializations")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allSpecializations")}</SelectItem>
                  {specializations.slice(1).map((spec) => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* View appointments button */}
            <Link href="/appointments">
              <Button variant="outline" className="bg-white">
                {t("viewYourAppointments")}
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTherapists.map((therapist) => (
            <Card key={therapist.id} className="overflow-hidden">
              <div className="p-5">
                <div className="flex items-start gap-4 mb-3">
                  {/* Therapist image */}
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={therapist.image} 
                      alt={therapist.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Therapist details */}
                  <div>
                    <h3 className="font-semibold text-blue-600">{therapist.name}</h3>
                    <p className="text-sm text-gray-600">{therapist.specialization}</p>
                    <div className="mt-1 mb-1">
                      {renderRating(therapist.rating)}
                    </div>
                    <div className="text-xs text-gray-500">({therapist.reviews} {t("reviewsCount")})</div>
                  </div>
                </div>
                
                <CardContent className="p-0">
                  <p className="text-sm text-gray-700 mb-3">{therapist.shortDescription}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {therapist.specialties.map(specialty => (
                      <Badge 
                        key={specialty} 
                        variant="outline" 
                        className="text-xs bg-gray-100"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </div>
              
              <CardFooter className="p-0">
                <Button 
                  className="w-full rounded-t-none bg-blue-500 hover:bg-blue-600"
                  onClick={() => handleBookSession(therapist)}
                >
                  {t("bookSession")}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-2">{t("therapistHelp")}</h2>
          <p className="text-gray-600 mb-4">
            {t("therapistHelpDesc")}
          </p>
          <Button variant="outline" className="bg-white">
            {t("getRecommendations")}
          </Button>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedTherapist && (
        <BookingModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          therapist={selectedTherapist}
        />
      )}
    </>
  );
}