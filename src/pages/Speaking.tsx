import { useState } from 'react';
import { Mic, Square, Volume2, Star, RefreshCw, Check } from 'lucide-react';
import Header from '../components/layout/Header';

function Speaking() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const sentences = [
    {
      text: 'Hello, how are you today?',
      translation: '你好，今天过得怎么样？',
      difficulty: '初级',
    },
    {
      text: 'I would like to order a cup of coffee, please.',
      translation: '我想要点一杯咖啡，谢谢。',
      difficulty: '中级',
    },
    {
      text: 'Could you please repeat that more slowly?',
      translation: '你能再说一遍吗，慢一点？',
      difficulty: '中级',
    },
  ];

  const current = sentences[currentSentence];

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        const newScore = Math.floor(Math.random() * 20) + 80;
        setScores([...scores, newScore]);
        setShowResult(true);
      }, 3000);
    }
  };

  const playPronunciation = () => {
    const utterance = new SpeechSynthesisUtterance(current.text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const nextSentence = () => {
    setCurrentSentence((prev) => (prev + 1) % sentences.length);
    setShowResult(false);
  };

  const averageScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-indigo-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">口语跟读</h1>
          <p className="text-gray-600">练习标准发音，提升口语流利度</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-1">{scores.length}</div>
            <div className="text-sm text-gray-600">已练习</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-1">{averageScore}</div>
            <div className="text-sm text-gray-600">平均分</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-amber-600 mb-1">
              {scores.length > 0 ? Math.max(...scores) : 0}
            </div>
            <div className="text-sm text-gray-600">最高分</div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">练习进度</span>
            <span className="text-sm text-gray-600">
              {currentSentence + 1} / {sentences.length}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all"
              style={{ width: `${((currentSentence + 1) / sentences.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
              {current.difficulty}
            </span>
            <button
              onClick={playPronunciation}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-all"
            >
              <Volume2 className="w-5 h-5" />
              听发音
            </button>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{current.text}</h2>
            <p className="text-xl text-gray-600">{current.translation}</p>
          </div>

          {showResult && scores.length > 0 && (
            <div className="bg-gradient-to-br from-emerald-50 to-indigo-50 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">你的得分</div>
                  <div className="text-4xl font-bold text-emerald-600">
                    {scores[scores.length - 1]}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < Math.ceil(scores[scores.length - 1] / 20)
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  <span className="font-semibold">发音建议：</span>尝试模仿音频的语调和节奏，注意单词的重音位置。
                </div>
              </div>
            </div>
          )}

          {/* Recording Controls */}
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={toggleRecording}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-xl ${
                isRecording
                  ? 'bg-red-500 animate-pulse hover:bg-red-600'
                  : 'bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800'
              }`}
            >
              {isRecording ? (
                <Square className="w-8 h-8 text-white" />
              ) : (
                <Mic className="w-10 h-10 text-white" />
              )}
            </button>
            <div className="text-center">
              <div className={`text-lg font-semibold ${isRecording ? 'text-red-600' : 'text-gray-700'}`}>
                {isRecording ? '录音中...' : '点击开始录音'}
              </div>
              {isRecording && (
                <div className="mt-2 w-64 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-red-500 h-full animate-pulse" style={{ width: '60%' }} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center">
          <button
            onClick={nextSentence}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            下一句
          </button>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            💡 学习技巧
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>先听标准发音，模仿语调和节奏</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>不要害怕犯错，大胆开口练习</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>注意单词的重音和连读</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Speaking;
