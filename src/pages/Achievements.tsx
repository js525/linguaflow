import { useState } from 'react';
import { 
  Trophy, Medal, Crown, 
  TrendingUp, Flame, Award, BookOpen as BookOpenIcon, Globe as GlobeIcon, Users 
} from 'lucide-react';
import Header from '../components/layout/Header';
import { useCourseStore, useAuthStore, useProgressStore } from '../store';

function Achievements() {
  const { achievements } = useCourseStore();
  const { user } = useAuthStore();
  const { progress } = useProgressStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: '全部', icon: Trophy, color: 'text-indigo-600' },
    { id: 'learning', name: '学习', icon: Flame, color: 'text-amber-500' },
    { id: 'knowledge', name: '知识', icon: BookOpenIcon, color: 'text-emerald-600' },
    { id: 'exploration', name: '探索', icon: GlobeIcon, color: 'text-purple-600' },
    { id: 'community', name: '社区', icon: Users, color: 'text-blue-600' },
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalCount = achievements.length;
  const completionRate = Math.round((unlockedCount / totalCount) * 100);

  const levelProgress = (user?.experience || 0) % 100;
  const currentLevel = user?.level || 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-indigo-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">成就中心</h1>
          <p className="text-gray-600">完成挑战，解锁成就徽章，提升你的等级</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white text-center">
            <div className="text-4xl font-bold mb-2">{unlockedCount}</div>
            <div className="flex items-center justify-center gap-2">
              <Award className="w-5 h-5" />
              <span>已解锁</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white text-center">
            <div className="text-4xl font-bold mb-2">{totalCount}</div>
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5" />
              <span>总成就</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white text-center">
            <div className="text-4xl font-bold mb-2">{completionRate}%</div>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span>完成率</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white text-center">
            <div className="text-4xl font-bold mb-2">{progress.statistics.streakDays}</div>
            <div className="flex items-center justify-center gap-2">
              <Flame className="w-5 h-5" />
              <span>连续天数</span>
            </div>
          </div>
        </div>

        {/* User Level */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {currentLevel}
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">学习者等级 L{currentLevel}</div>
                <div className="text-gray-600">
                  距离下一级还需 {100 - levelProgress} 经验值
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">当前经验</div>
                <div className="text-2xl font-bold text-indigo-600">{user?.experience || 0}</div>
              </div>
              <Medal className="w-12 h-12 text-amber-500" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full transition-all"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon className={`w-4 h-4 ${category.color}`} />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative bg-white rounded-2xl p-6 shadow-sm border-2 transition-all ${
                achievement.isUnlocked
                  ? 'border-amber-300 hover:shadow-lg'
                  : 'border-gray-200 opacity-75'
              }`}
            >
              {achievement.isUnlocked && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white shadow-lg">
                  ✓
                </div>
              )}
              
              <div className="flex items-start gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
                    achievement.isUnlocked
                      ? 'bg-gradient-to-br from-amber-100 to-amber-200'
                      : 'bg-gray-100'
                  }`}
                >
                  {achievement.isUnlocked ? achievement.icon : '🔒'}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{achievement.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {achievement.category === 'learning' && '🏆 学习成就'}
                      {achievement.category === 'knowledge' && '📚 知识成就'}
                      {achievement.category === 'exploration' && '🌍 探索成就'}
                      {achievement.category === 'community' && '👥 社区成就'}
                    </span>
                    {!achievement.isUnlocked && (
                      <span className="text-xs text-indigo-600 font-medium">
                        {achievement.requirement.count} / {achievement.requirement.count}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {achievement.isUnlocked && achievement.unlockedAt && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    解锁时间：{new Date(achievement.unlockedAt).toLocaleDateString('zh-CN')}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Level Benefits */}
        <div className="mt-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Crown className="w-6 h-6" />
            等级特权
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { level: 5, benefit: '解锁高级课程', icon: '📚' },
              { level: 10, benefit: '专属学习路径', icon: '🛤️' },
              { level: 20, benefit: 'AI智能辅导', icon: '🤖' },
              { level: 30, benefit: 'VIP专属客服', icon: '💬' },
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center p-4 rounded-xl ${
                  currentLevel >= item.level
                    ? 'bg-white/20'
                    : 'bg-white/10'
                }`}
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <div className="font-bold mb-1">L{item.level}</div>
                <div className={`text-sm ${currentLevel >= item.level ? 'text-white' : 'text-white/60'}`}>
                  {item.benefit}
                </div>
                {currentLevel >= item.level && (
                  <div className="mt-2 text-xs bg-emerald-500 rounded-full px-2 py-1 inline-block">
                    已解锁
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            排行榜
          </h2>
          <div className="space-y-4">
            {[
              { rank: 1, name: '语言大师', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rank1', level: 45, exp: 12450 },
              { rank: 2, name: '学习狂人', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rank2', level: 42, exp: 11200 },
              { rank: 3, name: '单词达人', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rank3', level: 38, exp: 9800 },
              { rank: 4, name: '进步之星', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rank4', level: 35, exp: 8500 },
              { rank: 5, name: '坚持达人', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rank5', level: 32, exp: 7200 },
            ].map((user, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                  index === 0
                    ? 'bg-gradient-to-r from-amber-50 to-amber-100 border-2 border-amber-300'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  index === 0
                    ? 'bg-amber-500 text-white'
                    : index === 1
                    ? 'bg-gray-400 text-white'
                    : index === 2
                    ? 'bg-amber-700 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {user.rank}
                </div>
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <div className="font-bold text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-600">L{user.level}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-indigo-600">{user.exp.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">经验值</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Achievements;
