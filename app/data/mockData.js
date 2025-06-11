// Mock data for the complaint management platform
export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@university.edu",
    role: "student",
    department: "Computer Science"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@university.edu",
    role: "student",
    department: "Engineering"
  },
  {
    id: 3,
    name: "Dr. Emily Johnson",
    email: "emily.johnson@university.edu",
    role: "staff",
    department: "Student Affairs"
  },
  {
    id: 4,
    name: "Prof. Michael Brown",
    email: "michael.brown@university.edu",
    role: "staff",
    department: "Academic Affairs"
  },
  {
    id: 5,
    name: "Sarah Wilson",
    email: "sarah.wilson@university.edu",
    role: "admin",
    department: "Administration"
  }
];

export const complaints = [
  {
    id: 1,
    title: "Library WiFi Connection Issues",
    description: "The WiFi in the main library has been consistently dropping connections, making it difficult to complete online assignments and research.",
    anonymous: false,
    status: "resolved",
    assignedTo: 3,
    studentId: 1,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z"
  },
  {
    id: 2,
    title: "Cafeteria Food Quality Concerns",
    description: "The quality of food in the main cafeteria has significantly declined. Several students have reported food poisoning incidents.",
    anonymous: true,
    status: "in_progress",
    assignedTo: 3,
    studentId: 2,
    createdAt: "2024-01-18T09:15:00Z",
    updatedAt: "2024-01-19T16:20:00Z"
  },
  {
    id: 3,
    title: "Inadequate Parking Facilities",
    description: "There are insufficient parking spaces for students, leading to frequent delays and frustration.",
    anonymous: false,
    status: "pending",
    assignedTo: null,
    studentId: 1,
    createdAt: "2024-01-20T08:00:00Z",
    updatedAt: "2024-01-20T08:00:00Z"
  },
  {
    id: 4,
    title: "Classroom Temperature Control",
    description: "The air conditioning system in Building A is malfunctioning, making it uncomfortable for students during lectures.",
    anonymous: true,
    status: "in_progress",
    assignedTo: 4,
    studentId: 2,
    createdAt: "2024-01-22T11:30:00Z",
    updatedAt: "2024-01-23T09:15:00Z"
  }
];

export const interviewExperiences = [
  {
    id: 1,
    companyName: "Google",
    roleApplied: "Software Engineer Intern",
    experience: "The interview process consisted of 3 rounds: technical screening, coding interview, and behavioral interview. The technical questions focused on data structures and algorithms. The interviewers were friendly and provided hints when I got stuck.",
    tips: "Practice coding problems on LeetCode, especially array and string manipulation. Be prepared to explain your thought process clearly and ask clarifying questions.",
    studentId: 1,
    questionsId: [1, 2],
    createdAt: "2024-01-10T14:20:00Z"
  },
  {
    id: 2,
    companyName: "Microsoft",
    roleApplied: "Program Manager Intern",
    experience: "The interview had 2 technical rounds and 1 behavioral round. They asked about system design basics and how to prioritize features for a product. The atmosphere was collaborative.",
    tips: "Understand the PM role well, practice case studies, and be ready to discuss how you'd improve existing Microsoft products.",
    studentId: 2,
    questionsId: [3],
    createdAt: "2024-01-12T16:45:00Z"
  },
  {
    id: 3,
    companyName: "Amazon",
    roleApplied: "SDE Intern",
    experience: "Very challenging technical interview with focus on optimization and scalability. They asked about AWS services and distributed systems. Had to code in real-time with the interviewer watching.",
    tips: "Study Amazon's leadership principles, practice system design questions, and be comfortable coding without an IDE.",
    studentId: 1,
    questionsId: [4, 5],
    createdAt: "2024-01-14T13:10:00Z"
  }
];

export const feedbacks = [
  {
    id: 1,
    complaintId: 1,
    staffId: 3,
    message: "We've contacted the IT department and they've resolved the WiFi connectivity issues. Please let us know if you experience any further problems.",
    createdAt: "2024-01-20T14:45:00Z"
  },
  {
    id: 2,
    complaintId: 2,
    staffId: 3,
    message: "We're currently investigating the food quality concerns and have temporarily changed suppliers. We'll continue monitoring the situation.",
    createdAt: "2024-01-19T16:20:00Z"
  }
];

export const questions = [
  {
    id: 1,
    title: "How to prepare for coding interviews?",
    description: "Where should I start if I'm new to DSA?",
    asked_by: 2, // student ID
    interviewExperienceId: 1,
    created_at: "2025-06-02T08:00:00Z",
    updated_at: "2025-06-02T08:00:00Z",
  },
  {
    id: 2,
    title: "What was the hardest question in your Google interview?",
    description: "Can you share a tough coding problem you faced?",
    asked_by: 3, // staff can ask as a user
    interviewExperienceId: 1,
    created_at: "2025-06-03T09:00:00Z",
    updated_at: "2025-06-03T09:00:00Z",
  },
  {
    id: 3,
    title: "How did you prepare for the PM interview at Microsoft?",
    description: "Any resources or tips for case studies?",
    asked_by: 1, // student ID
    interviewExperienceId: 2,
    created_at: "2025-06-04T10:00:00Z",
    updated_at: "2025-06-04T10:00:00Z",
  },
  {
    id: 4,
    title: "What AWS topics should I focus on for Amazon SDE interviews?",
    description: "Did they ask about specific AWS services?",
    asked_by: 2, // student ID
    interviewExperienceId: 3,
    created_at: "2025-06-05T11:00:00Z",
    updated_at: "2025-06-05T11:00:00Z",
  },
  {
    id: 5,
    title: "How did you manage coding under pressure?",
    description: "Any advice for live coding with an interviewer?",
    asked_by: 4, // staff as user
    interviewExperienceId: 3,
    created_at: "2025-06-06T12:00:00Z",
    updated_at: "2025-06-06T12:00:00Z",
  }
];

export const answers = [
  {
    id: 1,
    question_id: 1,
    answered_by: 1, // user ID of the person answering and it the user who got asked the question and given the interview experience
    answer: "Start with Leetcode and HackerRank. Then learn trees, graphs, and DP.",
    created_at: "2025-06-02T10:00:00Z",
    updated_at: "2025-06-02T10:00:00Z",
  },
  {
    id: 2,
    question_id: 2,
    answered_by: 1,
    answer: "The hardest was a dynamic programming problem involving string segmentation. Practice DP and backtracking problems.",
    created_at: "2025-06-03T12:00:00Z",
    updated_at: "2025-06-03T12:00:00Z",
  },
  {
    id: 3,
    question_id: 3,
    answered_by: 2,
    answer: "I used 'Decode and Conquer' for case studies and practiced with friends. Also, read Microsoft's product blogs.",
    created_at: "2025-06-04T13:00:00Z",
    updated_at: "2025-06-04T13:00:00Z",
  },
  {
    id: 4,
    question_id: 4,
    answered_by: 1,
    answer: "Focus on EC2, S3, and Lambda. They asked about designing scalable systems using these services.",
    created_at: "2025-06-05T14:00:00Z",
    updated_at: "2025-06-05T14:00:00Z",
  },
  // {
  //   id: 5,
  //   question_id: 5,
  //   answered_by: 1,
  //   answer: "Practice coding on a whiteboard or plain editor. Narrate your thoughts and stay calm if you get stuck.",
  //   created_at: "2025-06-06T15:00:00Z",
  //   updated_at: "2025-06-06T15:00:00Z",
  // } 
];