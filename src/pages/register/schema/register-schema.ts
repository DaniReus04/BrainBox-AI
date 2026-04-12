import * as yup from "yup";

export const registerSchema = yup.object({
  fullName: yup
    .string()
    .required("auth.fullNameRequired")
    .matches(/^[A-Za-zÀ-ÿ]+(\s+[A-Za-zÀ-ÿ]+)+$/, "auth.fullNameInvalid"),
  email: yup.string().required("auth.emailRequired").email("auth.emailInvalid"),
  password: yup
    .string()
    .required("auth.passwordRequired")
    .min(8, "auth.passwordRules")
    .matches(/(?=.*[A-Za-z])/, "auth.passwordRules")
    .matches(/(?=.*\d)/, "auth.passwordRules")
    .matches(/(?=.*[^A-Za-z0-9])/, "auth.passwordRules"),
  confirmPassword: yup
    .string()
    .required("auth.confirmPasswordRequired")
    .oneOf([yup.ref("password"), null], "auth.confirmPasswordMatch"),
});
