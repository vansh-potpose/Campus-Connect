export const users = [
  {
    id: "u1",
    name: "Alice Johnson",
    password: "hashed_pw_1",
    role: "student",
    created_at: "2025-06-01T09:00:00Z",
    updated_at: "2025-06-01T09:00:00Z",
  },
  {
    id: "u2",
    name: "Bob Smith",
    password: "hashed_pw_2",
    role: "staff",
    created_at: "2025-06-01T09:10:00Z",
    updated_at: "2025-06-01T09:10:00Z",
  },
  {
    id: "u3",
    name: "Charlie Lee",
    password: "hashed_pw_3",
    role: "admin",
    created_at: "2025-06-01T09:15:00Z",
    updated_at: "2025-06-01T09:15:00Z",
  },
];

export const complaints = [
  {
    id: "c1",
    title: "Wi-Fi not working",
    description: "The library Wi-Fi is down.",
    is_anonymous: false,
    status: "pending",
    created_by: "u1",
    assigned_to: "u2",
    created_at: "2025-06-03T10:00:00Z",
    updated_at: "2025-06-03T10:00:00Z",
  },
  {
    id: "c2",
    title: "Canteen hygiene issue",
    description: "Food quality and hygiene needs improvement.",
    is_anonymous: true,
    status: "in_progress",
    created_by: "u1",
    assigned_to: "u2",
    created_at: "2025-06-04T09:00:00Z",
    updated_at: "2025-06-05T09:00:00Z",
  },
];

export const feedbacks = [
  {
    id: "f1",
    complaint_id: "c1",
    user_id: "u2",
    is_anonymous: false,
    message: "Issue acknowledged. Fix in progress.",
    created_at: "2025-06-04T11:00:00Z",
  },
];

export const interviewExperiences = [
  {
    id: "ie1",
    company_name: "Google",
    role_applied: "SWE Intern",
    experience: "Two coding rounds, one behavioral.",
    tips: "DSA and mock interviews helped a lot.",
    user_id: "u1",
    created_at: "2025-06-01T12:00:00Z",
  },
];

export const questions = [
  {
    id: "q1",
    title: "How to prepare for coding interviews?",
    description: "Where should I start if I'm new to DSA?",
    asked_by: "u1",
    created_at: "2025-06-02T08:00:00Z",
    updated_at: "2025-06-02T08:00:00Z",
  },
];

export const answers = [
  {
    id: "a1",
    question_id: "q1",
    answered_by: "u2",
    answer: "Start with Leetcode and HackerRank. Then learn trees, graphs, and DP.",
    created_at: "2025-06-02T10:00:00Z",
    updated_at: "2025-06-02T10:00:00Z",
  },
];
