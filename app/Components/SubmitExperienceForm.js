import React, { useState } from 'react';

export function SubmitExperienceForm({ onBack }) {
  const [companyName, setCompanyName] = useState('');
  const [roleApplied, setRoleApplied] = useState('');
  const [experience, setExperience] = useState('');
  const [tips, setTips] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onBack();
      }, 2000);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Share Your Interview Experience</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Help fellow students by sharing your interview experiences and valuable tips.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 transition-all">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Interview Experience
              </h2>
              <p className="text-gray-600">Share your interview journey to help other students prepare</p>
            </div>

            {success ? (
              <div className="flex items-center gap-3 p-4 rounded-lg mb-4 bg-green-50 text-green-700 border border-green-100">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Your experience has been shared successfully! Thank you for helping the community. You'll be redirected to the home page shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label htmlFor="companyName" className="block mb-2 font-medium text-gray-700">Company Name *</label>
                    <div className="relative">
                      <svg className="absolute left-3 top-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6" />
                      </svg>
                      <input
                        id="companyName"
                        type="text"
                        placeholder="e.g., Google, Microsoft, Amazon"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="roleApplied" className="block mb-2 font-medium text-gray-700">Role Applied For *</label>
                    <input
                      id="roleApplied"
                      type="text"
                      placeholder="e.g., Software Engineer Intern"
                      value={roleApplied}
                      onChange={(e) => setRoleApplied(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="experience" className="block mb-2 font-medium text-gray-700">Interview Experience *</label>
                  <textarea
                    id="experience"
                    placeholder="Describe your interview process: How many rounds were there? What types of questions were asked? How was the overall atmosphere? What were the interviewers like?"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm min-h-[120px] resize-vertical focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors font-sans"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="tips" className="flex mb-2 font-medium text-gray-700 items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Tips for Future Candidates *
                  </label>
                  <textarea
                    id="tips"
                    placeholder="Share your advice: What should students prepare? Any specific topics to focus on? Resources that helped you? Common mistakes to avoid?"
                    value={tips}
                    onChange={(e) => setTips(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm min-h-[100px] resize-vertical focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors font-sans"
                    required
                  />
                </div>

                <div className="flex space-x-3">
                  <button type="button" onClick={onBack} className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium text-gray-700 border border-gray-300 bg-white hover:bg-gray-100 transition-colors text-sm gap-2">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back
                  </button>
                  <button type="submit" className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors text-sm gap-2 flex-1 disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
                    {loading ? (
                      'Sharing Experience...'
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Share Experience
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 transition-all">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Share?</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Help Others Succeed</h4>
                <p className="text-sm text-gray-600">
                  Your experience can help fellow students prepare better for their interviews.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Build Community</h4>
                <p className="text-sm text-gray-600">
                  Create a supportive network where students help each other grow.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Share Knowledge</h4>
                <p className="text-sm text-gray-600">
                  Valuable insights that can make a difference in someone's career.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 transition-all">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips for Writing</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                  ✓
                </div>
                <p className="text-sm text-gray-600">Be honest about both positive and challenging aspects</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                  ✓
                </div>
                <p className="text-sm text-gray-600">Include specific details about the interview format</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                  ✓
                </div>
                <p className="text-sm text-gray-600">Mention resources that helped you prepare</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                  ✓
                </div>
                <p className="text-sm text-gray-600">Share actionable advice for future candidates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}