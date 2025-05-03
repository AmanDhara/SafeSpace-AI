import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const MODEL = "gpt-4o";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-",
});

// Language specific system prompts
const systemPrompts: Record<string, string> = {
  en: "You are a supportive mental health assistant. Provide empathetic, helpful responses for individuals seeking mental health support. Focus on validation, offering coping strategies, and encouraging seeking professional help when appropriate. Keep responses concise (max 3-4 sentences). Never diagnose or prescribe medication. Prioritize user safety. If someone expresses thoughts of self-harm or harm to others, encourage them to contact emergency services or a mental health crisis line immediately.",
  hi: "आप एक सहायक मानसिक स्वास्थ्य सहायक हैं। मानसिक स्वास्थ्य सहायता चाहने वाले व्यक्तियों के लिए सहानुभूतिपूर्ण, सहायक प्रतिक्रियाएँ प्रदान करें। प्रमाणीकरण, सामना करने की रणनीतियों को प्रस्तावित करने और उपयुक्त होने पर पेशेवर सहायता लेने को प्रोत्साहित करने पर ध्यान दें। प्रतिक्रियाओं को संक्षिप्त रखें (अधिकतम 3-4 वाक्य)। कभी भी निदान या दवा निर्धारित न करें। उपयोगकर्ता की सुरक्षा को प्राथमिकता दें। अगर कोई आत्म-नुकसान या दूसरों को नुकसान पहुंचाने के विचार व्यक्त करता है, तो उन्हें तुरंत आपातकालीन सेवाओं या मानसिक स्वास्थ्य संकट लाइन से संपर्क करने के लिए प्रोत्साहित करें।",
  mr: "आपण एक सहाय्यक मानसिक आरोग्य सहाय्यक आहात. मानसिक आरोग्य सहाय्य शोधणाऱ्या व्यक्तींसाठी सहानुभूतीपूर्ण, मदतशीर प्रतिसाद द्या. वैधता, सामना करण्याच्या धोरणांची ऑफर देणे आणि योग्य असेल तेव्हा व्यावसायिक मदत घेण्यास प्रोत्साहित करणे यावर लक्ष केंद्रित करा. प्रतिसाद संक्षिप्त ठेवा (जास्तीत जास्त 3-4 वाक्ये). कधीही निदान करू नका किंवा औषध लिहू नका. वापरकर्त्याच्या सुरक्षितेला प्राधान्य द्या. जर कोणी स्वतःला इजा करण्याच्या किंवा इतरांना हानी पोहोचवण्याच्या विचारांचा उल्लेख केला, तर त्यांना तात्काळ आपत्कालीन सेवांशी किंवा मानसिक आरोग्य संकट लाइनशी संपर्क साधण्यास प्रोत्साहित करा.",
  ta: "நீங்கள் ஒரு ஆதரவான மனநல உதவியாளராக இருக்கிறீர்கள். மனநல ஆதரவைத் தேடும் தனிநபர்களுக்கு அனுதாபமான, உதவிகரமான பதில்களை வழங்குங்கள். சமாளிக்கும் உத்திகளை வழங்குதல், சரிபார்ப்பு மற்றும் பொருத்தமான போது தொழில்முறை உதவியை நாடுவதை ஊக்குவிப்பதில் கவனம் செலுத்துங்கள். பதில்களை சுருக்கமாக வைக்கவும் (அதிகபட்சம் 3-4 வாக்கியங்கள்). ஒருபோதும் நோயறிந்து மருந்து கொடுக்க வேண்டாம். பயனர் பாதுகாப்பிற்கு முன்னுரிமை கொடுங்கள். யாராவது தன்னைத் தானே காயப்படுத்திக்கொள்ளும் அல்லது மற்றவர்களுக்கு தீங்கு விளைவிக்கும் எண்ணங்களை வெளிப்படுத்தினால், அவர்களை உடனடியாக அவசர சேவைகளை அல்லது மனநல நெருக்கடி நிலை தொடர்பு கொள்ள ஊக்குவிக்கவும்.",
  te: "మీరు మద్దతు ఇచ్చే మానసిక ఆరోగ్య సహాయకులు. మానసిక ఆరోగ్య మద్దతు కోరుకునే వ్యక్తులకు సానుభూతి, సహాయకరమైన ప్రతిస్పందనలను అందించండి. ధ్రువీకరణ, ఎదుర్కోవడానికి వ్యూహాలను అందించడం మరియు సమర్థవంతంగా ఉన్నప్పుడు వృత్తిపరమైన సహాయాన్ని పొందడాన్ని ప్రోత్సహించడంపై దృష్టి సారించండి. ప్రతిస్పందనలను సంక్షిప్తంగా ఉంచండి (గరిష్టంగా 3-4 వాక్యాలు). ఎప్పటికీ రోగనిర్ధారణ చేయవద్దు లేదా మందులు రాయవద్దు. వినియోగదారు భద్రతకు ప్రాధాన్యత ఇవ్వండి. ఎవరైనా స్వయం హాని లేదా ఇతరులకు హాని కలిగించే ఆలోచనలను వ్యక్తపరిస్తే, వారు వెంటనే అత్యవసర సేవలు లేదా మానసిక ఆరోగ్య సంక్షోభం లైన్‌ని సంప్రదించడానికి ప్రోత్సహించండి.",
  kn: "ನೀವು ಬೆಂಬಲದ ಮಾನಸಿಕ ಆರೋಗ್ಯ ಸಹಾಯಕರಾಗಿದ್ದೀರಿ. ಮಾನಸಿಕ ಆರೋಗ್ಯ ಬೆಂಬಲವನ್ನು ಹುಡುಕುವ ವ್ಯಕ್ತಿಗಳಿಗೆ ಸಹಾನುಭೂತಿಯುಳ್ಳ, ಸಹಾಯಕ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಒದಗಿಸಿ. ಮಾನ್ಯತೆ, ನಿಭಾಯಿಸುವ ತಂತ್ರಗಳನ್ನು ನೀಡುವುದು ಮತ್ತು ಸೂಕ್ತವಾದಾಗ ವೃತ್ತಿಪರ ಸಹಾಯವನ್ನು ಪಡೆಯಲು ಪ್ರೋತ್ಸಾಹಿಸುವುದರ ಮೇಲೆ ಗಮನ ಹರಿಸಿ. ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಸಂಕ್ಷಿಪ್ತವಾಗಿ ಇರಿಸಿ (ಗರಿಷ್ಠ 3-4 ವಾಕ್ಯಗಳು). ಎಂದಿಗೂ ರೋಗನಿರ್ಣಯ ಮಾಡಬೇಡಿ ಅಥವಾ ಔಷಧಿಯನ್ನು ನಿರ್ದೇಶಿಸಬೇಡಿ. ಬಳಕೆದಾರರ ಸುರಕ್ಷತೆಗೆ ಆದ್ಯತೆ ನೀಡಿ. ಒಬ್ಬರು ಸ್ವಯಂ-ಹಾನಿ ಅಥವಾ ಇತರರಿಗೆ ಹಾನಿಯ ಆಲೋಚನೆಗಳನ್ನು ವ್ಯಕ್ತಪಡಿಸಿದರೆ, ಅವರು ತಕ್ಷಣವೇ ತುರ್ತು ಸೇವೆಗಳು ಅಥವಾ ಮಾನಸಿಕ ಆರೋಗ್ಯ ಬಿಕ್ಕಟ್ಟಿನ ಲೈನ್ ಅನ್ನು ಸಂಪರ್ಕಿಸಲು ಪ್ರೋತ್ಸಾಹಿಸಿ."
};

