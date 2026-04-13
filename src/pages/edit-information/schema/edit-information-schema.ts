import * as yup from "yup";

export const editInfoSchema = yup.object({
  fullName: yup
    .string()
    .required("auth.fullNameRequired")
    .matches(/^[A-Za-zÀ-ÿ]+(\s+[A-Za-zÀ-ÿ]+)+$/, "auth.fullNameInvalid"),
  email: yup.string().required("auth.emailRequired").email("auth.emailInvalid"),
});
