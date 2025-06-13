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
}

const interviewExperiences = new InterviewExperiences();

export default interviewExperiences;
