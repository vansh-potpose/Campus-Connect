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
    createdAt: "2024-01-10T14:20:00Z"
  },
  {
    id: 2,
    companyName: "Microsoft",
    roleApplied: "Program Manager Intern",
    experience: "The interview had 2 technical rounds and 1 behavioral round. They asked about system design basics and how to prioritize features for a product. The atmosphere was collaborative.",
    tips: "Understand the PM role well, practice case studies, and be ready to discuss how you'd improve existing Microsoft products.",
    studentId: 2,
    createdAt: "2024-01-12T16:45:00Z"
  },
  {
    id: 3,
    companyName: "Amazon",
    roleApplied: "SDE Intern",
    experience: "Very challenging technical interview with focus on optimization and scalability. They asked about AWS services and distributed systems. Had to code in real-time with the interviewer watching.",
    tips: "Study Amazon's leadership principles, practice system design questions, and be comfortable coding without an IDE.",
    studentId: 1,
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