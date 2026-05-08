import { useState } from 'react';
import { 
  RotateCcw, Volume2, Check, X, ChevronLeft, 
  ChevronRight, BookOpen, Flame 
} from 'lucide-react';
import Header from '../components/layout/Header';
import { useCourseStore, useProgressStore } from '../store';

function Vocabulary() {
  const { vocabulary } = useCourseStore();
  const { addVocabulary } = useProgressStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownWords, setKnownWords] = useState<string[]>([]);
  const [learningWords, setLearningWords] = useState<string[]>([]);

  const currentCard = vocabulary[currentIndex];

  const handleKnow = () => {
    if (!knownWords.includes(currentCard.id)) {
      setKnownWords([...knownWords, currentCard.id]);
      addVocabulary();
    }
    nextCard();
  };

  const handleStillLearning = () => {
    if (!learningWords.includes(currentCard.id)) {
      setLearningWords([...learningWords, currentCard.id]);
    }
    nextCard();
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % vocabulary.length);
    }, 100);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + vocabulary.length) % vocabulary.length);
    }, 100);
  };

  const playPronunciation = () => {
    const utterance = new SpeechSynthesisUtterance(currentCard.word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">单词记忆</h1>
          <p className="text-gray-600">使用闪卡学习新词汇，点击卡片查看释义</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="flex items-center justify-center gap-2 text-indigo-600 mb-2">
              <BookOpen className="w-5 h-5" />
              <span className="text-2xl font-bold">{vocabulary.length}</span>
            </div>
            <div className="text-sm text-gray-600">总单词数</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="flex items-center justify-center gap-2 text-emerald-600 mb-2">
              <Check className="w-5 h-5" />
              <span className="text-2xl font-bold">{knownWords.length}</span>
            </div>
            <div className="text-sm text-gray-600">已掌握</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="flex items-center justify-center gap-2 text-amber-600 mb-2">
              <Flame className="w-5 h-5" />
              <span className="text-2xl font-bold">{learningWords.length}</span>
            </div>
            <div className="text-sm text-gray-600">学习中</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">学习进度</span>
            <span className="text-sm text-gray-600">
              {currentIndex + 1} / {vocabulary.length}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / vocabulary.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="mb-8">
          <div
            className="relative w-full h-96 cursor-pointer perspective-1000"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div
              className={`absolute inset-0 w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front */}
              <div
                className={`absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-8 backface-hidden ${
                  isFlipped ? 'invisible' : ''
                }`}
              >
                <div className="text-6xl font-bold text-white mb-4">{currentCard?.word}</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playPronunciation();
                  }}
                  className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white hover:bg-white/30 transition-all"
                >
                  <Volume2 className="w-5 h-5" />
                  发音
                </button>
                <div className="absolute bottom-8 text-indigo-200 text-sm">
                  点击卡片查看释义
                </div>
              </div>

              {/* Back */}
              <div
                className={`absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-8 backface-hidden ${
                  isFlipped ? '' : 'invisible'
                }`}
              >
                <div className="text-4xl font-bold text-white mb-4">{currentCard?.meaning}</div>
                <div className="text-indigo-100 mb-4">{currentCard?.pronunciation}</div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 max-w-md">
                  <div className="text-indigo-100 text-sm mb-2">例句：</div>
                  <div className="text-white">{currentCard?.example}</div>
                  <div className="text-indigo-200 text-sm mt-2">{currentCard?.exampleTranslation}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={prevCard}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            上一张
          </button>
          
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            翻转
          </button>
          
          <button
            onClick={nextCard}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all"
          >
            下一张
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Knowledge Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleStillLearning}
            className="flex items-center gap-2 px-8 py-4 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-all shadow-lg"
          >
            <X className="w-5 h-5" />
            还在学习
          </button>
          <button
            onClick={handleKnow}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all shadow-lg"
          >
            <Check className="w-5 h-5" />
            我认识了
          </button>
        </div>

        {/* Mastery Bar */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">掌握度</h3>
            <span className="text-2xl font-bold text-indigo-600">{currentCard?.mastery}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full rounded-full transition-all"
              style={{ width: `${currentCard?.mastery}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>需要复习</span>
            <span>完全掌握</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vocabulary;
