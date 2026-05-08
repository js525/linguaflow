export type Language = 'english' | 'japanese' | 'korean';
export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  level: number;
  experience: number;
  preferredLanguages: Language[];
  learningGoals: LearningGoal[];
  createdAt: Date;
}

export interface LearningGoal {
  language: Language;
  targetLevel: Level;
  dailyTime: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  language: Language;
  level: Level;
  thumbnail: string;
  lessons: Lesson[];
  totalDuration: number;
  enrolledCount: number;
  rating: number;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'exercise';
  duration: number;
  content: LessonContent;
  isCompleted: boolean;
}

export interface LessonContent {
  text?: string;
  audioUrl?: string;
  videoUrl?: string;
  exercises?: Exercise[];
}

export interface Exercise {
  id: string;
  type: 'fill-blank' | 'multiple-choice' | 'translation' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface Progress {
  userId: string;
  courseProgress: {
    [courseId: string]: {
      completedLessons: string[];
      currentLesson: string;
      progressPercentage: number;
    };
  };
  vocabularyProgress: {
    totalLearned: number;
    mastered: number;
    reviewQueue: string[];
  };
  statistics: {
    totalStudyTime: number;
    totalExercises: number;
    correctRate: number;
    streakDays: number;
    lastStudyDate: Date;
  };
  abilityRadar: {
    listening: number;
    speaking: number;
    reading: number;
    writing: number;
  };
}

export interface VocabularyCard {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  exampleTranslation: string;
  mastery: number;
  nextReview: Date;
}

export interface Post {
  id: string;
  author: User;
  language: Language;
  title: string;
  content: string;
  images?: string[];
  likes: number;
  comments: Comment[];
  tags: string[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  likes: number;
  createdAt: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'knowledge' | 'exploration' | 'community';
  requirement: {
    type: string;
    count: number;
  };
  isUnlocked: boolean;
  unlockedAt?: Date;
}

export interface DailyGoal {
  targetMinutes: number;
  completedMinutes: number;
  targetWords: number;
  learnedWords: number;
  targetExercises: number;
  completedExercises: number;
}

export interface GrammarRule {
  id: string;
  title: string;
  explanation: string;
  examples: { sentence: string; translation: string }[];
  exercises: Exercise[];
}
