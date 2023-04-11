import { LoginRequest } from "../controllers/user/login";
import { RegisterRequest } from "../controllers/user/register";

class ValidationService {
  validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  validatePassword = (password: string) => {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*_-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  };

  validateSignUp = (fields: RegisterRequest) => {
    const errors: { [key: string]: string } = {};
    if (!fields.email) {
      errors.email = "Email is required";
    } else if (!this.validateEmail(fields.email)) {
      errors.email = "Invalid email";
    }
    if (!fields.password) {
      errors.password = "Password is required";
    } else if (!this.validatePassword(fields.password)) {
      errors.password =
        "Password must contain upper letter, lower letter, digit and symbol";
    }
    if (!fields.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!fields.lastName) {
      errors.lastName = "Last Name is required";
    }

    return Object.keys(errors).length ? errors : null;
  };

  validateLogin = (fields: LoginRequest) => {
    const errors: { [key: string]: string } = {};
    if (!fields.email) {
      errors.email = "Email is required";
    } else if (!this.validateEmail(fields.email)) {
      errors.email = "Invalid email";
    }
    if (!fields.password) {
      errors.password = "Password is required";
    }

    return Object.keys(errors).length ? errors : null;
  };
}

export default new ValidationService();
