class Complaints {
  complaints_url;

  constructor() {
    this.complaints_url =
      process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/complaints";
  }

  async getResolvedCount() {
    try {
      const response = await fetch(
        `${this.complaints_url}/count-resolved-complaints`,
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

      return data.complaintsCount;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getCount() {
    try {
      const response = await fetch(`${this.complaints_url}/count-complaints`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response) {
        throw new Error("cannot get complaints count");
      }

      const res = await response.json();
      const data = res.data;
      return data.complaintsCount;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createComplaint({ title, description, isAnonymous }) {
    try {
      const response = await fetch(`${this.complaints_url}/create-complaint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          isAnonymous,
        }),
        credentials: "include",
      });

      if (!response) {
        throw new Error("complaint cannot be created");
      }

      const complaint = (await response.json()).data;

      if (!complaint) {
        throw new Error("complaint cannot be created");
      }

      return complaint;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getComplaint(id) {
    try {
      const response = await fetch(`${this.complaints_url}/get-complaint/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response) {
        throw new Error("cannot get complaint");
      }
      console.log(response)
      const complaint = (await response.json()).data;

      return complaint;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const complaints = new Complaints();

export default complaints;
