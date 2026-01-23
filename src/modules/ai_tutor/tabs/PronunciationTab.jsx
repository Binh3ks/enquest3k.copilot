import { useState, useEffect, useRef } from 'react';
import { Mic, Volume2, CheckCircle2, XCircle, RotateCcw, AlertCircle } from 'lucide-react';
import { useUserStore } from '../../../stores/useUserStore';
import { getCurrentWeekData } from '../../../data/weekData';
import { textToSpeech } from '../../../services/ai_tutor/ttsEngine';
import { getAiTutorResponse } from '../../../services/api';
import { useStationProgress } from '../../../hooks/useStationProgress'; // 🔥 Universal Progress System
import { useLocation } from 'react-router-dom'; // 🔥 Get weekId from URL pathname

/**
 * Pronunciation Tab - Practice speaking target vocabulary with AI assessment
 * Features:
 * - Web Speech Recognition for recording
 * - AI-powered pronunciation evaluation
 * - Detailed feedback on accuracy
 */
const PronunciationTab = () => {
  const { user } = useUserStore();
  const location = useLocation(); // 🔥 Get location from react-router
  
  // 🔥 Parse weekId from pathname: /week/2/ai-tutor -> 2
  const weekNumber = parseInt(location.pathname.match(/\/week\/(\d+)/)?.[1] || '1');
  const currentWeek = `week-${weekNumber}`;
  
  console.log('📍 PronunciationTab - Week detected:', weekNumber, 'from pathname:', location.pathname);
  const { savedData, saveProgress } = useStationProgress(weekNumber, 'ai_pronunciation');
  
  const [weekData, setWeekData] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(savedData.currentWordIndex || 0);
  const [practiceMode, setPracticeMode] = useState('listen'); // listen | recording | evaluating | complete
  const [correctCount, setCorrectCount] = useState(savedData.correctCount || 0);
  const [attempts, setAttempts] = useState(savedData.attempts || []);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0); // Đếm số lần thử cho từ hiện tại
  
  const recognitionRef = useRef(null);
  const currentWordRef = useRef(null);

  // Load week data
  useEffect(() => {
    const loadData = async () => {
      console.log('📚 PronunciationTab loading data for:', currentWeek);
      const data = await getCurrentWeekData(currentWeek);
      setWeekData(data);
      
      // Debug: Log vocabulary count with priority order
      if (data) {
        // Priority: target_vocab (syllabus) > global_vocab (station data) > vocabulary (legacy)
        const newWords = data?.target_vocab || data?.global_vocab || data?.vocabulary || [];
        const wordPower = data?.word_power?.words || [];
        
        console.log('📚 PronunciationTab - Vocabulary sources:', {
          target_vocab: data?.target_vocab?.length || 0,
          global_vocab: data?.global_vocab?.length || 0,
          vocabulary: data?.vocabulary?.length || 0,
          word_power: wordPower.length || 0,
          final_new_words: newWords.length,
          total: newWords.slice(0, 10).length + wordPower.slice(0, 3).length
        });
      }
    };
    loadData();
  }, [currentWeek]);

  // Initialize Web Speech Recognition
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('⚠️ Web Speech API not supported');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 3; // Get top 3 alternatives for better matching

    recognition.onstart = () => {
      console.log('🎤 Recording started');
      setIsListening(true);
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      const confidence = event.results[0][0].confidence;
      
      console.log('📝 Recognized:', transcript, 'Confidence:', confidence);
      
      setIsListening(false);
      setPracticeMode('evaluating');
      
      // Get AI feedback
      await evaluatePronunciation(transcript, confidence);
    };

    recognition.onend = () => {
      console.log('⏹️ Recording ended');
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('❌ Speech recognition error:', event.error);
      setIsListening(false);
      
      if (event.error === 'no-speech') {
        setCurrentFeedback({
          success: false,
          score: 0,
          message: "Cô không nghe thấy gì cả. Hãy thử lại và nói to, rõ ràng nhé!"
        });
        setPracticeMode('listen');
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognition) {
        try {
          recognition.stop();
        } catch (e) {
          // Already stopped
        }
      }
    };
  }, []);

  // Get vocabulary from week data: 10 New Words + 3 Word Power = 13 từ
  // Priority: target_vocab (week_XX_real.js syllabus) > global_vocab (station data) > vocabulary (legacy)
  const newWords = weekData?.target_vocab || weekData?.global_vocab || weekData?.vocabulary || [];
  const wordPower = weekData?.word_power?.words || [];
  
  // Kết hợp: 10 New Words (or 7 from syllabus) + 3 Word Power
  const vocabularyList = [...newWords.slice(0, 10), ...wordPower.slice(0, 3)];
  const currentWord = vocabularyList[currentWordIndex];
  const totalWords = vocabularyList.length;

  // Keep ref updated for speech recognition callbacks
  useEffect(() => {
    currentWordRef.current = currentWord;
  }, [currentWord]);

  // Text-to-Speech using 4-layer TTS with immediate fallback
  const speakWord = async (word) => {
    console.log('🔊 Speaking word:', word);
    
    // 🔥 PRIORITY 1: Try Google Cloud TTS first (high quality)
    try {
      await textToSpeech(word, {
        autoPlay: true,
        preferredLayer: 'gemini', // Force Google Cloud TTS
        mode: 'pronunciation' // 🎯 Normal speed (1.0x) for clear pronunciation practice
      });
      console.log('✅ Google Cloud TTS succeeded');
      return; // Success - exit early
    } catch (error) {
      console.error('⚠️ Google Cloud TTS failed, falling back to browser TTS:', error);
    }
    
    // 🔥 FALLBACK: Browser TTS (if Google Cloud fails)
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel(); // Clear any pending speech
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 1.0; // Normal speed for pronunciation
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        utterance.onend = () => console.log('✅ Browser TTS finished');
        utterance.onerror = (e) => console.error('❌ Browser TTS error:', e);
        
        window.speechSynthesis.speak(utterance);
        console.log('✅ Browser TTS started (fallback)');
      } catch (browserError) {
        console.error('❌ Browser TTS also failed:', browserError);
      }
    }
  };

  // Handle listen mode
  const handleListen = () => {
    if (currentWord) {
      const wordText = currentWord.word || currentWord.text || '';
      if (wordText) {
        speakWord(wordText);
      }
    }
  };

  // Handle practice attempt with real recording
  const handlePractice = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported. Please use Chrome or Edge.');
      return;
    }

    setPracticeMode('recording');
    setCurrentFeedback(null);
    
    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error('Start error:', error);
      if (error.message && error.message.includes('already started')) {
        recognitionRef.current.stop();
        setTimeout(() => {
          recognitionRef.current.start();
        }, 200);
      }
    }
  };

  // AI-powered pronunciation evaluation
  const evaluatePronunciation = async (spokenText, confidence) => {
    const word = currentWordRef.current;
    if (!word) {
      console.error('❌ No current word available');
      return;
    }

    // Support different field names for word text
    const targetWord = (word.word || word.text || '').toLowerCase().trim();
    const wordMeaning = word.meaning || word.definition_vi || word.definition_en || '';
    
    if (!targetWord) {
      console.error('❌ Target word is empty');
      return;
    }
    
    try {
      // Prepare context for AI evaluation - HOÀN TOÀN TIẾNG VIỆT
      const prompt = `Bạn là Ms. Nova, giáo viên phát âm tiếng Anh chuyên nghiệp. Học sinh đang luyện phát âm từ "${targetWord}".

**Từ mục tiêu:** ${targetWord}
**Nghĩa:** ${wordMeaning}
**Học sinh đã nói:** "${spokenText}"
**Độ chính xác nhận diện giọng nói:** ${(confidence * 100).toFixed(1)}%

**Nhiệm vụ của bạn:**
1. Kiểm tra xem học sinh có nói đúng từ không (cho phép biến thể nhỏ như số nhiều, thì khác nhau)
2. Đánh giá độ chính xác phát âm (0-100 điểm)
3. Đưa ra nhận xét cụ thể, khích lệ bằng TIẾNG VIỆT

**Định dạng trả lời (JSON):**
{
  "correct": true/false,
  "score": 0-100,
  "feedback": "Nhận xét ngắn gọn, khích lệ bằng tiếng Việt (tối đa 30 từ)",
  "tip": "Mẹo phát âm (nếu điểm < 80, viết bằng tiếng Việt)"
}

**Ví dụ:**
- Học sinh nói "name" cho "name" → {"correct": true, "score": 95, "feedback": "Tuyệt vời! Phát âm rất rõ ràng! 🌟"}
- Học sinh nói "nem" cho "name" → {"correct": true, "score": 75, "feedback": "Khá tốt! Hãy nhấn mạnh âm 'ei' hơn một chút.", "tip": "Đọc là 'NEI-M' (nei-m), không phải 'NEM'"}
- Học sinh nói "age" cho "name" → {"correct": false, "score": 0, "feedback": "Ồ! Đó không phải là từ đúng. Hãy nghe lại và thử nói 'name'."}

**LƯU Ý QUAN TRỌNG:**
- Tất cả nhận xét phải bằng TIẾNG VIỆT
- Giọng điệu thân thiện, động viên
- Nếu sai hoàn toàn (nói sai từ), score = 0
- Nếu phát âm gần đúng nhưng chưa chuẩn, score = 60-85
- Chỉ cho điểm 90+ khi phát âm thực sự tốt

Chỉ trả lời JSON, không thêm text nào khác.`;

      const response = await getAiTutorResponse({
        history: [],
        message: prompt
      });

      let evaluation;
      try {
        // Try to extract JSON from response
        const jsonMatch = response.data.response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          evaluation = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found in response');
        }
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        // Fallback: simple string matching
        const isCorrect = spokenText.includes(targetWord) || targetWord.includes(spokenText);
        const similarity = calculateSimilarity(spokenText, targetWord);
        
        evaluation = {
          correct: isCorrect && similarity > 0.6,
          score: isCorrect ? Math.round(similarity * 100) : 0,
          feedback: isCorrect 
            ? `Khá tốt! Em đã nói "${spokenText}".`
            : `Hmm, cô nghe em nói "${spokenText}". Hãy thử nói "${targetWord}" lại nhé.`
        };
      }

      // Record attempt
      const word = currentWordRef.current;
      const attemptRecord = {
        word: word?.word || word?.text || '',
        spoken: spokenText,
        score: evaluation.score,
        correct: evaluation.correct,
        timestamp: Date.now()
      };
      const newAttempts = [...attempts, attemptRecord];
      setAttempts(newAttempts);

      // Tăng số lần thử
      const newAttemptCount = attemptCount + 1;
      setAttemptCount(newAttemptCount);
      
      // 🔥 Save progress to Universal Progress System
      const wordsPracticed = savedData.wordsPracticed || {};
      wordsPracticed[word?.word || word?.text] = evaluation.score;
      
      saveProgress({
        wordsPracticed,
        attempts: newAttempts,
        currentWordIndex,
        correctCount: evaluation.correct ? correctCount + 1 : correctCount,
        lastPracticeAt: new Date().toISOString()
      }, false, Math.min(100, Object.keys(wordsPracticed).length * 10));

      // LOGIC MỚI: Sau 5 lần thử, tự động cho qua
      const autoPass = newAttemptCount >= 5;
      const isSuccess = (evaluation.correct && evaluation.score >= 70) || autoPass;

      // Update feedback
      setCurrentFeedback({
        success: isSuccess,
        score: evaluation.score,
        message: autoPass && !evaluation.correct 
          ? `Bạn đã cố gắng rất nhiều! (${newAttemptCount} lần). Chúng ta sẽ chuyển từ tiếp theo nhé! 💪`
          : autoPass && evaluation.score < 70
          ? `Tốt lắm! Bạn đã cố gắng ${newAttemptCount} lần. Cô thấy bạn đã tiến bộ! Hãy chuyển từ tiếp hoặc luyện thêm. 🌟`
          : evaluation.feedback,
        tip: evaluation.tip,
        spokenText,
        attemptCount: newAttemptCount,
        autoPass: autoPass
      });

      // If successful hoặc sau 5 lần, mark as complete
      if (isSuccess) {
        setCorrectCount(prev => prev + 1);
        setPracticeMode('complete');
      } else {
        // Allow retry
        setPracticeMode('listen');
      }

    } catch (error) {
      console.error('AI evaluation error:', error);
      
      // Fallback: Basic matching
      const word = currentWordRef.current;
      const targetWord = (word?.word || word?.text || '').toLowerCase().trim();
      const isMatch = targetWord && (spokenText.includes(targetWord) || targetWord.includes(spokenText));
      
      setCurrentFeedback({
        success: isMatch,
        score: isMatch ? 80 : 30,
        message: isMatch 
          ? `Tốt lắm! Em đã nói "${spokenText}". Tiếp tục luyện tập nhé!`
          : `Cô nghe em nói "${spokenText}". Hãy thử nói "${targetWord}" rõ hơn nhé.`,
        spokenText
      });

      if (isMatch) {
        setCorrectCount(prev => prev + 1);
        setPracticeMode('complete');
      } else {
        setPracticeMode('listen');
      }
    }
  };

  // Simple similarity calculator (Levenshtein distance)
  const calculateSimilarity = (str1, str2) => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = (s1, s2) => {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();
      const costs = [];
      for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
          if (i === 0) {
            costs[j] = j;
          } else if (j > 0) {
            let newValue = costs[j - 1];
            if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            }
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
        if (i > 0) costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    };
    
    return (longer.length - editDistance(longer, shorter)) / longer.length;
  };

  // Move to next word
  const handleNext = () => {
    if (currentWordIndex < totalWords - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setPracticeMode('listen');
      setAttemptCount(0); // Reset số lần thử
      setCurrentFeedback(null);
    }
  };

  // Reset practice
  const handleReset = () => {
    setCurrentWordIndex(0);
    setPracticeMode('listen');
    setCorrectCount(0);
    setAttemptCount(0);
    setCurrentFeedback(null);
  };

  if (!weekData || !currentWord) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading pronunciation practice...</p>
      </div>
    );
  }

  const isLastWord = currentWordIndex === totalWords - 1;
  const allComplete = practiceMode === 'complete' && isLastWord;

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-green-50 to-teal-50">
      {/* Header */}
      <div className="bg-white border-b border-green-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Mic size={20} className="text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Pronunciation Practice</h2>
              <p className="text-xs text-gray-500">Listen carefully and repeat</p>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">
                Word {currentWordIndex + 1} / {totalWords}
              </p>
              <p className="text-xs text-green-600">
                {correctCount} practiced
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        {allComplete ? (
          // Completion Screen
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Great Job! 🎉
            </h3>
            <p className="text-gray-600 mb-6">
              You practiced {totalWords} words from Week {currentWeek}!
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2 mx-auto"
            >
              <RotateCcw size={20} />
              <span>Practice Again</span>
            </button>
          </div>
        ) : (
          // Practice Card
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
            {/* Word Display */}
            <div className="text-center mb-8">
              <h3 className="text-5xl font-bold text-gray-800 mb-4">
                {currentWord.word || currentWord.text || ''}
              </h3>
              <p className="text-xl text-gray-600 mb-2">
                {currentWord.meaning || currentWord.definition_vi || currentWord.definition_en || ''}
              </p>
              {(currentWord.pronunciation || currentWord.pronunciation_ipa) && (
                <p className="text-sm text-gray-500 font-mono">
                  /{currentWord.pronunciation || currentWord.pronunciation_ipa}/
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {practiceMode === 'listen' && (
                <>
                  <button
                    onClick={handleListen}
                    className="w-full py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center space-x-3 text-lg font-medium"
                  >
                    <Volume2 size={24} />
                    <span>Listen to Ms. Nova</span>
                  </button>
                  
                  <button
                    onClick={handlePractice}
                    className="w-full py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center space-x-3 text-lg font-medium"
                  >
                    <Mic size={24} />
                    <span>I'm Ready to Say It!</span>
                  </button>

                  {/* Show previous feedback if exists */}
                  {currentFeedback && !currentFeedback.success && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-yellow-800 mb-1">
                            {currentFeedback.message}
                          </p>
                          {currentFeedback.tip && (
                            <p className="text-xs text-yellow-700">
                              💡 {currentFeedback.tip}
                            </p>
                          )}
                          {currentFeedback.spokenText && (
                            <p className="text-xs text-yellow-600 mt-2">
                              You said: "{currentFeedback.spokenText}"
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {(practiceMode === 'recording' || isListening) && (
                <div className="text-center py-8">
                  <div className="animate-pulse">
                    <div className="relative inline-block">
                      <Mic size={48} className="text-red-500 mb-4" />
                      <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75"></div>
                    </div>
                    <p className="text-lg text-gray-600 font-medium">Recording...</p>
                    <p className="text-sm text-gray-500 mt-2">Say the word clearly!</p>
                  </div>
                </div>
              )}

              {practiceMode === 'evaluating' && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                  <p className="text-lg text-gray-600">Ms. Nova is checking...</p>
                </div>
              )}

              {practiceMode === 'complete' && currentFeedback && (
                <div className="text-center">
                  {currentFeedback.success ? (
                    <>
                      <CheckCircle2 size={48} className="mx-auto text-green-500 mb-4" />
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <p className="text-lg font-medium text-green-700 mb-2">
                          {currentFeedback.message}
                        </p>
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">
                            {currentFeedback.score}
                          </span>
                          <span className="text-sm text-green-600">/100</span>
                        </div>
                        {currentFeedback.attemptCount && (
                          <p className="text-xs text-green-600 mt-2">
                            Số lần thử: {currentFeedback.attemptCount}
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle size={48} className="mx-auto text-orange-500 mb-4" />
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                        <p className="text-lg font-medium text-orange-700 mb-2">
                          {currentFeedback.message}
                        </p>
                        {currentFeedback.tip && (
                          <p className="text-sm text-orange-600 mt-2">
                            💡 {currentFeedback.tip}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                  
                  {/* 2 NÚT: Next + Try Again (sau 5 lần hoặc success) */}
                  {!isLastWord && currentFeedback.success && (
                    <div className="space-y-2">
                      <button
                        onClick={handleNext}
                        className="w-full py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium"
                      >
                        Next Word →
                      </button>
                      {currentFeedback.autoPass && (
                        <button
                          onClick={() => {
                            setPracticeMode('listen');
                            setCurrentFeedback(null);
                          }}
                          className="w-full py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
                        >
                          🔄 Try Again (Luyện thêm)
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Hint */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                💡 Tip: Listen carefully, then try to copy Ms. Nova's pronunciation
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Progress Bar */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm font-medium text-gray-800">
              {Math.round((correctCount / totalWords) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(correctCount / totalWords) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PronunciationTab;
