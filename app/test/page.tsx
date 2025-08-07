'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface TypingResult {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
  totalWords: number;
  correctWords: number;
}

// Word lists for random generation
const commonWords = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over',
  'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these',
  'give', 'day', 'most', 'us', 'time', 'person', 'year', 'way', 'day', 'thing', 'man', 'world', 'life', 'hand', 'part', 'child', 'eye', 'woman',
  'place', 'work', 'week', 'case', 'point', 'government', 'company', 'number', 'group', 'problem', 'fact', 'water', 'money', 'month', 'lot', 'right',
  'study', 'book', 'job', 'word', 'issue', 'side', 'kind', 'head', 'house', 'service', 'father', 'friend', 'minute', 'idea', 'body', 'information',
  'power', 'money', 'change', 'move', 'interest', 'order', 'development', 'society', 'rate', 'experience', 'art', 'car', 'law', 'road', 'form',
  'face', 'education', 'policy', 'research', 'sort', 'office', 'body', 'door', 'health', 'person', 'art', 'war', 'history', 'party', 'result',
  'change', 'morning', 'reason', 'research', 'girl', 'guy', 'moment', 'air', 'teacher', 'force', 'education', 'hundred', 'remember', 'foot',
  'second', 'boy', 'age', 'energy', 'table', 'normal', 'draw', 'east', 'plant', 'language', 'unit', 'power', 'town', 'fine', 'certain', 'fly',
  'fall', 'lead', 'cry', 'dark', 'machine', 'note', 'wait', 'plan', 'figure', 'star', 'box', 'noun', 'field', 'rest', 'correct', 'able', 'pound',
  'done', 'beauty', 'drive', 'stood', 'contain', 'front', 'teach', 'week', 'final', 'gave', 'green', 'oh', 'quick', 'develop', 'ocean', 'warm',
  'free', 'minute', 'strong', 'special', 'mind', 'behind', 'clear', 'tail', 'produce', 'fact', 'street', 'inch', 'multiply', 'nothing', 'course',
  'stay', 'wheel', 'full', 'force', 'blue', 'object', 'decide', 'surface', 'deep', 'moon', 'island', 'foot', 'system', 'busy', 'test', 'record',
  'boat', 'common', 'gold', 'possible', 'plane', 'stead', 'dry', 'wonder', 'laugh', 'thousand', 'ago', 'ran', 'check', 'game', 'shape', 'equate',
  'hot', 'miss', 'brought', 'heat', 'snow', 'tire', 'bring', 'yes', 'distant', 'fill', 'east', 'paint', 'language', 'unit', 'power', 'town', 'fine'
];

const adjectives = [
  'quick', 'lazy', 'sleepy', 'noisy', 'hungry', 'brave', 'clever', 'kind', 'happy', 'sad', 'angry', 'calm', 'excited', 'worried', 'confident',
  'shy', 'friendly', 'serious', 'funny', 'smart', 'wise', 'foolish', 'generous', 'selfish', 'patient', 'impatient', 'careful', 'careless', 'polite',
  'rude', 'honest', 'dishonest', 'loyal', 'faithful', 'creative', 'artistic', 'musical', 'athletic', 'strong', 'weak', 'tall', 'short', 'big', 'small',
  'beautiful', 'ugly', 'pretty', 'handsome', 'elegant', 'graceful', 'clumsy', 'smooth', 'rough', 'soft', 'hard', 'warm', 'cold', 'hot', 'cool',
  'bright', 'dark', 'light', 'heavy', 'fresh', 'stale', 'new', 'old', 'young', 'modern', 'ancient', 'simple', 'complex', 'easy', 'difficult'
];

const nouns = [
  'cat', 'dog', 'bird', 'fish', 'horse', 'cow', 'pig', 'sheep', 'goat', 'chicken', 'duck', 'rabbit', 'mouse', 'rat', 'hamster', 'guinea', 'ferret',
  'car', 'truck', 'bus', 'train', 'plane', 'boat', 'ship', 'bicycle', 'motorcycle', 'scooter', 'skateboard', 'rollerblades', 'skis', 'snowboard',
  'house', 'apartment', 'building', 'office', 'school', 'hospital', 'library', 'museum', 'theater', 'cinema', 'restaurant', 'cafe', 'shop', 'store',
  'book', 'magazine', 'newspaper', 'letter', 'email', 'message', 'phone', 'computer', 'laptop', 'tablet', 'television', 'radio', 'camera', 'clock',
  'tree', 'flower', 'grass', 'bush', 'plant', 'vine', 'cactus', 'mushroom', 'weed', 'seed', 'root', 'branch', 'leaf', 'stem', 'petal', 'thorn'
];

