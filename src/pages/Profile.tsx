import { useState } from 'react';
import { 
  User, Mail, Lock, Globe, Camera, Save, 
  Check, ChevronRight, BookOpen, Clock, Trophy, Flame 
} from 'lucide-react';
import Header from '../components/layout/Header';
import { useAuthStore, useProgressStore } from '../store';

function Profile() {
  const { user, logout } = useAuthStore();
  const { progress } = useProgressStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });

  const stats = [
    { icon: Clock, label: '总学习时长', value: `${Math.floor(progress.statistics.totalStudyTime / 60)}小时`, color: 'text-indigo-600' },
    { icon: Flame, label: '连续学习', value: `${progress.statistics.streakDays}天`, color: 'text-amber-500' },
    { icon: BookOpen, label: '学习单词', value: progress.vocabularyProgress.totalLearned.toString(), color: 'text-emerald-600' },
    { icon: Trophy, label: '获得成就', value: '8个', color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                alt={user?.username || 'User'}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all">
                <Camera className="w-4 h-4 text-indigo-600" />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{user?.username || '学习者'}</h1>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  Lv.{user?.level || 1}
                </span>
              </div>
              <p className="text-indigo-100 mb-4">{user?.email}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span>学习 {user?.preferredLanguages?.length || 0} 门语言</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  <span>获得 {user?.experience || 0} 经验值</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">个人设置</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isEditing
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 inline mr-2" />
                  保存
                </>
              ) : (
                '编辑资料'
              )}
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                用户名
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-600 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                邮箱地址
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-600 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                密码
              </label>
              <button className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-left text-gray-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex items-center justify-between">
                <span>••••••••</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Learning Languages */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">学习语言</h2>
          <div className="space-y-4">
            {user?.preferredLanguages?.map((lang, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-2xl text-white">
                    {lang === 'english' ? '🇬🇧' : lang === 'japanese' ? '🇯🇵' : '🇰🇷'}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {lang === 'english' ? '英语' : lang === 'japanese' ? '日语' : '韩语'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {user.learningGoals?.[index]?.targetLevel || 'A1'} 级别目标
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-500" />
                  <span className="text-emerald-600 font-medium">学习中</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">账户管理</h2>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-gray-900">学习目标设置</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-gray-900">隐私设置</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-gray-900">成就展示</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button
              onClick={logout}
              className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-all"
            >
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-red-600" />
                <span className="font-medium text-red-600">退出登录</span>
              </div>
              <ChevronRight className="w-5 h-5 text-red-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