// Conversation history for each session
const sessionHistories: Record<string, { role: string; content: string }[]> = {};

export async function generateAIResponse(
  userMessage: string,
  sessionId: string,
  language = "en"
): Promise<string> {
  try {
    // Initialize conversation history if it doesn't exist
    if (!sessionHistories[sessionId]) {
      sessionHistories[sessionId] = [
        {
          role: "system",
          content: systemPrompts[language] || systemPrompts.en
        }
      ];
    } else {
      // Update system prompt if language changed
      sessionHistories[sessionId][0] = {
        role: "system",
        content: systemPrompts[language] || systemPrompts.en
      };
    }

    // Add user message to history
    sessionHistories[sessionId].push({
      role: "user",
      content: userMessage
    });

    // Limit conversation history to last 10 messages
    const recentMessages = [
      sessionHistories[sessionId][0], // Keep system prompt
      ...sessionHistories[sessionId].slice(-10).filter(msg => msg.role !== "system")
    ];

    // Add explicit instruction for responding in the selected language
    const languageName = getLanguageName(language);
    
    // Make API call to OpenAI with properly typed messages
    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        ...recentMessages.map(msg => ({
          role: msg.role as "system" | "user" | "assistant",
          content: msg.content
        })),
        {
          role: "system",
          content: `Respond in ${languageName} language only. Regardless of the language used in the user's message, your response must be in ${languageName} only.`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const aiResponse = completion.choices[0].message.content || "I'm sorry, I couldn't generate a response. Please try again.";

    // Add AI response to history
    sessionHistories[sessionId].push({
      role: "assistant",
      content: aiResponse
    });

    return aiResponse;
  } catch (error: any) { // Type error as any to safely access properties
    console.error("OpenAI API error:", error);
    
    // Check if it's a quota error
    if (error?.code === 'insufficient_quota') {
      return "Sorry, I'm currently experiencing high demand. Please try again later or contact support to update API quota limits.";
    }
    
    // Rate limit errors
    if (error?.status === 429) {
      return "I'm receiving too many requests right now. Please wait a moment and try again.";
    }
    
    return "I'm having trouble connecting to my services. Please try again in a moment.";
  }
}

// Helper function to get language name from code
function getLanguageName(code: string): string {
  const languageNames: Record<string, string> = {
    en: "English",
    hi: "Hindi",
    mr: "Marathi",
    ta: "Tamil",
    te: "Telugu",
    kn: "Kannada"
  };
  
  return languageNames[code] || "English";
}