const verbs = [
  'run', 'walk', 'jump', 'climb', 'swim', 'fly', 'dance', 'sing', 'play', 'work', 'study', 'read', 'write', 'draw', 'paint', 'cook', 'bake',
  'clean', 'wash', 'brush', 'comb', 'dress', 'undress', 'sleep', 'wake', 'eat', 'drink', 'talk', 'listen', 'watch', 'see', 'hear', 'smell', 'taste',
  'think', 'feel', 'know', 'understand', 'learn', 'teach', 'help', 'give', 'take', 'bring', 'carry', 'hold', 'drop', 'throw', 'catch', 'push',
  'pull', 'lift', 'lower', 'open', 'close', 'start', 'stop', 'begin', 'end', 'finish', 'continue', 'repeat', 'return', 'arrive', 'leave', 'enter',
  'exit', 'approach', 'avoid', 'follow', 'lead', 'guide', 'direct', 'control', 'manage', 'organize', 'plan', 'prepare', 'arrange', 'fix', 'repair'
];

// Generate random text functions
const generateRandomWords = (count: number): string => {
  const words = [];
  for (let i = 0; i < count; i++) {
    const wordList = [commonWords, adjectives, nouns, verbs];
    const randomList = wordList[Math.floor(Math.random() * wordList.length)];
    const randomWord = randomList[Math.floor(Math.random() * randomList.length)];
    words.push(randomWord);
  }
  return words.join(' ');
};

const generateRandomSentence = (): string => {
  const sentenceLength = Math.floor(Math.random() * 8) + 5; // 5-12 words
  const words = [];
  
  // Start with a capital word
  const firstWordList = [commonWords, adjectives, nouns];
  const firstRandomList = firstWordList[Math.floor(Math.random() * firstWordList.length)];
  const firstWord = firstRandomList[Math.floor(Math.random() * firstRandomList.length)];
  words.push(firstWord.charAt(0).toUpperCase() + firstWord.slice(1));
  
  // Add remaining words
  for (let i = 1; i < sentenceLength; i++) {
    const wordList = [commonWords, adjectives, nouns, verbs];
    const randomList = wordList[Math.floor(Math.random() * wordList.length)];
    const randomWord = randomList[Math.floor(Math.random() * randomList.length)];
    words.push(randomWord);
  }
  
  // Add punctuation
  const punctuations = ['.', '!', '?'];
  const punctuation = punctuations[Math.floor(Math.random() * punctuations.length)];
  
  return words.join(' ') + punctuation;
};

const generateRandomText = (): string => {
  const sentences = [];
  const sentenceCount = Math.floor(Math.random() * 3) + 2; // 2-4 sentences
  
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateRandomSentence());
  }
  
  return sentences.join(' ');
};

