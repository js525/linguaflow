import { useState, useEffect } from 'react';
import { Play, Pause, Volume2, RotateCcw, CheckCircle, SkipForward, Settings } from 'lucide-react';
import Header from '../components/layout/Header';

function Listening() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [scores, setScores] = useState<number[]>([]);

  const tracks = [
    {
      title: '日常对话：餐厅点餐',
      duration: 45,
      difficulty: '初级',
      transcript: 'Hello, welcome to our restaurant. Do you have a reservation?\nNo, I don\'t. Can I still get a table for two?\nOf course. Right this way, please. Here is your menu.\nThank you. What do you recommend?\nI suggest our chef\'s special. It\'s very popular.',
    },
    {
      title: '机场广播：航班信息',
      duration: 60,
      difficulty: '中级',
      transcript: 'Attention passengers. Flight 1234 to Tokyo is now boarding at Gate 7.\nPlease have your boarding pass and identification ready.\nPassengers requiring special assistance will be assisted first.\nWe apologize for any inconvenience caused by the delay.\nThank you for your patience.',
    },
    {
      title: '新闻播报：科技发展',
      duration: 90,
      difficulty: '高级',
      transcript: 'In today\'s top stories, artificial intelligence continues to transform various industries. Companies are increasingly adopting AI-powered solutions to improve efficiency and reduce costs. However, experts warn about the need for responsible AI development to address potential ethical concerns.',
    },
  ];

  const current = tracks[currentTrack];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            const newScore = Math.floor(Math.random() * 20) + 80;
            setScores([...scores, newScore]);
            return 100;
          }
          return prev + (100 / (current.duration * (1 / playbackSpeed)));
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, current.duration, playbackSpeed, scores.length]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setProgress(0);
    setIsPlaying(false);
  };

  const resetTrack = () => {
    setProgress(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const averageScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">听力训练</h1>
          <p className="text-gray-600">通过分级材料提升听力理解能力</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{tracks.length}</div>
            <div className="text-sm text-gray-600">听力材料</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-1">{scores.length}</div>
            <div className="text-sm text-gray-600">已完成</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-amber-600 mb-1">{averageScore}</div>
            <div className="text-sm text-gray-600">平均分</div>
          </div>
        </div>

        {/* Main Player */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
              {current.difficulty}
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-500" />
                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                  className="bg-gray-100 border-0 rounded-lg px-3 py-1 text-sm"
                >
                  <option value="0.5">0.5x</option>
                  <option value="0.75">0.75x</option>
                  <option value="1">1x</option>
                  <option value="1.25">1.25x</option>
                  <option value="1.5">1.5x</option>
                </select>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">{current.title}</h2>
          <p className="text-gray-600 mb-6">
            时长：{formatTime(current.duration)} | 速度：{playbackSpeed}x
          </p>

          {/* Waveform Placeholder */}
          <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl p-8 mb-6">
            <div className="flex items-center justify-center gap-1 h-24">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-gradient-to-t from-purple-500 to-indigo-500 rounded-full transition-all ${
                    (i / 50) * 100 <= progress ? 'opacity-100' : 'opacity-30'
                  }`}
                  style={{
                    height: `${20 + Math.sin(i * 0.3) * 15 + Math.random() * 10}px`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>{formatTime((progress / 100) * current.duration)}</span>
              <span>{formatTime(current.duration)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 cursor-pointer">
              <div
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all"
                style={{ width: `${progress}%` }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const newProgress = ((e.clientX - rect.left) / rect.width) * 100;
                  setProgress(Math.max(0, Math.min(100, newProgress)));
                }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={resetTrack}
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
            >
              <RotateCcw className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" />
              )}
            </button>
            <button
              onClick={nextTrack}
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
            >
              <SkipForward className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                showTranscript
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Volume2 className="w-5 h-5 inline mr-2" />
              原文
            </button>
          </div>

          {/* Transcript */}
          {showTranscript && (
            <div className="mt-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">听力原文</h3>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {current.transcript}
              </p>
            </div>
          )}
        </div>

        {/* Track List */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">听力材料列表</h3>
          <div className="space-y-3">
            {tracks.map((track, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentTrack(index);
                  setProgress(0);
                  setIsPlaying(false);
                }}
                className={`w-full p-4 rounded-xl transition-all text-left flex items-center gap-4 ${
                  currentTrack === index
                    ? 'bg-purple-100 border-2 border-purple-300'
                    : 'bg-gray-50 border-2 border-transparent hover:border-purple-200'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    currentTrack === index
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{track.title}</div>
                  <div className="text-sm text-gray-500">
                    {track.difficulty} • {formatTime(track.duration)}
                  </div>
                </div>
                {scores[index] && (
                  <div className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">{scores[index]}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listening;
