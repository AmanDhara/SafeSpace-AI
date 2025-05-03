import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Pause, StopCircle } from "lucide-react";
import { supportedLanguages } from "@/lib/languages";
import { useLanguage } from "@/hooks/use-language";

interface TextToSpeechProps {
  text: string;
  language: string;
  autoPlay?: boolean;
}

// Map of language codes to voice options
const languageVoiceMap: Record<string, string[]> = {
  en: ["en-US", "en-GB", "en-IN", "en-AU", "en-CA"],
  hi: ["hi-IN"],
  mr: ["mr-IN", "hi-IN"], // Try Marathi first, fallback to Hindi 
  ta: ["ta-IN", "ta"],
  te: ["te-IN", "te"],
  kn: ["kn-IN", "kn"]
};

export default function TextToSpeech({ text, language, autoPlay = true }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    // Initialize speech synthesis
    if (typeof window !== "undefined" && window.speechSynthesis) {
      // Get available voices
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
      };

      // Chrome loads voices asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }

      loadVoices();

      // Clean up on unmount
      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  // Auto-play effect when new text arrives and autoPlay is true
  const hasAutoPlayed = useRef(false);
  
  // Reset hasAutoPlayed when text changes
  useEffect(() => {
    hasAutoPlayed.current = false;
  }, [text]);

  useEffect(() => {
    // Only auto-play once per message when voices are available
    // Small delay to help ensure reliable playback and reduce stuttering
    if (autoPlay && text && availableVoices.length > 0 && !isPlaying && !hasAutoPlayed.current) {
      const timer = setTimeout(() => {
        hasAutoPlayed.current = true;
        speak();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [text, availableVoices, autoPlay, isPlaying]);

  const getBestVoiceForLanguage = (lang: string): SpeechSynthesisVoice | null => {
    // Get the preferred language codes for the current language
    const preferredCodes = languageVoiceMap[lang] || ["en-US"];
    
    // Log available voices for debugging
    if (availableVoices.length > 0) {
      console.log("Available voices:");
      availableVoices.forEach(voice => {
        console.log(`- ${voice.name}: ${voice.lang} (Default: ${voice.default})`);
      });
    }
    
    // First, try to find an exact match
    for (const code of preferredCodes) {
      const exactMatch = availableVoices.find(
        voice => voice.lang.toLowerCase() === code.toLowerCase()
      );
      if (exactMatch) {
        console.log(`Found exact match for ${code}: ${exactMatch.name}`);
        return exactMatch;
      }
    }
    
    // Next, try to find a voice that includes the language code
    for (const code of preferredCodes) {
      const includesMatch = availableVoices.find(
        voice => voice.lang.toLowerCase().includes(code.toLowerCase())
      );
      if (includesMatch) {
        console.log(`Found partial match for ${code}: ${includesMatch.name}`);
        return includesMatch;
      }
    }

    // Fallback to any available voice for the general language
    const langPrefix = lang.split('-')[0];
    const fallbackVoice = availableVoices.find(
      voice => voice.lang.toLowerCase().startsWith(langPrefix.toLowerCase())
    );
    
    if (fallbackVoice) {
      console.log(`Found language prefix match for ${langPrefix}: ${fallbackVoice.name}`);
      return fallbackVoice;
    }
    
    // Final fallback - use any available voice in the preferred order
    if (availableVoices.length > 0) {
      // Try to get a Hindi voice for Indian languages as last resort
      if (['mr', 'hi', 'ta', 'te', 'kn'].includes(lang)) {
        const hindiVoice = availableVoices.find(v => v.lang.toLowerCase().includes('hi-in'));
        if (hindiVoice) {
          console.log(`Falling back to Hindi voice for ${lang}: ${hindiVoice.name}`);
          return hindiVoice;
        }
      }
      
      // Last resort - return default voice or first in list
      const defaultVoice = availableVoices.find(v => v.default) || availableVoices[0];
      console.log(`Using default/first voice as fallback: ${defaultVoice.name}`);
      return defaultVoice;
    }
    
    return null;
  };

  const speak = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      console.error("Speech synthesis not supported");
      return;
    }

    // If already speaking, resume if paused
    if (utteranceRef.current && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // Reset if needed
    window.speechSynthesis.cancel();

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Get best available voice for language
    const voice = getBestVoiceForLanguage(language);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang; // Explicitly set the language to match the voice
    } else {
      // Use language code directly if no matching voice found
      utterance.lang = language;
      console.log(`No voice found for ${language}, falling back to browser default`);
    }
    
    // Debug information about available voices and selected voice
    console.log(`Speaking in ${language} with voice: ${voice?.name || 'default'}, lang: ${voice?.lang || language}`);
    console.log(`Available voices: ${availableVoices.length}`);

    // Set up events
    utterance.onstart = (event) => {
      console.log(`Speech started with voice: ${utterance.voice?.name || 'default'}`);
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onpause = () => {
      setIsPaused(true);
    };

    utterance.onresume = () => {
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      utteranceRef.current = null;
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error", event);
      setIsPlaying(false);
      setIsPaused(false);
      utteranceRef.current = null;
    };

    // Adjust voice settings based on language
    utterance.rate = 1.0; // Normal speed
    utterance.pitch = 1.0; // Normal pitch
    utterance.volume = 1.0; // Maximum volume

    // Start speaking
    window.speechSynthesis.speak(utterance);
  };

  const pause = () => {
    if (window.speechSynthesis && isPlaying && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const stop = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      utteranceRef.current = null;
    }
  };

  // Find the display name for the current language
  const currentLangName = supportedLanguages.find(l => l.code === language)?.name || "English";

  return (
    <div className="flex items-center space-x-2">
      {!isPlaying ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={speak}
          title={`${t("listen")} ${currentLangName}`}
          className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
        >
          <Volume2 className="h-4 w-4 mr-1" />
          <span className="text-xs">{t("listen")}</span>
        </Button>
      ) : (
        <>
          {isPaused ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={speak}
              title={t("resume")}
              className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
            >
              <Volume2 className="h-4 w-4 mr-1" />
              <span className="text-xs">{t("resume")}</span>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={pause}
              title={t("pause")}
              className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
            >
              <Pause className="h-4 w-4 mr-1" />
              <span className="text-xs">{t("pause")}</span>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={stop}
            title={t("stop")}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <StopCircle className="h-4 w-4 mr-1" />
            <span className="text-xs">{t("stop")}</span>
          </Button>
        </>
      )}
    </div>
  );
}