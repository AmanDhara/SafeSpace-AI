import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Pause, StopCircle } from "lucide-react";
import { supportedLanguages } from "@/lib/languages";

interface TextToSpeechProps {
  text: string;
  language: string;
}

// Map of language codes to voice options
const languageVoiceMap: Record<string, string[]> = {
  en: ["en-US", "en-GB"],
  hi: ["hi-IN"],
  mr: ["hi-IN"], // Use Hindi voice for Marathi as fallback
  ta: ["ta-IN"],
  te: ["te-IN"],
  kn: ["kn-IN"]
};

export default function TextToSpeech({ text, language }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

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

  const getBestVoiceForLanguage = (lang: string): SpeechSynthesisVoice | null => {
    // Get the preferred language codes for the current language
    const preferredCodes = languageVoiceMap[lang] || ["en-US"];
    
    // Find the best matching voice
    for (const code of preferredCodes) {
      const matchingVoice = availableVoices.find(
        voice => voice.lang.toLowerCase().includes(code.toLowerCase())
      );
      if (matchingVoice) return matchingVoice;
    }

    // Fallback to any available voice for the general language
    const langPrefix = lang.split('-')[0];
    const fallbackVoice = availableVoices.find(
      voice => voice.lang.toLowerCase().startsWith(langPrefix.toLowerCase())
    );
    
    return fallbackVoice || null;
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
    } else {
      // Use language code directly if no matching voice found
      utterance.lang = language;
    }

    // Set up events
    utterance.onstart = () => {
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
          title={`Listen in ${currentLangName}`}
          className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
        >
          <Volume2 className="h-4 w-4 mr-1" />
          <span className="text-xs">Listen</span>
        </Button>
      ) : (
        <>
          {isPaused ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={speak}
              title="Resume"
              className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
            >
              <Volume2 className="h-4 w-4 mr-1" />
              <span className="text-xs">Resume</span>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={pause}
              title="Pause"
              className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
            >
              <Pause className="h-4 w-4 mr-1" />
              <span className="text-xs">Pause</span>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={stop}
            title="Stop"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <StopCircle className="h-4 w-4 mr-1" />
            <span className="text-xs">Stop</span>
          </Button>
        </>
      )}
    </div>
  );
}