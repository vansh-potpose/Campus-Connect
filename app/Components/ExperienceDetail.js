import React, { useState } from 'react';
import { users, interviewExperiences, questions, answers } from '../data/mockData';
import { formatDistanceToNow } from 'date-fns';

// interviewExperienceId prop is passed instead of complaintId
export function ExperienceDetail({ interviewExperienceId, onBack }) {
    const { currentUser } = useAuth();
    const [localQuestions, setLocalQuestions] = useState(questions);
    const [localAnswers, setLocalAnswers] = useState(answers);
    const [newAnswer, setNewAnswer] = useState({});
    const [answeringId, setAnsweringId] = useState(null);
    const [newQuestion, setNewQuestion] = useState({ title: '', description: '' });
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const experience = interviewExperiences.find(e => e.id === interviewExperienceId);
    const student = experience ? users.find(u => u.id === experience.studentId) : null;

    if (!experience) {
        return (
            <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12 text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Experience Not Found</h2>
                    <p className="text-gray-600 mb-4">The interview experience you're looking for doesn't exist or has been removed.</p>
                    <button onClick={onBack} className="inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    // Get all questions for this experience
    const experienceQuestions = localQuestions.filter(q => q.interviewExperienceId === experience.id);

    // Helper to get answer for a question
    const getAnswerForQuestion = (questionId) =>
        localAnswers.find(a => a.question_id === questionId);

    // Only the interview experience owner can answer
    const canAnswer = currentUser && currentUser.id === experience.studentId;

    // Anyone except the owner can ask a question
    const canAsk = currentUser && currentUser.id !== experience.studentId;

    // Handle answer submit
    const handleAnswerSubmit = (e, questionId) => {
        e.preventDefault();
        if (!newAnswer[questionId] || !newAnswer[questionId].trim()) return;
        setSubmitting(true);
        setTimeout(() => {
            const answerObj = {
                id: localAnswers.length + 1,
                question_id: questionId,
                answered_by: currentUser.id,
                answer: newAnswer[questionId],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };
            setLocalAnswers(prev => [...prev, answerObj]);
            setNewAnswer(prev => ({ ...prev, [questionId]: '' }));
            setAnsweringId(null);
            setSubmitting(false);
            setSuccessMessage('Answer submitted!');
            setTimeout(() => setSuccessMessage(''), 2000);
        }, 800);
    };

    // Handle question submit
    const handleQuestionSubmit = (e) => {
        e.preventDefault();
        if (!newQuestion.title.trim() || !newQuestion.description.trim()) return;
        setSubmitting(true);
        setTimeout(() => {
            const questionObj = {
                id: localQuestions.length + 1,
                title: newQuestion.title,
                description: newQuestion.description,
                asked_by: currentUser.id,
                interviewExperienceId: experience.id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };
            setLocalQuestions(prev => [...prev, questionObj]);
            setNewQuestion({ title: '', description: '' });
            setSubmitting(false);
            setSuccessMessage('Question submitted!');
            setTimeout(() => setSuccessMessage(''), 2000);
        }, 800);
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            {/* Back Button */}
            <div className="mb-6">
                <button onClick={onBack} className="inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                </button>
            </div>

            {successMessage && (
                <div className="flex items-center gap-3 p-4 rounded-lg mb-6 bg-green-50 text-green-700 border border-green-200">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {successMessage}
                </div>
            )}

            {/* Experience Details */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 mb-8">
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                {experience.companyName} - {experience.roleApplied}
                            </h1>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium gap-1 bg-blue-500 text-white font-semibold">
                                    Interview Experience
                                </span>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">
                            Shared {formatDistanceToNow(new Date(experience.createdAt), { addSuffix: true })}
                        </div>
                    </div>
                    <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed mb-2"><span className="font-semibold">Experience:</span> {experience.experience}</p>
                        <p className="text-gray-700 leading-relaxed"><span className="font-semibold">Tips:</span> {experience.tips}</p>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-medium text-xs">
                            {student?.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{student?.name}</p>
                            <p className="text-sm text-gray-500">{student?.department}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Q&A Section */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100">
                <div className="p-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Interview Q&A
                        </h2>
                        <p className="text-gray-600">Ask questions or answer queries about this interview experience</p>
                    </div>

                    {/* Existing Questions & Answers */}
                    <div className="space-y-6 mb-8">
                        {experienceQuestions.length > 0 ? (
                            experienceQuestions
                                .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                                .map((q) => {
                                    const asker = users.find(u => u.id === q.asked_by);
                                    const answer = getAnswerForQuestion(q.id);
                                    const answerer = answer ? users.find(u => u.id === answer.answered_by) : null;
                                    return (
                                        <div key={q.id} className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-medium text-xs">
                                                    {asker?.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{asker?.name}</p>
                                                    <p className="text-xs text-gray-500">{formatDistanceToNow(new Date(q.created_at), { addSuffix: true })}</p>
                                                </div>
                                            </div>
                                            <div className="mb-2">
                                                <p className="font-semibold text-gray-900">{q.title}</p>
                                                <p className="text-gray-700">{q.description}</p>
                                            </div>
                                            {answer ? (
                                                <div className="mt-3 pl-4 border-l-2 border-blue-300">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 text-gray-700 font-medium text-xs">
                                                            {answerer?.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <span className="font-medium text-gray-900">{answerer?.name}</span>
                                                        <span className="text-xs text-gray-500">{formatDistanceToNow(new Date(answer.created_at), { addSuffix: true })}</span>
                                                    </div>
                                                    <p className="text-gray-800">{answer.answer}</p>
                                                </div>
                                            ) : canAnswer ? (
                                                answeringId === q.id ? (
                                                    <form onSubmit={e => handleAnswerSubmit(e, q.id)} className="mt-3 pl-4">
                                                        <textarea
                                                            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring focus:ring-black focus:border-blue-400 min-h-[60px]"
                                                            placeholder="Write your answer..."
                                                            value={newAnswer[q.id] || ''}
                                                            onChange={e => setNewAnswer(prev => ({ ...prev, [q.id]: e.target.value }))}
                                                            required
                                                        />
                                                        <div className="flex gap-2 mt-2">
                                                            <button
                                                                type="submit"
                                                                className="inline-flex items-center px-3 py-1 rounded-md font-medium text-sm bg-[#171717] hover:bg-[#171717e6] text-white transition-colors disabled:opacity-50"
                                                                disabled={submitting || !(newAnswer[q.id] && newAnswer[q.id].trim())}
                                                            >
                                                                {submitting ? 'Submitting...' : 'Submit Answer'}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="inline-flex items-center px-3 py-1 rounded-md font-medium text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                                                                onClick={() => setAnsweringId(null)}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </form>
                                                ) : (
                                                    <button
                                                        className="mt-3 ml-4 inline-flex items-center px-3 py-1 rounded-md font-medium text-sm bg-blue-600 text-white hover:bg-blue-700"
                                                        onClick={() => setAnsweringId(q.id)}
                                                    >
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                        </svg>
                                                        Answer
                                                    </button>
                                                )
                                            ) : (
                                                <div className="mt-3 pl-4 text-gray-400 italic text-sm">Waiting for answer...</div>
                                            )}
                                        </div>
                                    );
                                })
                        ) : (
                            <div className="text-center py-8">
                                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <p className="text-gray-500">No questions yet. Be the first to ask!</p>
                            </div>
                        )}
                    </div>

                    {/* Ask a Question */}
                    {canAsk && (
                        <div className="border-t pt-6">
                            <h4 className="font-medium text-gray-900 mb-3">Ask a Question</h4>
                            <form onSubmit={handleQuestionSubmit} className="space-y-3">
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring focus:ring-black focus:border-blue-400"
                                    placeholder="Question title"
                                    value={newQuestion.title}
                                    onChange={e => setNewQuestion(q => ({ ...q, title: e.target.value }))}
                                    required
                                />
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring focus:ring-black focus:border-blue-400 min-h-[60px]"
                                    placeholder="Describe your question in detail..."
                                    value={newQuestion.description}
                                    onChange={e => setNewQuestion(q => ({ ...q, description: e.target.value }))}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 rounded-md font-medium text-sm bg-[#171717] hover:bg-[#171717e6] text-white transition-colors disabled:opacity-50"
                                    disabled={submitting || !newQuestion.title.trim() || !newQuestion.description.trim()}
                                >
                                    {submitting ? 'Submitting...' : 'Ask Question'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}