export interface Topic {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  level?: string;
  headline?: string;
  isNew?: boolean;
  description: string;
  icon: string;
  color: string;
  category?: string;
  answerLink: string;
  externalLinks?: {
    title: string;
    url: string;
    type?: 'spreadsheet' | 'pdf' | 'form' | 'quizlet' | 'typing' | 'presentation' | 'drive' | 'video' | 'link';
  }[];
  studyContent?: {
    overview: string;
    sections: {
      title: string;
      items: (string | { title: string; url: string })[];
    }[];
  };
  examStructure?: {
    title: string;
    rows: {
      id: string;
      content: string;
      count: string;
      points: string;
      subtotal: string;
    }[];
    totalCount: string;
    totalPoints: string;
  };
  resourceSections?: {
    title: string;
    links: {
      title: string;
      url: string;
      type?: 'spreadsheet' | 'pdf' | 'form' | 'quizlet' | 'typing' | 'presentation' | 'drive' | 'video' | 'link';
    }[];
  }[];
}

export interface Problem {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface PracticeHistory {
  id: string;
  userId: string;
  topicId: string;
  problemId: string;
  isCorrect: boolean;
  timestamp: any;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  createdAt: any;
}
