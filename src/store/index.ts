import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Progress, DailyGoal, VocabularyCard, Achievement, Language, Comment } from '../types';
import { mockCourses, mockVocabulary, mockAchievements, mockPosts } from '../data/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string, preferredLanguages: Language[]) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email, password) => {
        const storedUsers = JSON.parse(localStorage.getItem('linguaflow_users') || '[]');
        const user = storedUsers.find((u: User) => u.email === email);
        
        if (user && password === localStorage.getItem(`linguaflow_password_${email}`)) {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      register: async (username, email, password, preferredLanguages) => {
        const storedUsers = JSON.parse(localStorage.getItem('linguaflow_users') || '[]');
        
        if (storedUsers.some((u: User) => u.email === email)) {
          return false;
        }
        
        const newUser: User = {
          id: `user_${Date.now()}`,
          email,
          username,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
          level: 1,
          experience: 0,
          preferredLanguages,
          learningGoals: [],
          createdAt: new Date(),
        };
        
        storedUsers.push(newUser);
        localStorage.setItem('linguaflow_users', JSON.stringify(storedUsers));
        localStorage.setItem(`linguaflow_password_${email}`, password);
        
        set({ user: newUser, isAuthenticated: true });
        return true;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateProfile: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },
    }),
    {
      name: 'linguaflow-auth',
    }
  )
);

interface ProgressState {
  progress: Progress;
  dailyGoal: DailyGoal;
  updateStudyTime: (minutes: number) => void;
  updateStreak: () => void;
  recordExerciseResult: (correct: boolean) => void;
  completeLesson: (courseId: string, lessonId: string) => void;
  addVocabulary: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      progress: {
        userId: '',
        courseProgress: {},
        vocabularyProgress: {
          totalLearned: 0,
          mastered: 0,
          reviewQueue: [],
        },
        statistics: {
          totalStudyTime: 0,
          totalExercises: 0,
          correctRate: 0,
          streakDays: 0,
          lastStudyDate: new Date(),
        },
        abilityRadar: {
          listening: 20,
          speaking: 15,
          reading: 25,
          writing: 10,
        },
      },
      dailyGoal: {
        targetMinutes: 30,
        completedMinutes: 0,
        targetWords: 10,
        learnedWords: 0,
        targetExercises: 5,
        completedExercises: 0,
      },
      updateStudyTime: (minutes) => {
        set((state) => ({
          progress: {
            ...state.progress,
            statistics: {
              ...state.progress.statistics,
              totalStudyTime: state.progress.statistics.totalStudyTime + minutes,
            },
          },
          dailyGoal: {
            ...state.dailyGoal,
            completedMinutes: state.dailyGoal.completedMinutes + minutes,
          },
        }));
      },
      updateStreak: () => {
        set((state) => ({
          progress: {
            ...state.progress,
            statistics: {
              ...state.progress.statistics,
              streakDays: state.progress.statistics.streakDays + 1,
              lastStudyDate: new Date(),
            },
          },
        }));
      },
      recordExerciseResult: (correct) => {
        set((state) => {
          const total = state.progress.statistics.totalExercises + 1;
          const correctCount = state.progress.statistics.correctRate * state.progress.statistics.totalExercises + (correct ? 1 : 0);
          return {
            progress: {
              ...state.progress,
              statistics: {
                ...state.progress.statistics,
                totalExercises: total,
                correctRate: correctCount / total,
              },
            },
            dailyGoal: {
              ...state.dailyGoal,
              completedExercises: state.dailyGoal.completedExercises + 1,
            },
          };
        });
      },
      completeLesson: (courseId, lessonId) => {
        set((state) => ({
          progress: {
            ...state.progress,
            courseProgress: {
              ...state.progress.courseProgress,
              [courseId]: {
                completedLessons: [...(state.progress.courseProgress[courseId]?.completedLessons || []), lessonId],
                currentLesson: lessonId,
                progressPercentage: Math.random() * 100,
              },
            },
          },
        }));
      },
      addVocabulary: () => {
        set((state) => ({
          progress: {
            ...state.progress,
            vocabularyProgress: {
              ...state.progress.vocabularyProgress,
              totalLearned: state.progress.vocabularyProgress.totalLearned + 1,
            },
          },
          dailyGoal: {
            ...state.dailyGoal,
            learnedWords: state.dailyGoal.learnedWords + 1,
          },
        }));
      },
    }),
    {
      name: 'linguaflow-progress',
    }
  )
);

interface CourseState {
  courses: typeof mockCourses;
  vocabulary: VocabularyCard[];
  achievements: Achievement[];
  currentCourse: string | null;
  currentLesson: string | null;
  setCurrentCourse: (courseId: string) => void;
  setCurrentLesson: (lessonId: string) => void;
  getCourseById: (id: string) => typeof mockCourses[0] | undefined;
  getRecommendedCourses: (language: Language, level: string) => typeof mockCourses;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: mockCourses,
  vocabulary: mockVocabulary,
  achievements: mockAchievements,
  currentCourse: null,
  currentLesson: null,
  setCurrentCourse: (courseId) => set({ currentCourse: courseId }),
  setCurrentLesson: (lessonId) => set({ currentLesson: lessonId }),
  getCourseById: (id) => get().courses.find((c) => c.id === id),
  getRecommendedCourses: (language, level) => {
    return get().courses.filter((c) => c.language === language && c.level === level);
  },
}));

interface CommunityState {
  posts: typeof mockPosts;
  addPost: (post: typeof mockPosts[0]) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, comment: Comment) => void;
}

export const useCommunityStore = create<CommunityState>((set) => ({
  posts: mockPosts,
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  likePost: (postId) => {
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId ? { ...p, likes: p.likes + 1 } : p
      ),
    }));
  },
  addComment: (postId, comment) => {
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId ? { ...p, comments: [...p.comments, comment] } : p
      ),
    }));
  },
}));
