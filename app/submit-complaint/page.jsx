'use client'
import React, { useState } from "react";
import complaints from "../(backend-services)/complaints.service";

export default function SubmitComplaintForm({ onBack }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const complaint = await complaints.createComplaint({
        title,
        description,
        isAnonymous: anonymous,
      });

      if (!complaint) {
        throw new Error("complaint not found");
      }

      console.log(complaint);
      if (complaint) {
        setSuccess(true);
        setTimeout(() => {
          onBack(); // or use router.push('/home')
        }, 2000);
      }
    } catch (error) {
      console.log(error + "priniting");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Submit a Complaint
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your feedback helps us improve campus life. Share your concerns and
          we'll work to address them.
        </p>
      </div>

      <div className="grid lg:grid-cols-1 grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 transition-all">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Complaint Details
              </h2>
              <p className="text-gray-600">
                Provide clear and detailed information about your concern
              </p>
            </div>

            {success ? (
              <div className="flex items-center gap-3 p-4 rounded-lg mb-4 bg-green-50 text-green-700 border border-green-100">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Your complaint has been submitted successfully! You'll be
                redirected to the home page shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    Complaint Title *
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Brief summary of your complaint"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-black transition-colors"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    Detailed Description *
                  </label>
                  <textarea
                    id="description"
                    placeholder="Provide a detailed description of the issue, including when it occurred, where it happened, and any other relevant information..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm min-h-[120px] resize-vertical focus:outline-none focus:border-blue-500 focus:ring focus:ring-black transition-colors font-sans"
                    required
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-4">
                  <label className="relative inline-block w-11 h-6 align-middle select-none">
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={(e) => setAnonymous(e.target.checked)}
                      className="sr-only peer"
                      name="isAnonymous"
                    />
                    <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition peer-checked:bg-blue-500"></span>
                    <span className="absolute left-[3px] bottom-[3px] h-[18px] w-[18px] bg-white rounded-full transition peer-checked:translate-x-5"></span>
                  </label>
                  <div className="flex-1">
                    <div className="font-medium mb-1">Submit Anonymously</div>
                    <p className="text-sm text-gray-500">
                      Your identity will be kept private when submitting this
                      complaint
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium text-gray-700 border border-gray-300 bg-white hover:bg-gray-100 transition-colors text-sm gap-2"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Back
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium text-white bg-[#171717] hover:bg-[#171717e6] transition-colors text-sm gap-2 flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? (
                      "Submitting..."
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                        Submit Complaint
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Guidelines
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Be Specific</h4>
                <p className="text-sm text-gray-600">
                  Include specific details about when, where, and what happened.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Stay Respectful</h4>
                <p className="text-sm text-gray-600">
                  Use professional language and avoid personal attacks.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Provide Context</h4>
                <p className="text-sm text-gray-600">
                  Explain how the issue affects you and other students.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 transition-all">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What Happens Next?
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <p className="text-sm text-gray-600">
                  Your complaint is reviewed by our team
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <p className="text-sm text-gray-600">
                  It's assigned to the appropriate staff member
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <p className="text-sm text-gray-600">
                  You'll receive updates on the progress
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
