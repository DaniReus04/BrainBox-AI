import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().required("auth.emailRequired").email("auth.emailInvalid"),
  password: yup
    .string()
    .required("auth.passwordRequired")
    .min(8, "auth.passwordRules"),
});
