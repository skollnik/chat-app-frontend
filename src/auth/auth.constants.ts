import * as yup from "yup";

const VALID_EMAIL_FORMAT = "Field should have valid email format!";
const VALID_PASSWORD_FORMAT = "Password must be at least 6 characters!";
const REQUIRED = "Field is required!";

export const REGISTRATION_VALIDATION_SCHEMA = yup.object({
  firstName: yup.string().required(REQUIRED),
  lastName: yup.string().required(REQUIRED),
  email: yup.string().email(VALID_EMAIL_FORMAT).required(REQUIRED),
  password: yup.string().min(6, VALID_PASSWORD_FORMAT).required(REQUIRED),
});

export const LOGIN_VALIDATION_SCHEMA = yup.object({
  email: yup.string().email(VALID_EMAIL_FORMAT).required(REQUIRED),
  password: yup.string().min(6, VALID_PASSWORD_FORMAT).required(REQUIRED),
});

export const LOGIN_FORM_DEFAULT_VALUES = {
  email: "",
  password: "",
};

export const REGISTER_FORM_DEFAULT_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};
