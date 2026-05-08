import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Users, Clock, BookOpen, Grid, List } from 'lucide-react';
import Header from '../components/layout/Header';
import { useCourseStore } from '../store';
import type { Language, Level } from '../types';

function CourseCenter() {
  const navigate = useNavigate();
  const { courses } = useCourseStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<Level | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const languages = [
    { code: 'all' as const, name: '全部', flag: '🌍' },
    { code: 'english' as const, name: '英语', flag: '🇬🇧' },
    { code: 'japanese' as const, name: '日语', flag: '🇯🇵' },
    { code: 'korean' as const, name: '韩语', flag: '🇰🇷' },
  ];

  const levels = [
    { code: 'all' as const, name: '全部级别' },
    { code: 'A1' as const, name: '初级 A1' },
    { code: 'A2' as const, name: '初级 A2' },
    { code: 'B1' as const, name: '中级 B1' },
    { code: 'B2' as const, name: '中级 B2' },
    { code: 'C1' as const, name: '高级 C1' },
    { code: 'C2' as const, name: '高级 C2' },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || course.language === selectedLanguage;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesLanguage && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-4">探索课程</h1>
          <p className="text-indigo-100 mb-6">发现最适合你的学习内容，从零基础到精通</p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索课程..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-300 shadow-lg"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedLanguage === lang.code
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as Level | 'all')}
                className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none"
              >
                {levels.map((level) => (
                  <option key={level.code} value={level.code}>
                    {level.name}
                  </option>
                ))}
              </select>
              
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Course Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            找到 <span className="font-semibold text-gray-900">{filteredCourses.length}</span> 个课程
          </p>
        </div>

        {/* Course Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/courses/${course.id}`)}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-gray-100 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      {course.level}
                    </span>
                    <span className="bg-indigo-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white">
                      {course.language === 'english' ? '🇬🇧' : course.language === 'japanese' ? '🇯🇵' : '🇰🇷'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="font-semibold text-gray-900">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.enrolledCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.totalDuration}分钟</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons.length}节课</span>
                    </div>
                    <button className="text-indigo-600 font-semibold text-sm group-hover:text-indigo-700">
                      查看详情 →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/courses/${course.id}`)}
                className="group bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 cursor-pointer flex gap-6"
              >
                <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                        {course.level}
                      </span>
                      <span className="text-2xl">
                        {course.language === 'english' ? '🇬🇧' : course.language === 'japanese' ? '🇯🇵' : '🇰🇷'}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="font-semibold text-gray-900">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.enrolledCount.toLocaleString()}人学习</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.totalDuration}分钟</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons.length}节课</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">未找到课程</h3>
            <p className="text-gray-600">尝试调整筛选条件或搜索关键词</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCenter;
