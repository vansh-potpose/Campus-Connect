class InterviewExperiences {
  interviewExperience_url;

  constructor() {
    this.interviewExperience_url =
      process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/interview-experiences";
  }

  async getCount() {
    try {
      const response = await fetch(
        `${this.interviewExperience_url}/count-interview-experiences`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const res = await response.json();
      const data = res.data;

      return data.experiencesCount;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async createInterviewExperience({ companyName, roleApplied, experience, tips }) {
    try {
      const response = await fetch(`${this.interviewExperience_url}/create-interview-experience`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName,
          roleApplied,
          experience,
          tips
        }),
        credentials: "include",
      });

      if (!response) {
        throw new Error("complaint cannot be created");
      }

      const experienceData = (await response.json()).data;

      if (!experienceData) {
        throw new Error("complaint cannot be created");
      }

      return experienceData;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const interviewExperiences = new InterviewExperiences();

export default interviewExperiences;
