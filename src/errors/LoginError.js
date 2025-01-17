class LoginError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    // LoginError: message instead of Error: message
    this.name = "LoginError";
  }
}

export default LoginError;