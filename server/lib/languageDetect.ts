import { franc } from 'franc';

// Map franc language codes to our supported languages
const languageMap: Record<string, string> = {
  'eng': 'en',  // English
  'hin': 'hi',  // Hindi
  'mar': 'mr',  // Marathi
  'tam': 'ta',  // Tamil
  'tel': 'te',  // Telugu
  'kan': 'kn',  // Kannada
};

// Supported languages
const supportedLanguages = ['en', 'hi', 'mr', 'ta', 'te', 'kn'];

/**
 * Detects the language of the input text
 * @param text - Input text to detect language
 * @returns Language code (en, hi, mr, ta, te, kn) or 'en' if detection fails
 */
export async function detectLanguage(text: string): Promise<string> {
  try {
    // Get the language code from franc
    const detectedCode = franc(text, { 
      minLength: 3,
      only: ['eng', 'hin', 'mar', 'tam', 'tel', 'kan']
    });
    
    // Map to our language codes
    const mappedLanguage = languageMap[detectedCode] || 'en';
    
    // Ensure it's one of our supported languages
    return supportedLanguages.includes(mappedLanguage) ? mappedLanguage : 'en';
  } catch (error) {
    console.error('Language detection error:', error);
    return 'en'; // Default to English on error
  }
}
