import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type MoodType } from './MoodProgressRing';
import { useLanguage } from '@/hooks/use-language';

// Define color meanings and psychology
const moodColorData = {
  happy: {
    color: "#FFD700", // Gold
    gradient: "from-amber-300 to-amber-500",
    psychology: {
      en: "Yellow and gold represent joy, happiness, and optimism. These colors stimulate mental activity and generate muscle energy, encouraging positivity and confidence.",
      hi: "पीला और सुनहरा रंग खुशी, आनंद और आशावाद का प्रतिनिधित्व करते हैं। ये रंग मानसिक गतिविधि को प्रोत्साहित करते हैं और मांसपेशियों में ऊर्जा उत्पन्न करते हैं, सकारात्मकता और आत्मविश्वास को बढ़ावा देते हैं।",
      mr: "पिवळा आणि सोनेरी रंग आनंद, सुख आणि आशावाद दर्शवतात. हे रंग मानसिक क्रिया प्रोत्साहित करतात आणि स्नायूंमध्ये ऊर्जा निर्माण करतात, सकारात्मकता आणि आत्मविश्वास वाढवतात.",
      ta: "மஞ்சள் மற்றும் தங்க நிறங்கள் மகிழ்ச்சி, சந்தோஷம் மற்றும் நம்பிக்கையைக் குறிக்கின்றன. இந்த நிறங்கள் மனநல செயல்பாட்டைத் தூண்டி, தசை ஆற்றலை உருவாக்கி, நேர்மறை மற்றும் தன்னம்பிக்கையை ஊக்குவிக்கின்றன.",
      te: "పసుపు మరియు బంగారు రంగులు ఆనందం, సంతోషం మరియు ఆశావాదాన్ని సూచిస్తాయి. ఈ రంగులు మానసిక కార్యాచరణను ప్రేరేపించి, కండరాల శక్తిని పెంచి, సానుకూలత మరియు ఆత్మవిశ్వాసాన్ని ప్రోత్సహిస్తాయి.",
      kn: "ಹಳದಿ ಮತ್ತು ಚಿನ್ನದ ಬಣ್ಣಗಳು ಸಂತೋಷ, ಖುಷಿ ಮತ್ತು ಆಶಾವಾದವನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತವೆ. ಈ ಬಣ್ಣಗಳು ಮಾನಸಿಕ ಚಟುವಟಿಕೆಯನ್ನು ಉತ್ತೇಜಿಸುತ್ತವೆ ಮತ್ತು ಸ್ನಾಯು ಶಕ್ತಿಯನ್ನು ಉತ್ಪಾದಿಸುತ್ತವೆ, ಸಕಾರಾತ್ಮಕತೆ ಮತ್ತು ಆತ್ಮವಿಶ್ವಾಸವನ್ನು ಪ್ರೋತ್ಸಾಹಿಸುತ್ತವೆ."
    },
    activities: {
      en: ["Spend time in sunlight", "Decorate spaces with yellow flowers", "Wear bright colors on difficult days"],
      hi: ["धूप में समय बिताएं", "पीले फूलों से जगह को सजाएं", "मुश्किल दिनों में चमकीले रंग पहनें"],
      mr: ["सूर्यप्रकाशात वेळ घालवा", "पिवळ्या फुलांनी जागा सजवा", "कठीण दिवसांमध्ये उज्ज्वल रंग परिधान करा"],
      ta: ["சூரிய ஒளியில் நேரத்தை செலவிடுங்கள்", "மஞ்சள் மலர்களுடன் இடங்களை அலங்கரிக்கவும்", "கடினமான நாட்களில் பிரகாசமான வண்ணங்களை அணியுங்கள்"],
      te: ["సూర్యరశ్మిలో సమయం గడపండి", "పసుపు పూలతో ప్రదేశాలను అలంకరించండి", "కష్టమైన రోజుల్లో ప్రకాశవంతమైన రంగులు ధరించండి"],
      kn: ["ಸೂರ್ಯನ ಬೆಳಕಿನಲ್ಲಿ ಸಮಯ ಕಳೆಯಿರಿ", "ಹಳದಿ ಹೂಗಳಿಂದ ಸ್ಥಳಗಳನ್ನು ಅಲಂಕರಿಸಿ", "ಕಷ್ಟದ ದಿನಗಳಲ್ಲಿ ಹೊಳೆಯುವ ಬಣ್ಣಗಳನ್ನು ಧರಿಸಿ"]
    }
  },
  calm: {
    color: "#6495ED", // Cornflower Blue
    gradient: "from-blue-300 to-blue-500",
    psychology: {
      en: "Blue evokes feelings of calmness and tranquility. It's associated with depth, stability, and wisdom, helping to reduce stress and create a sense of relaxation.",
      hi: "नीला रंग शांति और सुकून की भावनाएं जगाता है। यह गहराई, स्थिरता और ज्ञान से जुड़ा है, जो तनाव को कम करने और आराम की भावना पैदा करने में मदद करता है।",
      mr: "निळा रंग शांतता आणि प्रशांतता भावना निर्माण करतो. हा खोली, स्थिरता आणि ज्ञानाशी संबंधित आहे, तणाव कमी करण्यास आणि विश्रांतीची भावना निर्माण करण्यास मदत करतो.",
      ta: "நீலம் அமைதி மற்றும் அமைதியின் உணர்வுகளைத் தூண்டுகிறது. இது ஆழம், நிலைத்தன்மை மற்றும் ஞானத்துடன் தொடர்புடையது, மன அழுத்தத்தைக் குறைக்க உதவுகிறது மற்றும் ஓய்வு உணர்வை உருவாக்குகிறது.",
      te: "నీలం ప్రశాంతత మరియు ప్రశాంతత భావాలను కలిగిస్తుంది. ఇది లోతు, స్థిరత్వం మరియు జ్ఞానంతో సంబంధం కలిగి ఉంది, ఒత్తిడిని తగ్గించడానికి మరియు విశ్రాంతి భావనను కలిగించడానికి సహాయపడుతుంది.",
      kn: "ನೀಲಿ ಬಣ್ಣವು ಪ್ರಶಾಂತತೆ ಮತ್ತು ನೆಮ್ಮದಿಯ ಭಾವನೆಗಳನ್ನು ಹುಟ್ಟುಹಾಕುತ್ತದೆ. ಇದು ಆಳ, ಸ್ಥಿರತೆ ಮತ್ತು ಜ್ಞಾನದೊಂದಿಗೆ ಸಂಬಂಧಿಸಿದೆ, ಒತ್ತಡವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಮತ್ತು ವಿಶ್ರಾಂತಿಯ ಭಾವನೆಯನ್ನು ಸೃಷ್ಟಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ."
    },
    activities: {
      en: ["Practice deep breathing exercises", "Meditate near bodies of water", "Create a blue-themed relaxation corner"],
      hi: ["गहरी सांस लेने के व्यायाम का अभ्यास करें", "पानी के निकट ध्यान करें", "नीले रंग का रिलैक्सेशन कॉर्नर बनाएं"],
      mr: ["खोल श्वास घेण्याचा सराव करा", "पाण्याजवळ ध्यान करा", "निळ्या थीमचा आरामदायक कोपरा तयार करा"],
      ta: ["ஆழ்ந்த சுவாசப் பயிற்சிகளைப் பயிற்சி செய்யுங்கள்", "நீர்நிலைகளுக்கு அருகில் தியானம் செய்யுங்கள்", "நீல தீம் ஓய்வு மூலையை உருவாக்கவும்"],
      te: ["గాఢమైన శ్వాస వ్యాయామాలను అభ్యాసం చేయండి", "నీటి వద్ద ధ్యానం చేయండి", "నీలి థీమ్ విశ్రాంతి మూలను సృష్టించండి"],
      kn: ["ಆಳವಾದ ಉಸಿರಾಟದ ವ್ಯಾಯಾಮಗಳನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ", "ನೀರಿನ ಬಳಿ ಧ್ಯಾನ ಮಾಡಿ", "ನೀಲಿ ಥೀಮ್ ವಿಶ್ರಾಂತಿ ಮೂಲೆಯನ್ನು ರಚಿಸಿ"]
    }
  },
  neutral: {
    color: "#A9A9A9", // Dark Gray
    gradient: "from-gray-300 to-gray-500",
    psychology: {
      en: "Gray represents neutrality and balance. It's a color of compromise that creates a sense of calm and composure, particularly useful during transitions or uncertain times.",
      hi: "ग्रे तटस्थता और संतुलन का प्रतिनिधित्व करता है। यह समझौते का रंग है जो शांति और संयम की भावना पैदा करता है, विशेष रूप से संक्रमण या अनिश्चित समय के दौरान उपयोगी होता है।",
      mr: "ग्रे तटस्थता आणि संतुलन दर्शवतो. हा तडजोडीचा रंग आहे जो शांतता आणि संयम निर्माण करतो, विशेषतः संक्रमण किंवा अनिश्चित काळात उपयुक्त आहे.",
      ta: "சாம்பல் நடுநிலைமையையும் சமநிலையையும் குறிக்கிறது. இது அமைதி மற்றும் அமைதியின் உணர்வை உருவாக்கும் சமரசத்தின் வண்ணம், குறிப்பாக மாற்றங்கள் அல்லது நிச்சயமற்ற நேரங்களில் பயனுள்ளதாக இருக்கும்.",
      te: "గ్రే తటస్థత మరియు సమతుల్యతను సూచిస్తుంది. ఇది ప్రశాంతత మరియు నిగ్రహాన్ని కలిగించే రాజీ రంగు, ప్రత్యేకించి మార్పులు లేదా అనిశ్చిత సమయాల్లో ఉపయోగపడుతుంది.",
      kn: "ಬೂದು ತಟಸ್ಥತೆ ಮತ್ತು ಸಮತೋಲನವನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತದೆ. ಇದು ಪ್ರಶಾಂತತೆ ಮತ್ತು ಸ್ಥಿರತೆಯ ಭಾವನೆಯನ್ನು ಸೃಷ್ಟಿಸುವ ರಾಜಿಯ ಬಣ್ಣವಾಗಿದೆ, ವಿಶೇಷವಾಗಿ ಪರಿವರ್ತನೆಗಳು ಅಥವಾ ಅನಿಶ್ಚಿತ ಸಮಯಗಳಲ್ಲಿ ಉಪಯುಕ್ತವಾಗಿದೆ."
    },
    activities: {
      en: ["Declutter your living space", "Take short mindfulness breaks", "Practice mindful observation of surroundings"],
      hi: ["अपने रहने की जगह को व्यवस्थित करें", "संक्षिप्त माइंडफुलनेस ब्रेक लें", "आसपास के वातावरण का सचेत अवलोकन का अभ्यास करें"],
      mr: ["राहण्याची जागा आवरा", "थोडे माइंडफुलनेस ब्रेक घ्या", "आसपासच्या परिसराचे जागरूक निरीक्षण करा"],
      ta: ["உங்கள் வாழும் இடத்தை ஒழுங்குபடுத்துங்கள்", "குறுகிய விழிப்புணர்வு இடைவேளைகளை எடுத்துக் கொள்ளுங்கள்", "சுற்றுப்புறத்தை கவனமுடன் கவனிக்கும் பயிற்சி செய்யுங்கள்"],
      te: ["మీ నివాస ప్రదేశాన్ని శుభ్రపరచండి", "చిన్న మైండ్‌ఫుల్‌నెస్ విరామాలు తీసుకోండి", "చుట్టుపక్కల పరిసరాలను జాగ్రత్తగా గమనించే అభ్యాసం చేయండి"],
      kn: ["ನಿಮ್ಮ ವಾಸಿಸುವ ಸ್ಥಳವನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಿ", "ಕಿರು ಮೈಂಡ್‌ಫುಲ್‌ನೆಸ್ ವಿರಾಮಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ", "ಸುತ್ತಮುತ್ತಲಿನ ಪರಿಸರವನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಗಮನಿಸುವ ಅಭ್ಯಾಸ ಮಾಡಿ"]
    }
  },
  anxious: {
    color: "#FF7F50", // Coral
    gradient: "from-orange-300 to-orange-500",
    psychology: {
      en: "Orange combines the energy of red with the happiness of yellow, representing enthusiasm but also anxiety when intense. It can stimulate emotional responses and increase oxygen supply to the brain.",
      hi: "नारंगी रंग लाल की ऊर्जा को पीले की खुशी के साथ जोड़ता है, जो उत्साह का प्रतिनिधित्व करता है लेकिन तीव्र होने पर चिंता भी। यह भावनात्मक प्रतिक्रियाओं को उत्तेजित कर सकता है और मस्तिष्क में ऑक्सीजन की आपूर्ति बढ़ा सकता है।",
      mr: "नारंगी रंग लाल ऊर्जा आणि पिवळ्या रंगाच्या आनंदाचे मिश्रण आहे, जो उत्साह दर्शवतो परंतु तीव्र असल्यास चिंता देखील. हा भावनिक प्रतिक्रिया उत्तेजित करू शकतो आणि मेंदूला ऑक्सिजनचा पुरवठा वाढवू शकतो.",
      ta: "ஆரஞ்சு சிவப்பின் ஆற்றலை மஞ்சளின் மகிழ்ச்சியுடன் இணைக்கிறது, உற்சாகத்தைக் குறிக்கிறது, ஆனால் தீவிரமாக இருக்கும்போது பதட்டத்தையும் குறிக்கும். இது உணர்ச்சிகரமான பதில்களைத் தூண்டுவதோடு மூளைக்கு ஆக்ஸிஜன் விநியோகத்தையும் அதிகரிக்கும்.",
      te: "ఆరెంజ్ ఎరుపు యొక్క శక్తిని పసుపు యొక్క ఆనందంతో కలుపుతుంది, ఉత్సాహాన్ని సూచిస్తుంది కానీ తీవ్రంగా ఉన్నప్పుడు ఆందోళనను కూడా సూచిస్తుంది. ఇది భావోద్వేగ ప్రతిస్పందనలను ప్రేరేపించగలదు మరియు మెదడుకు ఆక్సిజన్ సరఫరాను పెంచుతుంది.",
      kn: "ಕಿತ್ತಳೆ ಬಣ್ಣವು ಕೆಂಪಿನ ಶಕ್ತಿಯನ್ನು ಹಳದಿಯ ಸಂತೋಷದೊಂದಿಗೆ ಸಂಯೋಜಿಸುತ್ತದೆ, ಉತ್ಸಾಹವನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತದೆ ಆದರೆ ತೀವ್ರವಾದಾಗ ಆತಂಕವನ್ನು ಸಹ. ಇದು ಭಾವನಾತ್ಮಕ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಉತ್ತೇಜಿಸಬಹುದು ಮತ್ತು ಮೆದುಳಿಗೆ ಆಮ್ಲಜನಕದ ಪೂರೈಕೆಯನ್ನು ಹೆಚ್ಚಿಸಬಹುದು."
    },
    activities: {
      en: ["Practice grounding techniques", "Try progressive muscle relaxation", "Use aromatherapy with calming scents"],
      hi: ["ग्राउंडिंग तकनीकों का अभ्यास करें", "प्रोग्रेसिव मसल रिलैक्सेशन की कोशिश करें", "शांत सुगंधों के साथ अरोमाथेरेपी का उपयोग करें"],
      mr: ["ग्राउंडिंग तंत्रांचा सराव करा", "प्रोग्रेसिव मसल रिलॅक्सेशन वापरून पहा", "शांत सुगंधांसह अरोमाथेरपी वापरा"],
      ta: ["நிலைநிறுத்தும் நுட்பங்களை பயிற்சி செய்யுங்கள்", "முற்போக்கான தசை தளர்வு முயற்சி செய்யுங்கள்", "அமைதியான வாசனைகளுடன் அரோமாதெரபியைப் பயன்படுத்துங்கள்"],
      te: ["గ్రౌండింగ్ టెక్నిక్‌లను అభ్యాసం చేయండి", "ప్రోగ్రెసివ్ మసిల్ రిలాక్సేషన్ ప్రయత్నించండి", "ప్రశాంతమైన సువాసనలతో అరోమాథెరపీని ఉపయోగించండి"],
      kn: ["ಗ್ರೌಂಡಿಂಗ್ ತಂತ್ರಗಳನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ", "ಪ್ರಗತಿಶೀಲ ಸ್ನಾಯು ವಿಶ್ರಾಂತಿಯನ್ನು ಪ್ರಯತ್ನಿಸಿ", "ಶಾಂತಗೊಳಿಸುವ ಸುವಾಸನೆಗಳೊಂದಿಗೆ ಅರೋಮಾಥೆರಪಿಯನ್ನು ಬಳಸಿ"]
    }
  },
  sad: {
    color: "#4682B4", // Steel Blue
    gradient: "from-indigo-300 to-indigo-500",
    psychology: {
      en: "Deep blues and indigos can represent sadness but also depth and introspection. These colors encourage self-reflection and thoughtfulness, helping process difficult emotions.",
      hi: "गहरे नीले और इंडिगो रंग उदासी का प्रतिनिधित्व कर सकते हैं, लेकिन गहराई और आत्मनिरीक्षण का भी। ये रंग आत्म-प्रतिबिंब और विचारशीलता को प्रोत्साहित करते हैं, कठिन भावनाओं को संसाधित करने में मदद करते हैं।",
      mr: "गडद निळे आणि इंडिगो रंग दु:ख दर्शवू शकतात परंतु खोली आणि आत्मनिरीक्षण देखील. हे रंग स्व-प्रतिबिंब आणि विचारशीलता प्रोत्साहित करतात, कठीण भावना प्रक्रिया करण्यात मदत करतात.",
      ta: "ஆழமான நீலம் மற்றும் இண்டிகோக்கள் துக்கத்தைக் குறிக்கலாம், ஆனால் ஆழம் மற்றும் அகநோக்கையும் குறிக்கலாம். இந்த நிறங்கள் சுய-பிரதிபலிப்பையும் சிந்தனையையும் ஊக்குவிக்கின்றன, கடினமான உணர்ச்சிகளைச் செயலாக்க உதவுகின்றன.",
      te: "లోతైన నీలం మరియు ఇండిగోలు విచారాన్ని సూచించవచ్చు కానీ లోతు మరియు ఆత్మపరిశీలన కూడా. ఈ రంగులు స్వీయ-ప్రతిబింబం మరియు ఆలోచనాత్మకతను ప్రోత్సహిస్తాయి, కష్టమైన భావోద్వేగాలను ప్రాసెస్ చేయడంలో సహాయపడతాయి.",
      kn: "ಆಳವಾದ ನೀಲಿ ಮತ್ತು ಇಂಡಿಗೋಗಳು ದುಃಖವನ್ನು ಪ್ರತಿನಿಧಿಸಬಹುದು ಆದರೆ ಆಳ ಮತ್ತು ಆತ್ಮಾವಲೋಕನವನ್ನು ಸಹ. ಈ ಬಣ್ಣಗಳು ಸ್ವಯಂ-ಪ್ರತಿಬಿಂಬ ಮತ್ತು ಆಲೋಚನಾಶೀಲತೆಯನ್ನು ಪ್ರೋತ್ಸಾಹಿಸುತ್ತವೆ, ಕಷ್ಟದ ಭಾವನೆಗಳನ್ನು ಸಂಸ್ಕರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ."
    },
    activities: {
      en: ["Journal your feelings", "Listen to music that validates your emotions", "Create art to express yourself"],
      hi: ["अपनी भावनाओं को जर्नल में लिखें", "ऐसा संगीत सुनें जो आपकी भावनाओं को वैध ठहराता हो", "खुद को व्यक्त करने के लिए कला बनाएं"],
      mr: ["तुमच्या भावना जर्नल करा", "तुमच्या भावना वैध ठरवणारे संगीत ऐका", "स्वतःला व्यक्त करण्यासाठी कला निर्माण करा"],
      ta: ["உங்கள் உணர்வுகளை பதிவு செய்யுங்கள்", "உங்கள் உணர்ச்சிகளை உறுதிப்படுத்தும் இசையைக் கேளுங்கள்", "உங்களை வெளிப்படுத்த கலையை உருவாக்குங்கள்"],
      te: ["మీ భావాలను జర్నల్ చేయండి", "మీ భావోద్వేగాలను ధృవీకరించే సంగీతాన్ని వినండి", "మిమ్మల్ని మీరు వ్యక్తీకరించడానికి కళను సృష్టించండి"],
      kn: ["ನಿಮ್ಮ ಭಾವನೆಗಳನ್ನು ಜರ್ನಲ್ ಮಾಡಿ", "ನಿಮ್ಮ ಭಾವನೆಗಳನ್ನು ಮಾನ್ಯ ಮಾಡುವ ಸಂಗೀತವನ್ನು ಆಲಿಸಿ", "ನಿಮ್ಮನ್ನು ವ್ಯಕ್ತಪಡಿಸಲು ಕಲೆಯನ್ನು ಸೃಷ್ಟಿಸಿ"]
    }
  }
};

