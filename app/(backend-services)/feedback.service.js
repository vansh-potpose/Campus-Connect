class Feedback {
  feedback_url;

  constructor() {
    this.feedback_url =
      process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/feedbacks";
  }

  async getFeedbackOfComplaint(complaintId) {
    try {
      const response = await fetch(
        `${this.feedback_url}/get-complaint-feedbacks/${complaintId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response) {
        throw new Error("feedbacks not found");
      }

      const feedbackArr = (await response.json()).data;

      if (!feedbackArr) {
        throw new Error("feedbacks not found");
      }

      return feedbackArr;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createFeedback({ complaintId, message, isAnonymous }) {
    try {
      const response = await fetch(`${this.feedback_url}/create-feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          complaintId,
          message,
          isAnonymous,
        }),
        credentials: "include",
      });

      if (!response) {
        throw new Error("complaint cannot be created");
      }

      const feedback = (await response.json()).data;

      if (!feedback) {
        throw new Error("complaint cannot be created");
      }

      return feedback;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const feedback = new Feedback();

export default feedback;
