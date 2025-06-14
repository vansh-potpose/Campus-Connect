class Auth {
  auth_url;
  constructor() {
    this.auth_url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/users";
  }
  async login(email = "", password = "") {
    try {
      const response = await fetch(`${this.auth_url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });

      const user = await response.json();
      if (!user) {
        throw Error("user not found");
      }

      return user.data;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async refreshAccessToken() {
    try {
      const response = await fetch(`${this.auth_url}/refresh-access-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const user = await response.json();

      if (!user) {
        throw new Error("user not found");
      }
      return user.data;
    } catch (error) {
      throw new Error(
        error.message + " while extracting user using refresh access token"
      );
    }
  }

  async logout() {
    try {
      const response = await fetch(`${this.auth_url}/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const user = await response.json();
      return user.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserDetails(userId) {
    try {
      const response = await fetch(
        `${this.auth_url}/get-user-details/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response) {
        throw new Error("user not found");
      }

      const user = (await response.json()).data;

      if (!user) {
        throw new Error("user not found");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const auth = new Auth();

export default auth;
