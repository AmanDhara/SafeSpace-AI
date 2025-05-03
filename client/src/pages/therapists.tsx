import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Therapists() {
  const therapists = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Clinical Psychologist",
      languages: ["English", "Hindi"],
      experience: "12 years",
      bio: "Specializes in anxiety, depression, and cognitive behavioral therapy (CBT). Helps clients develop coping mechanisms for everyday stressors.",
      availability: "Mon, Wed, Fri",
    },
    {
      id: 2,
      name: "Dr. Rajesh Patel",
      specialization: "Psychiatrist",
      languages: ["English", "Hindi", "Marathi"],
      experience: "15 years",
      bio: "Expert in mood disorders, PTSD, and medication management. Combines medical treatment with holistic wellness approaches.",
      availability: "Tue, Thu, Sat",
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      specialization: "Family Therapist",
      languages: ["English", "Hindi", "Telugu"],
      experience: "8 years",
      bio: "Focuses on relationship counseling, family dynamics, and interpersonal conflicts. Creates safe spaces for open dialogue.",
      availability: "Mon, Tue, Thu",
    },
    {
      id: 4,
      name: "Dr. Karthik Rao",
      specialization: "Behavioral Therapist",
      languages: ["English", "Kannada", "Tamil"],
      experience: "10 years",
      bio: "Helps patients overcome behavioral challenges through personalized intervention strategies and evidence-based techniques.",
      availability: "Wed, Fri, Sat",
    },
    {
      id: 5,
      name: "Dr. Ananya Desai",
      specialization: "Counselor",
      languages: ["English", "Tamil", "Telugu"],
      experience: "7 years",
      bio: "Specializes in grief counseling, life transitions, and personal growth. Creates supportive environment for emotional healing.",
      availability: "Tue, Thu, Sat",
    },
    {
      id: 6,
      name: "Dr. Vikram Reddy",
      specialization: "Addiction Specialist",
      languages: ["English", "Telugu", "Hindi"],
      experience: "11 years",
      bio: "Expert in substance abuse recovery, behavioral addictions, and relapse prevention. Provides compassionate and non-judgmental care.",
      availability: "Mon, Wed, Fri",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Connect with Therapists</h1>
        <p className="text-gray-600">
          Find qualified mental health professionals who speak your language and understand your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {therapists.map((therapist) => (
          <Card key={therapist.id} className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>{therapist.name}</CardTitle>
              <CardDescription>{therapist.specialization} • {therapist.experience} experience</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600 mb-4">{therapist.bio}</p>
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Speaks:</p>
                <div className="flex flex-wrap gap-2">
                  {therapist.languages.map((language) => (
                    <Badge key={language} variant="outline">{language}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Available on:</p>
                <p className="text-sm text-gray-600">{therapist.availability}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Schedule Consultation</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold mb-2">Need help choosing a therapist?</h2>
        <p className="text-gray-600 mb-4">
          Our AI assistant can recommend the right therapist based on your specific needs and preferences.
        </p>
        <Button>Get Personalized Recommendations</Button>
      </div>
    </div>
  );
}