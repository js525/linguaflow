import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, Clock, Users, Star, Check, BookOpen, 
  ChevronRight, Award, Share2, Download 
} from 'lucide-react';
import Header from '../components/layout/Header';
import { useCourseStore, useAuthStore } from '../store';

function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { getCourseById } = useCourseStore();
  const { isAuthenticated } = useAuthStore();
  
  const course = getCourseById(courseId || '');

  const handleStartLearning = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/learn/vocabulary');
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">课程未找到</h2>
          <button onClick={() => navigate('/courses')} className="text-indigo-600 hover:text-indigo-700">
            返回课程中心
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-8 mb-8 text-white">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {course.level}
                </span>
                <span className="text-2xl">
                  {course.language === 'english' ? '🇬🇧' : course.language === 'japanese' ? '🇯🇵' : '🇰🇷'}
                </span>
                <span className="text-indigo-200">
                  {course.language === 'english' ? '英语' : course.language === 'japanese' ? '日语' : '韩语'}
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-indigo-100 mb-6">{course.description}</p>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="font-bold">{course.rating}</span>
                  <span className="text-indigo-200">评分</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="font-bold">{course.enrolledCount.toLocaleString()}</span>
                  <span className="text-indigo-200">人学习</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-bold">{course.totalDuration}</span>
                  <span className="text-indigo-200">分钟</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleStartLearning}
                  className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-lg"
                >
                  <Play className="w-5 h-5" />
                  {isAuthenticated ? '开始学习' : '登录后学习'}
                </button>
                <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-all">
                  <Share2 className="w-5 h-5" />
                  分享
                </button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-64 object-cover rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white/90 backdrop-blur-sm rounded-full p-4 hover:bg-white transition-all shadow-xl">
                  <Play className="w-8 h-8 text-indigo-600 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* What You'll Learn */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">你将学到</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  '掌握基础词汇和表达',
                  '提升听说读写能力',
                  '了解语言文化背景',
                  '建立学习信心',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-emerald-100 rounded-full p-1 flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">课程内容</h2>
                <span className="text-gray-600">{course.lessons.length}节课</span>
              </div>
              
              <div className="space-y-3">
                {course.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="border-2 border-gray-100 rounded-xl p-4 hover:border-indigo-300 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                        lesson.isCompleted 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'bg-indigo-100 text-indigo-600'
                      }`}>
                        {lesson.isCompleted ? (
                          <Check className="w-6 h-6" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{lesson.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {lesson.duration}分钟
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {lesson.type === 'video' ? '视频' : lesson.type === 'reading' ? '阅读' : '练习'}
                          </span>
                        </div>
                      </div>
                      {lesson.isCompleted ? (
                        <div className="text-emerald-600 font-semibold">已完成</div>
                      ) : (
                        <button 
                          onClick={handleStartLearning}
                          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
                        >
                          <Play className="w-4 h-4" />
                          开始
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Instructor */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">课程特点</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-700">专业教学团队</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span className="text-gray-700">终身访问权限</span>
                </div>
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-amber-600" />
                  <span className="text-gray-700">可下载学习资料</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">学习社区支持</span>
                </div>
              </div>
            </div>

            {/* Related Courses */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">相关课程</h3>
              <div className="space-y-4">
                {[
                  { title: '进阶语法专项', lessons: 20, level: 'B1' },
                  { title: '商务口语实战', lessons: 15, level: 'B2' },
                  { title: '文化探索之旅', lessons: 12, level: 'B1' },
                ].map((related, index) => (
                  <div key={index} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-all">
                    <div className="w-16 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {related.level}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{related.title}</h4>
                      <span className="text-xs text-gray-500">{related.lessons}节课</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
