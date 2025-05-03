import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  PhoneCall, 
  Mail, 
  MessageCircle, 
  HelpCircle, 
  BookOpen,
  Clock
} from "lucide-react";

export default function HelpContact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "Thank you for your message. We'll get back to you soon.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Help & Contact</h1>
        <p className="text-gray-600">
          Need assistance? We're here to help. Find answers to common questions or reach out to our support team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your email" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help you?" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your issue or question in detail..."
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" className="w-full md:w-auto">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Reach out to us directly through these channels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <PhoneCall className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium">Phone Support</h3>
                  <p className="text-sm text-gray-600">+1 (800) 123-4567</p>
                  <p className="text-xs text-gray-500">Mon-Fri, 9AM-6PM</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium">Email</h3>
                  <p className="text-sm text-gray-600">support@mindfulai.com</p>
                  <p className="text-xs text-gray-500">We reply within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start">
                <MessageCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium">Live Chat</h3>
                  <p className="text-sm text-gray-600">Available on our website</p>
                  <p className="text-xs text-gray-500">24/7 support</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start">
                  <HelpCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                  <h3 className="text-sm font-medium">Is my data secure?</h3>
                </div>
                <p className="text-sm text-gray-600 pl-6">
                  Yes, we use industry-standard encryption and privacy practices to protect your data.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-start">
                  <BookOpen className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                  <h3 className="text-sm font-medium">How do I get started?</h3>
                </div>
                <p className="text-sm text-gray-600 pl-6">
                  Simply create an account and start a conversation with our AI assistant.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-start">
                  <Clock className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                  <h3 className="text-sm font-medium">What are the service hours?</h3>
                </div>
                <p className="text-sm text-gray-600 pl-6">
                  Our AI assistant is available 24/7, while human support operates during business hours.
                </p>
              </div>
              <Button variant="link" className="pl-0">
                View all FAQs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}