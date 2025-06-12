class Auth {
  async login(email = "", password = "") {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
          credentials: "include",
        }
      );

      const user = await response.json();
      if (!user) {
        throw Error("user not found");
      }

      return user;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

const auth = new Auth();

export default auth;
