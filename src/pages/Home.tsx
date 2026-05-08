import { useNavigate } from 'react-router-dom';
import { Globe, BookOpen, Users, Trophy, Star, Play, ArrowRight, Sparkles } from 'lucide-react';
import Header from '../components/layout/Header';
import { useAuthStore } from '../store';
import { mockCourses } from '../data/mockData';

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const features = [
    {
      icon: BookOpen,
      title: '分级课程体系',
      description: '从A1到C2，循序渐进的课程设置，匹配你的学习水平',
      color: 'bg-indigo-500',
    },
    {
      icon: Users,
      title: '互动式学习',
      description: '单词记忆、语法练习、口语跟读、听力训练，全方位提升',
      color: 'bg-emerald-500',
    },
    {
      icon: Trophy,
      title: '成就激励系统',
      description: '丰富的成就徽章，等级系统，学习更有动力',
      color: 'bg-amber-500',
    },
    {
      icon: Sparkles,
      title: '个性化推荐',
      description: '智能学习路径，根据你的水平和目标定制学习计划',
      color: 'bg-purple-500',
    },
  ];

  const languages = [
    { name: '英语', flag: '🇬🇧', code: 'english', description: '全球通用语言，商务交流必备' },
    { name: '日语', flag: '🇯🇵', code: 'japanese', description: '走进动漫、游戏与商务的桥梁' },
    { name: '韩语', flag: '🇰🇷', code: 'korean', description: '探索K-pop与韩国文化的钥匙' },
  ];

  const popularCourses = mockCourses.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-emerald-600/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              支持3大主流语种
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              开启你的
              <span className="bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                多语种学习
              </span>
              <br />
              之旅
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              LinguaFlow 提供沉浸式语言学习体验，通过智能学习路径、互动式练习和成就激励系统，
              让你轻松掌握英语、日语、韩语等多门语言
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {!isAuthenticated && (
                <>
                  <button
                    onClick={() => navigate('/register')}
                    className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-indigo-200 transition-all duration-300 flex items-center gap-2"
                  >
                    立即开始
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-200 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-all duration-300"
                  >
                    已有账号登录
                  </button>
                </>
              )}
              {isAuthenticated && (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-indigo-200 transition-all duration-300 flex items-center gap-2"
                >
                  进入学习
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-gray-500">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                <span className="font-semibold text-gray-900">4.9</span>
                <span>用户评分</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-500" />
                <span className="font-semibold text-gray-900">50,000+</span>
                <span>学习者</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-500" />
                <span className="font-semibold text-gray-900">200+</span>
                <span>精品课程</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              选择你的学习语言
            </h2>
            <p className="text-xl text-gray-600">
              从零基础到精通，我们为你准备了完整的学习路径
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {languages.map((lang) => (
              <div
                key={lang.code}
                className="group relative bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-2xl p-8 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => isAuthenticated && navigate('/courses')}
              >
                <div className="text-6xl mb-6">{lang.flag}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{lang.name}</h3>
                <p className="text-gray-600 mb-6">{lang.description}</p>
                <div className="flex items-center text-indigo-600 font-semibold group-hover:gap-2 transition-all">
                  <span>开始学习</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 to-indigo-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              为什么选择 LinguaFlow？
            </h2>
            <p className="text-xl text-gray-600">
              专业、有趣、高效的语言学习体验
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">热门课程</h2>
              <p className="text-xl text-gray-600">精选最受欢迎的学习内容</p>
            </div>
            <button
              onClick={() => navigate('/courses')}
              className="hidden md:flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
            >
              查看全部
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCourses.map((course) => (
              <div
                key={course.id}
                className="group bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-indigo-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      {course.level}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
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
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            准备好开始学习了吗？
          </h2>
          <p className="text-xl text-indigo-100 mb-10">
            加入50,000+学习者的行列，开启你的语言学习之旅
          </p>
          {!isAuthenticated && (
            <button
              onClick={() => navigate('/register')}
              className="group px-10 py-5 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all duration-300 inline-flex items-center gap-2 shadow-xl"
            >
              立即免费注册
              <Play className="w-5 h-5" />
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-8 h-8 text-indigo-400" />
                <span className="text-xl font-bold text-white">LinguaFlow</span>
              </div>
              <p className="text-sm">
                沉浸式多语种学习平台，让语言学习变得简单有趣。
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">学习资源</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">英语课程</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">日语课程</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">韩语课程</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">关于我们</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">公司介绍</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">联系我们</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">加入团队</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">支持</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">帮助中心</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">用户指南</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">常见问题</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 LinguaFlow. 保留所有权利。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
