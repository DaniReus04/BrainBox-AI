import * as yup from "yup";

export const changePasswordSchema = yup.object({
  currentPassword: yup.string().required("auth.passwordRequired"),
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
    .oneOf([yup.ref("password")], "auth.confirmPasswordMatch"),
});