export default function MoodColorGuide() {
  const [selectedMood, setSelectedMood] = useState<MoodType>("happy");
  const { currentLanguage: lang } = useLanguage();
  
  // Get translated content
  const psychology = moodColorData[selectedMood].psychology[lang as keyof typeof moodColorData.happy.psychology] || 
                     moodColorData[selectedMood].psychology.en;
  
  // Make sure activities is an array
  const activitiesContent = moodColorData[selectedMood].activities[lang as keyof typeof moodColorData.happy.activities] || 
                     moodColorData[selectedMood].activities.en;
  const activities = Array.isArray(activitiesContent) ? activitiesContent : [];

  // Translations
  const translations = {
    title: {
      en: "Mood Color Psychology",
      hi: "मूड कलर साइकोलॉजी",
      mr: "मूड कलर सायकोलॉजी",
      ta: "மனநிலை நிற உளவியல்",
      te: "మూడ్ కలర్ సైకాలజీ",
      kn: "ಮೂಡ್ ಕಲರ್ ಸೈಕಾಲಜಿ"
    },
    subtitle: {
      en: "Explore how colors influence your emotions and mental state",
      hi: "जानें कैसे रंग आपकी भावनाओं और मानसिक स्थिति को प्रभावित करते हैं",
      mr: "रंग तुमच्या भावना आणि मानसिक स्थितीवर कसा परिणाम करतात ते अन्वेषण करा",
      ta: "வண்ணங்கள் உங்கள் உணர்வுகள் மற்றும் மனநிலையை எவ்வாறு பாதிக்கின்றன என்பதை ஆராயுங்கள்",
      te: "రంగులు మీ భావోద్వేగాలు మరియు మానసిక స్థితిని ఎలా ప్రభావితం చేస్తాయో అన్వేషించండి",
      kn: "ಬಣ್ಣಗಳು ನಿಮ್ಮ ಭಾವನೆಗಳು ಮತ್ತು ಮಾನಸಿಕ ಸ್ಥಿತಿಯ ಮೇಲೆ ಹೇಗೆ ಪ್ರಭಾವ ಬೀರುತ್ತವೆ ಎಂಬುದನ್ನು ಅನ್ವೇಷಿಸಿ"
    },
    chooseMood: {
      en: "Choose a mood to learn about its color psychology:",
      hi: "मूड चुनें और उसके रंग मनोविज्ञान के बारे में जानें:",
      mr: "मूड निवडा आणि त्याच्या रंग मानसशास्त्राबद्दल जाणून घ्या:",
      ta: "அதன் வண்ண உளவியல் பற்றி அறிய ஒரு மனநிலையைத் தேர்ந்தெடுக்கவும்:",
      te: "దాని రంగు మనస్తత్వం గురించి తెలుసుకోవడానికి మూడ్‌ని ఎంచుకోండి:",
      kn: "ಅದರ ಬಣ್ಣದ ಮನೋವಿಜ್ಞಾನದ ಬಗ್ಗೆ ತಿಳಿಯಲು ಮೂಡ್ ಆಯ್ಕೆಮಾಡಿ:"
    },
    happy: {
      en: "Happy",
      hi: "खुश",
      mr: "आनंदी",
      ta: "மகிழ்ச்சியான",
      te: "సంతోషంగా",
      kn: "ಸಂತೋಷ"
    },
    calm: {
      en: "Calm",
      hi: "शांत",
      mr: "शांत",
      ta: "அமைதியான",
      te: "ప్రశాంతంగా",
      kn: "ಶಾಂತ"
    },
    neutral: {
      en: "Neutral",
      hi: "तटस्थ",
      mr: "तटस्थ",
      ta: "நடுநிலை",
      te: "తటస్థ",
      kn: "ತಟಸ್ಥ"
    },
    anxious: {
      en: "Anxious",
      hi: "चिंतित",
      mr: "चिंताग्रस्त",
      ta: "பதற்றமான",
      te: "ఆందోళనగా",
      kn: "ಆತಂಕ"
    },
    sad: {
      en: "Sad",
      hi: "दुखी",
      mr: "दुःखी",
      ta: "சோகமான",
      te: "విచారంగా",
      kn: "ದುಃಖ"
    },
    psychology: {
      en: "Color Psychology",
      hi: "रंग मनोविज्ञान",
      mr: "रंग मानसशास्त्र",
      ta: "வண்ண உளவியல்",
      te: "రంగు మనస్తత్వం",
      kn: "ಬಣ್ಣದ ಮನೋವಿಜ್ಞಾನ"
    },
    activities: {
      en: "Helpful Activities",
      hi: "सहायक गतिविधियां",
      mr: "उपयुक्त क्रियाकलाप",
      ta: "உதவிகரமான செயல்பாடுகள்",
      te: "సహాయకరమైన కార్యకలాపాలు",
      kn: "ಸಹಾಯಕ ಚಟುವಟಿಕೆಗಳು"
    }
  };

  const getTranslation = (key: keyof typeof translations) => {
    return translations[key][lang as keyof typeof translations.title] || translations[key].en;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className={`bg-gradient-${moodColorData[selectedMood].gradient} text-white`}>
        <CardTitle className="text-2xl font-bold">{getTranslation('title')}</CardTitle>
        <CardDescription className="text-white/90 text-lg">
          {getTranslation('subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">{getTranslation('chooseMood')}</h3>
          
          <RadioGroup
            value={selectedMood}
            onValueChange={(value) => setSelectedMood(value as MoodType)}
            className="flex flex-wrap gap-4"
          >
            {(Object.keys(moodColorData) as MoodType[]).map((mood) => (
              <div key={mood} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={mood} 
                  id={`mood-${mood}`} 
                  className="peer sr-only" 
                />
                <Label
                  htmlFor={`mood-${mood}`}
                  className={`px-4 py-2 rounded-full cursor-pointer flex items-center space-x-2 border-2 hover:bg-slate-100
                    peer-data-[state=checked]:border-${moodColorData[mood].color} peer-data-[state=checked]:bg-${moodColorData[mood].gradient}/10`}
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: moodColorData[mood].color }}
                  />
                  <span>{getTranslation(mood as keyof typeof translations)}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Tabs defaultValue="psychology" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="psychology">{getTranslation('psychology')}</TabsTrigger>
            <TabsTrigger value="activities">{getTranslation('activities')}</TabsTrigger>
          </TabsList>
          <TabsContent value="psychology" className="mt-4 p-4 bg-slate-50 rounded-md">
            <div className="flex items-center space-x-4 mb-4">
              <div 
                className="w-16 h-16 rounded-full" 
                style={{ background: `linear-gradient(to bottom right, ${moodColorData[selectedMood].color}, ${moodColorData[selectedMood].color}dd)` }}
              />
              <div className="text-lg">{psychology}</div>
            </div>
          </TabsContent>
          <TabsContent value="activities" className="mt-4">
            <ul className="space-y-3">
              {activities.map((activity, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 mt-1 text-emerald-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}