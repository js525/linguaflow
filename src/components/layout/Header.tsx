import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../../store';
import {
  Globe,
  Book,
  Users,
  Trophy,
  Menu,
  X,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Home,
} from 'lucide-react';

type Language = 'en' | 'ja' | 'ko';

interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

const languageOptions: LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
];

const navItems = [
  { name: '首页', path: '/', icon: Home },
  { name: '课程中心', path: '/courses', icon: Book },
  { name: '学习模块', path: '/learning', icon: Globe, hasDropdown: true },
  { name: '社区', path: '/community', icon: Users },
  { name: '成就', path: '/achievements', icon: Trophy },
];

const learningModules = [
  { name: '词汇', path: '/learning/vocabulary' },
  { name: '语法', path: '/learning/grammar' },
  { name: '口语', path: '/learning/speaking' },
  { name: '听力', path: '/learning/listening' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLearningDropdownOpen, setIsLearningDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(languageOptions[0]);

  const { isAuthenticated, user, logout } = useAuthStore();

  const languageMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const learningDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (learningDropdownRef.current && !learningDropdownRef.current.contains(event.target as Node)) {
        setIsLearningDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: LanguageOption) => {
    setSelectedLanguage(lang);
    setIsLanguageMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">
              LinguaFlow
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.path} className="relative" ref={item.hasDropdown ? learningDropdownRef : undefined}>
                {item.hasDropdown ? (
                  <button
                    onClick={() => setIsLearningDropdownOpen(!isLearningDropdownOpen)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors duration-200 font-medium"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isLearningDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <a
                    href={item.path}
                    className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors duration-200 font-medium"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </a>
                )}

                {/* Learning Modules Dropdown */}
                {item.hasDropdown && isLearningDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 transform opacity-100 scale-100 transition-all duration-200">
                    {learningModules.map((module) => (
                      <a
                        key={module.path}
                        href={module.path}
                        className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
                      >
                        {module.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative" ref={languageMenuRef}>
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <Globe className="w-5 h-5 text-indigo-600" />
                <span className="hidden sm:inline text-gray-700 font-medium">{selectedLanguage.flag}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isLanguageMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 transform opacity-100 scale-100 transition-all duration-200">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full text-left px-4 py-2 hover:bg-indigo-50 transition-colors duration-150 flex items-center justify-between ${
                        selectedLanguage.code === lang.code ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'
                      }`}
                    >
                      <span>{lang.flag} {lang.label}</span>
                      {selectedLanguage.code === lang.code && (
                        <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 hover:bg-gray-100 rounded-full p-1 transition-colors duration-200"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-9 h-9 rounded-full border-2 border-indigo-600 hover:border-emerald-500 transition-colors duration-200"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 transform opacity-100 scale-100 transition-all duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <a
                        href="/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>个人资料</span>
                      </a>
                      <a
                        href="/settings"
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>设置</span>
                      </a>
                    </div>
                    <div className="border-t border-gray-100 py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>退出登录</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <a
                  href="/login"
                  className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
                >
                  登录
                </a>
                <a
                  href="/register"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  注册
                </a>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <div key={item.path}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setIsLearningDropdownOpen(!isLearningDropdownOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isLearningDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isLearningDropdownOpen && (
                        <div className="ml-8 mt-2 space-y-1">
                          {learningModules.map((module) => (
                            <a
                              key={module.path}
                              href={module.path}
                              className="block px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-150"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {module.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.path}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </a>
                  )}
                </div>
              ))}

              {/* Mobile Auth Buttons */}
              {!isAuthenticated && (
                <div className="pt-4 border-t border-gray-100 mt-4 space-y-2">
                  <a
                    href="/login"
                    className="block px-4 py-3 text-center text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    登录
                  </a>
                  <a
                    href="/register"
                    className="block px-4 py-3 text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    注册
                  </a>
                </div>
              )}

              {/* Mobile User Menu */}
              {isAuthenticated && (
                <div className="pt-4 border-t border-gray-100 mt-4 space-y-1">
                  <a
                    href="/profile"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">个人资料</span>
                  </a>
                  <a
                    href="/settings"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">设置</span>
                  </a>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">退出登录</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
