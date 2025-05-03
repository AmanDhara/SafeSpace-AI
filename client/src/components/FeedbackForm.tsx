import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ThumbsUp, ThumbsDown, X, MessageSquare } from "lucide-react";
import { useLanguage } from '@/hooks/use-language';
import { useToast } from '@/hooks/use-toast';

interface FeedbackFormProps {
  messageId?: string;
  responseContent: string;
  onClose: () => void;
}

// Feedback ratings
type FeedbackRating = 'helpful' | 'not-helpful';

export default function FeedbackForm({ messageId, responseContent, onClose }: FeedbackFormProps) {
  const [rating, setRating] = useState<FeedbackRating | null>(null);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { t, currentLanguage } = useLanguage();
  const { toast } = useToast();

  // Translations for feedback form
  const translations = {
    title: {
      en: "How was this response?",
      hi: "यह प्रतिक्रिया कैसी थी?",
      mr: "ही प्रतिक्रिया कशी होती?",
      ta: "இந்த பதில் எப்படி இருந்தது?",
      te: "ఈ ప్రతిస్పందన ఎలా ఉంది?",
      kn: "ಈ ಪ್ರತಿಕ್ರಿಯೆ ಹೇಗಿತ್ತು?"
    },
    description: {
      en: "Your feedback helps us improve responses",
      hi: "आपकी प्रतिक्रिया हमें उत्तरों को बेहतर बनाने में मदद करती है",
      mr: "तुमचा अभिप्राय आम्हाला प्रतिसाद सुधारण्यात मदत करतो",
      ta: "உங்கள் கருத்து பதில்களை மேம்படுத்த உதவுகிறது",
      te: "మీ అభిప్రాయం ప్రతిస్పందనలను మెరుగుపరచడానికి సహాయపడుతుంది",
      kn: "ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಸುಧಾರಿಸಲು ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆ ನಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ"
    },
    helpful: {
      en: "Helpful",
      hi: "सहायक",
      mr: "उपयुक्त",
      ta: "பயனுள்ளதாக",
      te: "సహాయకరమైనది",
      kn: "ಸಹಾಯಕ"
    },
    notHelpful: {
      en: "Not Helpful",
      hi: "सहायक नहीं",
      mr: "उपयुक्त नाही",
      ta: "பயனுள்ளதாக இல்லை",
      te: "సహాయకరం కాదు",
      kn: "ಸಹಾಯಕವಲ್ಲ"
    },
    additionalFeedback: {
      en: "Additional feedback (optional)",
      hi: "अतिरिक्त प्रतिक्रिया (वैकल्पिक)",
      mr: "अतिरिक्त अभिप्राय (ऐच्छिक)",
      ta: "கூடுதல் கருத்து (விருப்பம்)",
      te: "అదనపు అభిప్రాయం (ఐచ్ఛికం)",
      kn: "ಹೆಚ್ಚುವರಿ ಪ್ರತಿಕ್ರಿಯೆ (ಐಚ್ಛಿಕ)"
    },
    commentPlaceholder: {
      en: "What would make this response better? (Optional)",
      hi: "इस प्रतिक्रिया को बेहतर क्या बना सकता है? (वैकल्पिक)",
      mr: "हा प्रतिसाद अधिक चांगला काय बनवू शकेल? (ऐच्छिक)",
      ta: "இந்த பதிலை சிறப்பாக்க என்ன செய்யலாம்? (விருப்பம்)",
      te: "ఈ ప్రతిస్పందనను మెరుగుపరచడానికి ఏమి చేయవచ్చు? (ఐచ్ఛికం)",
      kn: "ಈ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಉತ್ತಮಗೊಳಿಸಲು ಏನು ಮಾಡಬಹುದು? (ಐಚ್ಛಿಕ)"
    },
    submitButton: {
      en: "Submit Feedback",
      hi: "प्रतिक्रिया भेजें",
      mr: "अभिप्राय पाठवा",
      ta: "கருத்தை சமர்ப்பிக்கவும்",
      te: "అభిప్రాయాన్ని సమర్పించండి",
      kn: "ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಸಲ್ಲಿಸಿ"
    },
    submitting: {
      en: "Submitting...",
      hi: "भेज रहे हैं...",
      mr: "पाठवत आहे...",
      ta: "சமர்ப்பிக்கிறது...",
      te: "సమర్పిస్తోంది...",
      kn: "ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ..."
    },
    thankYou: {
      en: "Thank you for your feedback!",
      hi: "आपकी प्रतिक्रिया के लिए धन्यवाद!",
      mr: "तुमच्या अभिप्रायासाठी धन्यवाद!",
      ta: "உங்கள் கருத்துக்கு நன்றி!",
      te: "మీ అభిప్రాయానికి ధన్యవాదాలు!",
      kn: "ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಗೆ ಧನ್ಯವಾದಗಳು!"
    },
    error: {
      en: "There was an error submitting your feedback",
      hi: "आपकी प्रतिक्रिया भेजने में त्रुटि हुई",
      mr: "तुमचा अभिप्राय पाठवताना त्रुटी आली",
      ta: "உங்கள் கருத்தை சமர்ப்பிப்பதில் பிழை ஏற்பட்டது",
      te: "మీ అభిప్రాయాన్ని సమర్పించడంలో లోపం ఉంది",
      kn: "ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಸಲ್ಲಿಸುವಲ್ಲಿ ದೋಷ ಉಂಟಾಗಿದೆ"
    }
  }

  const getTranslation = (key: keyof typeof translations) => {
    const languageKey = currentLanguage as keyof typeof translations.title;
    return translations[key][languageKey] || translations[key].en;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating) return;
    
    setSubmitting(true);
    
    try {
      // Send feedback to server
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageId,
          rating,
          comment,
          responseContent,
          language: currentLanguage
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }
      
      toast({
        title: getTranslation('thankYou'),
        duration: 3000,
      });
      
      onClose();
    } catch (err) {
      toast({
        title: getTranslation('error'),
        variant: 'destructive',
        duration: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="relative pb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute right-2 top-2"
        >
          <X className="h-4 w-4" />
        </Button>
        <CardTitle className="text-xl">{getTranslation('title')}</CardTitle>
        <CardDescription>{getTranslation('description')}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <RadioGroup
            value={rating || ''}
            onValueChange={(value) => setRating(value as FeedbackRating)}
            className="flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="helpful" id="helpful" />
              <Label htmlFor="helpful" className="flex items-center space-x-2 cursor-pointer">
                <ThumbsUp className="h-5 w-5 text-green-500" />
                <span>{getTranslation('helpful')}</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="not-helpful" id="not-helpful" />
              <Label htmlFor="not-helpful" className="flex items-center space-x-2 cursor-pointer">
                <ThumbsDown className="h-5 w-5 text-red-500" />
                <span>{getTranslation('notHelpful')}</span>
              </Label>
            </div>
          </RadioGroup>
          
          <div>
            <Label htmlFor="comment" className="text-sm text-gray-500 mb-1 block">
              {getTranslation('additionalFeedback')}
            </Label>
            <Textarea
              id="comment"
              placeholder={getTranslation('commentPlaceholder')}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!rating || submitting}
          >
            {submitting ? getTranslation('submitting') : getTranslation('submitButton')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}