export default function TypingSpeedTest() {
  const [currentText, setCurrentText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isTestActive, setIsTestActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [results, setResults] = useState<TypingResult | null>(null);
  const [testStarted, setTestStarted] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize with a random text
  useEffect(() => {
    setCurrentText(generateRandomText());
  }, []);

  // Timer logic
  useEffect(() => {
    if (isTestActive && testStarted) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 0.1);
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTestActive, testStarted]);

  // Check if test is complete
  useEffect(() => {
    if (userInput.length > 0 && userInput === currentText) {
      endTest();
    }
  }, [userInput, currentText]);

  // Mobile keyboard and orientation detection
  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.innerHeight;
      const windowHeight = window.outerHeight;
      const keyboardHeight = windowHeight - viewportHeight;
      
      // If keyboard takes up more than 150px, consider it visible
      setIsKeyboardVisible(keyboardHeight > 150);
      
      // Check if in landscape mode with small height
      setIsLandscape(window.innerWidth > window.innerHeight && window.innerHeight < 500);
    };

    const handleOrientationChange = () => {
      setTimeout(handleResize, 100); // Delay to ensure orientation change is complete
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Initial check
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  // Auto-focus input when test starts
  useEffect(() => {
    if (isTestActive && textareaRef.current) {
      // Small delay to ensure the input is ready
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [isTestActive]);

  const startTest = () => {
    setUserInput('');
    setTimeElapsed(0);
    setIsTestActive(true);
    setTestStarted(true);
    setResults(null);
    startTimeRef.current = Date.now();
  };

  const endTest = () => {
    setIsTestActive(false);
    setTestStarted(false);
    
    const words = currentText.split(' ').length;
    const userWords = userInput.split(' ').length;
    const minutes = timeElapsed / 60;
    const wpm = Math.round(userWords / minutes);
    
    // Calculate accuracy
    let correctChars = 0;
    const minLength = Math.min(userInput.length, currentText.length);
    
    for (let i = 0; i < minLength; i++) {
      if (userInput[i] === currentText[i]) {
        correctChars++;
      }
    }
    
    const accuracy = Math.round((correctChars / userInput.length) * 100);
    
    setResults({
      wpm,
      accuracy,
      timeElapsed,
      totalWords: words,
      correctWords: userWords
    });
  };

  const resetTest = () => {
    setUserInput('');
    setTimeElapsed(0);
    setIsTestActive(false);
    setTestStarted(false);
    setResults(null);
    setCurrentText(generateRandomText());
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const tenths = Math.floor((seconds % 1) * 10);
    return `${mins}:${secs.toString().padStart(2, '0')}.${tenths}`;
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  return (
    <>
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <div 
        id="main-content"
        className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden mobile-scroll ${isKeyboardVisible ? 'keyboard-visible' : ''} ${isLandscape ? 'landscape-compact' : ''}`}
        style={{
          paddingBottom: isKeyboardVisible ? 'var(--keyboard-height)' : 'var(--safe-area-inset-bottom)'
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-md mx-auto p-4 safe-area-top">
          {/* Back to Home Button */}
          <div className="mb-4">
            <Link 
              href="/"
              className="inline-flex items-center text-purple-200 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>

          {/* Header - Hide when keyboard is visible and input is focused */}
          {(!isKeyboardVisible || !inputFocused) && (
            <div className="text-center mb-8 mobile-spacing">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg touch-feedback">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
                Speed Typing
              </h1>
              <p className="text-purple-200 text-lg">Test your typing speed on mobile</p>
            </div>
          )}

          {/* Timer Display - Compact when keyboard visible */}
          <div className={`backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6 mb-6 mobile-optimized ${isKeyboardVisible && inputFocused ? 'p-3' : ''}`}>
            <div className="text-center">
              <div className={`font-mono font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ${isKeyboardVisible && inputFocused ? 'text-2xl' : 'text-5xl'}`}>
                {formatTime(timeElapsed)}
              </div>
              <div className="text-purple-200 text-sm mt-2 font-medium">Time Elapsed</div>
            </div>
          </div>

          {/* Test Area */}
          {!results && (
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6 mb-6 mobile-optimized">
              {/* Text to Type - Compact when keyboard visible */}
              <div className={`mb-6 ${isKeyboardVisible && inputFocused ? 'mb-3' : ''}`}>
                <label className="block text-sm font-semibold text-purple-200 mb-3">
                  Type this text:
                </label>
                <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-4 text-white leading-relaxed border border-white/10 max-h-32 overflow-y-auto mobile-scroll">
                  {currentText}
                </div>
              </div>

              {/* Input Area - Optimized for mobile keyboard */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-purple-200 mb-3">
                  Your typing:
                </label>
                <textarea
                  ref={textareaRef}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="Start typing here..."
                  className="w-full p-4 backdrop-blur-sm bg-white/5 border border-white/20 rounded-2xl resize-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-purple-300 transition-all duration-300 text-base mobile-scroll"
                  style={{
                    height: isKeyboardVisible ? '120px' : '128px',
                    fontSize: '16px', // Prevents zoom on iOS
                    lineHeight: '1.5',
                    paddingTop: '12px',
                    paddingBottom: '12px'
                  }}
                  disabled={!isTestActive}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  enterKeyHint="done"
                  inputMode="text"
                />
              </div>

              {/* Controls - Compact when keyboard visible */}
              <div className={`flex gap-4 ${isKeyboardVisible && inputFocused ? 'gap-2' : ''}`}>
                {!isTestActive ? (
                  <button
                    onClick={startTest}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95 touch-feedback"
                    style={{ minHeight: '48px' }} // Touch target size
                  >
                    Start Test
                  </button>
                ) : (
                  <button
                    onClick={endTest}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 px-6 rounded-2xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95 touch-feedback"
                    style={{ minHeight: '48px' }}
                  >
                    End Test
                  </button>
                )}
                <button
                  onClick={resetTest}
                  className="flex-1 backdrop-blur-sm bg-white/10 text-white py-4 px-6 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20 active:scale-95 touch-feedback"
                  style={{ minHeight: '48px' }}
                >
                  New Text
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 mobile-optimized">
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6">
                Test Results
              </h2>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{results.wpm}</div>
                  <div className="text-purple-200 text-sm font-medium">WPM</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">{results.accuracy}%</div>
                  <div className="text-purple-200 text-sm font-medium">Accuracy</div>
                </div>
              </div>

              <div className="space-y-3 text-sm text-purple-200 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Time:</span>
                  <span className="font-mono">{formatTime(results.timeElapsed)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Words typed:</span>
                  <span className="font-mono">{results.correctWords}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total words:</span>
                  <span className="font-mono">{results.totalWords}</span>
                </div>
              </div>

              <button
                onClick={resetTest}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95 touch-feedback"
                style={{ minHeight: '48px' }}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Instructions - Hide when keyboard visible */}
          {!results && !isTestActive && !isKeyboardVisible && (
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-6 mobile-optimized">
              <h3 className="font-semibold text-purple-200 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How to use:
              </h3>
              <ul className="text-sm text-purple-200 space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Click "Start Test" to begin
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Type the randomly generated text exactly
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Your speed and accuracy will be calculated
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Click "New Text" for a different challenge
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 