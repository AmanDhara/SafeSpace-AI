import OpenAI from "openai";

// Configure model options - we'll try powerful models first and fall back to more accessible ones
const MODEL_OPTIONS = [
  "gpt-4o", // The newest, most capable model (as of May 2024) - first choice if available
  "gpt-4-turbo", // Good fallback if gpt-4o isn't available
  "gpt-4", // Standard GPT-4
  "gpt-3.5-turbo", // Most widely accessible model - good fallback
];

// We'll try each model in order until we find one that works
let CURRENT_MODEL = MODEL_OPTIONS[0];

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
    
    // Create properly typed messages for OpenAI API
    const typedMessages = recentMessages
      .filter(msg => ["system", "user", "assistant"].includes(msg.role))
      .map(msg => {
        if (msg.role === "system") {
          return { role: "system" as const, content: msg.content };
        } else if (msg.role === "user") {
          return { role: "user" as const, content: msg.content };
        } else {
          return { role: "assistant" as const, content: msg.content };
        }
      });
    
    // Try models in sequence until one works
    let lastError = null;
    let completion = null;
    
    // Try each model in our options list
    for (const modelOption of MODEL_OPTIONS) {
      try {
        // Make API call to OpenAI with properly typed messages
        completion = await openai.chat.completions.create({
          model: modelOption,
          messages: [
            ...typedMessages,
            {
              role: "system" as const,
              content: `Respond in ${languageName} language only. Regardless of the language used in the user's message, your response must be in ${languageName} only.`
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        });
        
        // If we get here, the call succeeded, save this model for future use
        CURRENT_MODEL = modelOption;
        console.log(`Successfully used model: ${modelOption}`);
        break;
      } catch (err: any) {
        lastError = err;
        console.log(`Error with model ${modelOption}: ${err.message || 'Unknown error'}. Trying next model...`);
        
        // If this isn't a model-related error, don't try other models
        if (err.code !== 'model_not_found' && err.type !== 'invalid_request_error') {
          break;
        }
      }
    }
    
    // If we tried all models and still have no completion, throw the last error
    if (!completion) {
      throw lastError || new Error("All models failed");
    }

    const aiResponse = completion.choices[0].message.content || "I'm sorry, I couldn't generate a response. Please try again.";

    // Add AI response to history
    sessionHistories[sessionId].push({
      role: "assistant",
      content: aiResponse
    });

    return aiResponse;
  } catch (error: any) { // Type error as any to safely access properties
    console.error("OpenAI API error:", error);
    
    // Error messages in different languages
    const errorMessages = {
      quota: {
        en: "Sorry, I'm currently experiencing high demand. Please try again later or contact support to update API quota limits.",
        hi: "क्षमा करें, मैं वर्तमान में उच्च मांग का अनुभव कर रहा हूं। कृपया बाद में पुनः प्रयास करें या API कोटा सीमा अपडेट करने के लिए सपोर्ट से संपर्क करें।",
        mr: "क्षमा करा, मी सध्या जास्त मागणीचा अनुभव घेत आहे. कृपया नंतर पुन्हा प्रयत्न करा किंवा API कोटा मर्यादा अपडेट करण्यासाठी सपोर्टशी संपर्क साधा.",
        ta: "மன்னிக்கவும், தற்போது நான் அதிக தேவையை அனுபவிக்கிறேன். பிறகு மீண்டும் முயற்சிக்கவும் அல்லது API ஒதுக்கீடு வரம்புகளை புதுப்பிக்க ஆதரவை தொடர்பு கொள்ளவும்.",
        te: "క్షమించండి, నేను ప్రస్తుతం అధిక డిమాండ్‌ని అనుభవిస్తున్నాను. దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి లేదా API కోటా పరిమితులను నవీకరించడానికి మద్దతును సంప్రదించండి.",
        kn: "ಕ್ಷಮಿಸಿ, ನಾನು ಪ್ರಸ್ತುತ ಹೆಚ್ಚಿನ ಬೇಡಿಕೆಯನ್ನು ಅನುಭವಿಸುತ್ತಿದ್ದೇನೆ. ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ API ಕೋಟಾ ಮಿತಿಗಳನ್ನು ನವೀಕರಿಸಲು ಬೆಂಬಲವನ್ನು ಸಂಪರ್ಕಿಸಿ."
      },
      rateLimit: {
        en: "I'm receiving too many requests right now. Please wait a moment and try again.",
        hi: "मैं अभी बहुत सारे अनुरोध प्राप्त कर रहा हूं। कृपया एक क्षण प्रतीक्षा करें और पुनः प्रयास करें।",
        mr: "मला सध्या खूप विनंत्या प्राप्त होत आहेत. कृपया क्षणभर थांबा आणि पुन्हा प्रयत्न करा.",
        ta: "நான் தற்போது பல கோரிக்கைகளைப் பெறுகிறேன். சற்று நேரம் காத்திருந்து மீண்டும் முயற்சிக்கவும்.",
        te: "నేను ప్రస్తుతం చాలా అభ్యర్థనలను స్వీకరిస్తున్నాను. దయచేసి ఒక క్షణం వేచి ఉండి మళ్లీ ప్రయత్నించండి.",
        kn: "ನಾನು ಈಗ ಹೆಚ್ಚಿನ ವಿನಂತಿಗಳನ್ನು ಸ್ವೀಕರಿಸುತ್ತಿದ್ದೇನೆ. ದಯವಿಟ್ಟು ಒಂದು ಕ್ಷಣ ಕಾಯಿರಿ ಮತ್ತು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
      },
      connection: {
        en: "I'm having trouble connecting to my services. Please try again in a moment.",
        hi: "मुझे अपनी सेवाओं से कनेक्ट करने में समस्या हो रही है। कृपया कुछ क्षण में पुनः प्रयास करें।",
        mr: "माझ्या सेवांशी कनेक्ट करण्यात मला समस्या येत आहे. कृपया क्षणभरात पुन्हा प्रयत्न करा.",
        ta: "என் சேவைகளுடன் இணைப்பதில் எனக்கு சிக்கல் ஏற்பட்டுள்ளது. சிறிது நேரத்தில் மீண்டும் முயற்சிக்கவும்.",
        te: "నా సేవలకు కనెక్ట్ చేయడంలో నాకు సమస్య ఉంది. దయచేసి కొద్దిసేపు తర్వాత మళ్ళీ ప్రయత్నించండి.",
        kn: "ನನ್ನ ಸೇವೆಗಳಿಗೆ ಸಂಪರ್ಕಿಸಲು ನನಗೆ ತೊಂದರೆಯಾಗುತ್ತಿದೆ. ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯದಲ್ಲಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
      }
    };
    
    // Check if the language is supported in our error messages
    const supportedLanguages = ['en', 'hi', 'mr', 'ta', 'te', 'kn'];
    const languageKey = supportedLanguages.includes(language) ? language : 'en';
    
    // Check if it's a quota error
    if (error?.code === 'insufficient_quota') {
      return errorMessages.quota[languageKey as keyof typeof errorMessages.quota];
    }
    
    // Rate limit errors
    if (error?.status === 429) {
      return errorMessages.rateLimit[languageKey as keyof typeof errorMessages.rateLimit];
    }
    
    return errorMessages.connection[languageKey as keyof typeof errorMessages.connection];
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
