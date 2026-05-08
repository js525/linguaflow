import { useState } from 'react';
import { Check, X, Lightbulb, ArrowRight, BookOpen, Target, ChevronRight } from 'lucide-react';
import Header from '../components/layout/Header';

function Grammar() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const exercises = [
    {
      question: 'She ___ to the market yesterday.',
      options: ['go', 'goes', 'went', 'going'],
      correctAnswer: 'went',
      explanation: '"Yesterday" 表示过去时间，需要使用动词的过去式 "went"。',
    },
    {
      question: 'If I ___ rich, I would travel the world.',
      options: ['am', 'was', 'were', 'be'],
      correctAnswer: 'were',
      explanation: '在虚拟语气中，表示与现在事实相反的假设时使用 "were"。',
    },
    {
      question: 'The book ___ on the table.',
      options: ['lay', 'lies', 'laid', 'lied'],
      correctAnswer: 'lies',
      explanation: '"lies" 是 "lie" 的第三人称单数现在式，表示"躺；位于"。',
    },
    {
      question: 'I have been learning English ___ three years.',
      options: ['for', 'since', 'from', 'to'],
      correctAnswer: 'for',
      explanation: '"for + 时间段" 用于现在完成时，表示持续的时间。',
    },
    {
      question: 'He asked me where ___.',
      options: ['do I live', 'I live', 'did I live', 'I lived'],
      correctAnswer: 'I live',
      explanation: '间接疑问句中不使用倒装语序，陈述句语序。',
    },
  ];

  const current = exercises[currentExercise];

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    if (answer === current.correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextExercise = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentExercise((prev) => prev + 1);
  };

  const resetExercise = () => {
    setCurrentExercise(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const progress = ((currentExercise + (showResult ? 1 : 0)) / exercises.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-indigo-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">语法练习</h1>
          <p className="text-gray-600">通过互动练习掌握语法规则</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">练习进度</span>
            <span className="text-sm text-gray-600">
              {currentExercise + 1} / {exercises.length}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-emerald-500 to-indigo-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Score */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white text-center">
            <div className="text-4xl font-bold mb-2">{score}</div>
            <div className="flex items-center justify-center gap-2">
              <Check className="w-5 h-5" />
              <span>正确答案</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white text-center">
            <div className="text-4xl font-bold mb-2">{exercises.length - score}</div>
            <div className="flex items-center justify-center gap-2">
              <Target className="w-5 h-5" />
              <span>还需努力</span>
            </div>
          </div>
        </div>

        {currentExercise < exercises.length ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-6">
              <BookOpen className="w-5 h-5" />
              <span>语法练习 {currentExercise + 1}</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-8">{current.question}</h2>

            <div className="space-y-4 mb-8">
              {current.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    showResult
                      ? option === current.correctAnswer
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-700'
                        : option === selectedAnswer
                        ? 'bg-red-100 border-red-500 text-red-700'
                        : 'bg-gray-50 border-gray-200 text-gray-500'
                      : 'bg-gray-50 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showResult && option === current.correctAnswer && (
                      <Check className="w-5 h-5 text-emerald-600" />
                    )}
                    {showResult && option === selectedAnswer && option !== current.correctAnswer && (
                      <X className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showResult && (
              <div className="bg-gradient-to-br from-indigo-50 to-emerald-50 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">解析</h3>
                    <p className="text-gray-700">{current.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {showResult && (
              <div className="flex justify-center">
                <button
                  onClick={nextExercise}
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-lg"
                >
                  {currentExercise < exercises.length - 1 ? (
                    <>
                      下一题
                      <ArrowRight className="w-5 h-5" />
                    </>
                  ) : (
                    '完成练习'
                  )}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-emerald-500 to-indigo-600 rounded-2xl p-8 text-white text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-4">练习完成！</h2>
            <p className="text-2xl mb-8">
              你答对了 <span className="font-bold">{score}</span> / {exercises.length} 题
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={resetExercise}
                className="flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
                再练一次
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Grammar;
