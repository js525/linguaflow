import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Clock, Target, Flame, Star, Play, Brain, Mic, Headphones, SpellCheck, Users, ChevronRight 
} from 'lucide-react';
import Header from '../components/layout/Header';
import { useAuthStore, useProgressStore, useCourseStore } from '../store';

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { progress, dailyGoal } = useProgressStore();
  const { courses } = useCourseStore();

  const learningModules = [
    { 
      icon: SpellCheck, 
      title: '单词记忆', 
      description: '闪卡学习、智能复习',
      path: '/learn/vocabulary',
      color: 'from-indigo-500 to-indigo-600'
    },
    { 
      icon: Brain, 
      title: '语法练习', 
      description: '互动讲解、实战练习',
      path: '/learn/grammar',
      color: 'from-emerald-500 to-emerald-600'
    },
    { 
      icon: Mic, 
      title: '口语跟读', 
      description: '智能评分、即时反馈',
      path: '/learn/speaking',
      color: 'from-amber-500 to-amber-600'
    },
    { 
      icon: Headphones, 
      title: '听力训练', 
      description: '分级材料、变速播放',
      path: '/learn/listening',
      color: 'from-purple-500 to-purple-600'
    },
  ];

  const recommendedCourses = courses.slice(0, 3);

  const stats = [
    { icon: Clock, label: '总学习时长', value: `${Math.floor(progress.statistics.totalStudyTime / 60)}小时`, color: 'text-indigo-600' },
    { icon: Flame, label: '连续学习', value: `${progress.statistics.streakDays}天`, color: 'text-amber-500' },
    { icon: Target, label: '正确率', value: `${Math.round(progress.statistics.correctRate * 100)}%`, color: 'text-emerald-600' },
    { icon: BookOpen, label: '学习单词', value: progress.vocabularyProgress.totalLearned.toString(), color: 'text-purple-600' },
  ];

  const dailyProgress = [
    { label: '学习时长', current: dailyGoal.completedMinutes, target: dailyGoal.targetMinutes, color: 'bg-indigo-500' },
    { label: '学习单词', current: dailyGoal.learnedWords, target: dailyGoal.targetWords, color: 'bg-emerald-500' },
    { label: '完成练习', current: dailyGoal.completedExercises, target: dailyGoal.targetExercises, color: 'bg-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            你好，{user?.username || '学习者'} 👋
          </h1>
          <p className="text-gray-600">继续保持，今天的学习进度很棒！</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className={`${stat.color} bg-opacity-10 p-2 rounded-lg`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Daily Goals */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">今日目标</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>连续{progress.statistics.streakDays}天</span>
              </div>
            </div>
            
            <div className="space-y-6">
              {dailyProgress.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <span className="text-sm text-gray-500">
                      {item.current} / {item.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min((item.current / item.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-6 text-white">
            <h2 className="text-xl font-bold mb-4">快速开始</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/courses')}
                className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-3 transition-all"
              >
                <Play className="w-5 h-5" />
                <span>继续上次学习</span>
                <ChevronRight className="w-4 h-4 ml-auto" />
              </button>
              <button
                onClick={() => navigate('/learn/vocabulary')}
                className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-3 transition-all"
              >
                <BookOpen className="w-5 h-5" />
                <span>复习单词</span>
                <ChevronRight className="w-4 h-4 ml-auto" />
              </button>
              <button
                onClick={() => navigate('/community')}
                className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-3 transition-all"
              >
                <Users className="w-5 h-5" />
                <span>参与讨论</span>
                <ChevronRight className="w-4 h-4 ml-auto" />
              </button>
            </div>
          </div>
        </div>

        {/* Learning Modules */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">互动学习模块</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningModules.map((module, index) => (
              <div
                key={index}
                onClick={() => navigate(module.path)}
                className="group bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <module.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{module.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                <div className="flex items-center text-indigo-600 font-semibold text-sm">
                  <span>开始学习</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">推荐课程</h2>
            <button
              onClick={() => navigate('/courses')}
              className="flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
            >
              查看全部
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/courses/${course.id}`)}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-gray-100 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      {course.level}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="font-semibold text-gray-900">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.enrolledCount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ability Radar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">能力雷达图</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-indigo-100 to-emerald-100 rounded-full opacity-50" />
              </div>
              <div className="relative z-10 grid grid-cols-2 gap-4">
                {Object.entries(progress.abilityRadar).map(([ability, value]) => (
                  <div key={ability} className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-2 capitalize">{ability === 'listening' ? '听力' : ability === 'speaking' ? '口语' : ability === 'reading' ? '阅读' : '写作'}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full transition-all"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-center">
                <div className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                  {Math.round(
                    (progress.abilityRadar.listening +
                      progress.abilityRadar.speaking +
                      progress.abilityRadar.reading +
                      progress.abilityRadar.writing) / 4
                  )}%
                </div>
                <div className="text-gray-600">综合能力</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
